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

    // 2. Capture original goto for the Cloudflare firewall bypass
    const originalGoto = page.goto.bind(page);
    page.goto = async (url: string, options?: any) => {
      const response = await originalGoto(url, options);

      // Polling loop to wait out the security challenge page non-destructively
      await expect(async () => {
        const currentTitle = await page.title();
        if (
          currentTitle.includes("One moment") ||
          currentTitle.includes("Checking")
        ) {
          throw new Error(
            "Cloudflare firewall challenge screen detected. Polling...",
          );
        }
      }).toPass({
        intervals: [1000, 2000],
        timeout: 15000,
      });

      return response;
    };

    // 3. Hand the clean, ad-blocked page back to the suite runner execution queue
    await use(page);
  },
});

export { expect } from "@playwright/test";
