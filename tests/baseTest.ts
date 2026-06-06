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
      // Ignore interceptor logic entirely for download actions or data URIs
      if (url.startsWith("data:") || url.includes("download")) {
        return await originalGoto(url, options);
      }

      const response = await originalGoto(url, {
        waitUntil: "domcontentloaded",
        ...options,
      });

      // Polling loop to wait out security challenges or empty document traces non-destructively
      await expect(async () => {
        const currentTitle = await page.title();

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
        intervals: [1500, 2000],
        timeout: 15000,
      });

      return response;
    };

    await use(page);
  },
});

export { expect } from "@playwright/test";
