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

    // 2. 🟢 NEW: Capture the original native navigation method
    const originalGoto = page.goto.bind(page);

    // 3. 🟢 NEW: Override page.goto globally to absorb the Cloudflare challenge screen
    page.goto = async (url: string, options?: any) => {
      // Run the normal browser navigation request
      const response = await originalGoto(url, options);

      // Immediately poll the title state to make sure we aren't blocked by a firewall screen
      await expect(async () => {
        const currentTitle = await page.title();

        if (
          currentTitle.includes("One moment") ||
          currentTitle.includes("Checking")
        ) {
          throw new Error(
            "Cloudflare firewall challenge screen detected. Holding execution loop...",
          );
        }
      }).toPass({
        intervals: [1000, 2000], // Re-check every 1 to 2 seconds
        timeout: 15000, // Give the network/firewall up to 15 seconds to clear out
      });

      return response;
    };

    // 4. Give the armed, ad-blocked page to the test
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
