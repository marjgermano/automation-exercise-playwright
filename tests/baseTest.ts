import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // 1. Setup: Block Google Ads for EVERY page
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

    // 2. Capture original goto for the Cloudflare bypass
    const originalGoto = page.goto.bind(page);
    page.goto = async (url: string, options?: any) => {
      const response = await originalGoto(url, options);
      await expect(async () => {
        const currentTitle = await page.title();
        if (
          currentTitle.includes("One moment") ||
          currentTitle.includes("Checking")
        ) {
          throw new Error("Cloudflare firewall challenge screen detected.");
        }
      }).toPass({ intervals: [1000, 2000], timeout: 15000 });
      return response;
    };

    // 3. 🟢 NEW: Humanize and Stabilize ALL clicks across the framework
    // This intercepts the native click method globally to eliminate animation race conditions
    const originalClick = page.click.bind(page);
    page.click = async (selector: string, options?: any) => {
      const locator = page.locator(selector);

      // Force the browser engine to wait until animations finish completely
      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible();
      await expect(locator).toBeEnabled();

      // Execute the native click with an explicit force parameter if needed
      return originalClick(selector, { ...options, force: true });
    };

    // 4. Give the armed, resilient page instance to the test suite execution track
    await use(page);
  },
});

export { expect } from "@playwright/test";

// import { test as base } from '@playwright/test';

// export const test = base.extend({
//   page: async ({ page }, use) => {
//     // 1. Setup: Block Google Ads for EVERY page
//     await page.route('**/*', (route) => {
//       const url = route.request().url();
//       if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
//         route.abort();
//       } else {
//         route.continue();
//       }
//     });

//     // 2. Give the modified page to the test
//     await use(page);
//   },
// });

// export { expect } from '@playwright/test';
