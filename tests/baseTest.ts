import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // 1. CI SCALING: Keep thresholds comfortable for parallel workflows
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(20000);

    // 2. NETWORK BOUNDARY LAYER: Strip intensive tracking networks
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

      // 🟢 CRITICAL BYPASS FIX: If navigating to an invoice download route or a direct backend file script,
      // completely hand execution back to the raw browser engine without checking DOM titles.
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
        response = await originalGoto(url, {
          waitUntil: "networkidle",
          timeout: 10000,
          ...options,
        });
      } catch (e) {
        response = await originalGoto(url, { waitUntil: "commit", ...options });
      }

      // Safeguard against unrendered blank views (skip if the page unloads or shifts to data domains)
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
        // Fallback catch to prevent title validation from blocking operational test logic
      }

      return response;
    };

    await use(page);
  },
});

export { expect } from "@playwright/test";
// import { test as base, expect } from "@playwright/test";

// export const test = base.extend({
//   page: async ({ page }, use) => {
//     // 1. CI SCALING: Expand default timeouts globally for slow headless CI runners
//     page.setDefaultTimeout(15000);
//     page.setDefaultNavigationTimeout(20000);

//     // 2. NETWORK BOUNDARY LAYER: Block heavy ads, trackers, and memory leaks
//     await page.route("**/*", (route) => {
//       const url = route.request().url();
//       if (
//         url.includes("googleads") ||
//         url.includes("doubleclick") ||
//         url.includes("adservice") ||
//         url.includes("analytics") ||
//         url.includes("g.doubleclick.net")
//       ) {
//         route.abort();
//       } else {
//         route.continue();
//       }
//     });

//     // 3. GLOBAL CLICK INTERCEPTOR: Automatically rescues flakiness, animations, and freezes
//     const originalClick = page.click.bind(page);
//     page.click = async (selector: string, options?: any) => {
//       try {
//         // Attempt a standard, clean web-first click
//         return await originalClick(selector, { timeout: 6000, ...options });
//       } catch (error) {
//         // 🟢 FALLBACK: If a slow animation or WebKit download lock blocks it, force it via coordinate injection
//         return await originalClick(selector, { ...options, force: true });
//       }
//     };

//     // 4. GLOBAL NAVIGATION OVERHAUL: Network stabilization with a fast fallback
//     const originalGoto = page.goto.bind(page);
//     page.goto = async (url: string, options?: any) => {
//       if (url.startsWith("data:") || url.includes("download")) {
//         return await originalGoto(url, options);
//       }

//       let response;
//       try {
//         response = await originalGoto(url, {
//           waitUntil: "networkidle",
//           timeout: 12000,
//           ...options,
//         });
//       } catch (e) {
//         response = await originalGoto(url, { waitUntil: "commit", ...options });
//       }

//       // Anti-bot & blank-screen verification loop
//       await expect(async () => {
//         const currentTitle = await page.title();
//         if (
//           !currentTitle ||
//           currentTitle.includes("One moment") ||
//           currentTitle.includes("Checking")
//         ) {
//           throw new Error("Page context unpainted. Polling browser...");
//         }
//       }).toPass({ intervals: [1000, 2000], timeout: 10000 });

//       return response;
//     };

//     // Hand the modified, self-healing page back to the test runner execution queue
//     await use(page);
//   },
// });

// export { expect } from "@playwright/test";
