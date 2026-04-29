import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    // 1. Setup: Block Google Ads for EVERY page
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
        route.abort();
      } else {
        route.continue();
      }
    });

    // 2. Give the modified page to the test
    await use(page);
  },
});

export { expect } from '@playwright/test';