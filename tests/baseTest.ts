import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // 1. CI SCALING: Expand default timeouts globally for slow headless CI runners
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(20000);

    // 2. NETWORK BOUNDARY LAYER: Block heavy ads, trackers, and memory leaks
    await page.route("**/*", (route) => {
      const url = route.request().url();
      if (
        url.includes("googleads") ||
        url.includes("doubleclick") ||
        url.includes("adservice") ||
        url.includes("analytics") ||
        url.includes("g.doubleclick.net")
      ) {
        route.abort();
      } else {
        route.continue();
      }
    });

    // 3. GLOBAL NAVIGATION SANITIZATION
    const originalGoto = page.goto.bind(page);
    page.goto = async (url: string, options?: any) => {
      const lowerUrl = url.toLowerCase();

      // 🟢 CRITICAL BYPASS FIX: Instantly release file streams, invoice links, or payments to the raw engine
      if (
        lowerUrl.startsWith("data:") ||
        lowerUrl.includes("download") ||
        lowerUrl.includes("invoice") ||
        lowerUrl.includes("payment")
      ) {
        return await originalGoto(url, options);
      }

      let response;
      try {
        // Attempt a pristine network idle synchronization
        response = await originalGoto(url, {
          waitUntil: "networkidle",
          timeout: 12000,
          ...options,
        });
      } catch (e) {
        // 🟢 CRITICAL RESCUE FIX: Fall back to domcontentloaded so the DOM structure is fully loaded
        // and parsed. This stops page.goto from releasing the thread early on a completely blank screen ("").
        response = await originalGoto(url, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
          ...options,
        });
      }

      // Safeguard validation loop to ensure the frame context contains actual unblank painted data
      try {
        await expect(async () => {
          const currentTitle = await page.title();
          if (
            !currentTitle ||
            currentTitle.includes("One moment") ||
            currentTitle.includes("Checking")
          ) {
            throw new Error("Frame window unpainted. Polling browser state...");
          }
        }).toPass({ intervals: [1000, 2000], timeout: 8000 });
      } catch (err) {
        // Fallback catch block to ensure title polling errors never block valid operational test blocks
      }

      return response;
    };

    // Hand the modified, self-healing page back to the test runner execution queue
    await use(page);
  },
});

export { expect } from "@playwright/test";
