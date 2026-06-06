import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // 1. Setup: Block Google Ads cleanly at the network boundary layer
    await page.route("**/*", (route) => {
      const url = route.request().url();
      if (
        url.includes("googleads") ||
        url.includes("doubleclick") ||
        url.includes("adservice")
      ) {
        route.abort();
      } else {
        route.continue();
      }
    });

    // 2. Capture original goto for the Cloudflare firewall & blank page bypass
    const originalGoto = page.goto.bind(page);
    page.goto = async (url: string, options?: any) => {
      // Use domcontentloaded to bypass slow-hanging backend scripts on remote runners
      const response = await originalGoto(url, {
        waitUntil: "domcontentloaded",
        ...options,
      });

      // Polling loop to wait out security challenges or empty document traces non-destructively
      await expect(async () => {
        const currentTitle = await page.title();

        // 🟢 FIX: Catch empty string titles ("") alongside Cloudflare screening text
        if (
          !currentTitle ||
          currentTitle.includes("One moment") ||
          currentTitle.includes("Checking")
        ) {
          throw new Error(
            "Page state unready or blocked by firewall screen. Polling browser context...",
          );
        }
      }).toPass({
        intervals: [1500, 2000], // Paced intervals to allow DOM painting
        timeout: 15000, // Maximum execution buffer threshold
      });

      return response;
    };

    // 3. Hand the clean, ad-blocked page back to the suite runner execution queue
    await use(page);
  },
});

export { expect } from "@playwright/test";
