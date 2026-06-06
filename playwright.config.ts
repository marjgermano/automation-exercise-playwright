import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// Read environment variables from file
dotenv.config({ path: path.resolve(__dirname, ".env") });

if (!process.env.CI) {
  process.env.PLAYWRIGHT_BROWSERS_PATH = "0";
}

export default defineConfig({
  testDir: "./tests",

  /* 🟢 FIX 1: INCREASE TIMEOUTS TO ACCOMMODATE E2E FLOWS WORKED BY SLOWMO */
  timeout: 60 * 1000, // 60 seconds total execution budget per test case
  expect: {
    timeout: 10 * 1000, // 10 seconds maximum buffer for explicit assertions
  },

  /* 🟢 FIX 2: COORDINATE SEQUENTIAL QUEUE ALIGNMENT */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests to prevent data collision over public sandbox endpoints. */
  workers: process.env.CI ? 1 : 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://automationexercise.com/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    testIdAttribute: "data-qa",
    video: "retry-with-video",

    /* 🟢 GLOBAL LAUNCH SETTINGS (Safe for all browsers) */
    launchOptions: {
      slowMo: 500, // Paces actions by 500ms to preserve remote server sync state
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        /* 🟢 CHROMIUM SPECIFIC FIX: Keep special anti-bot evasion arguments isolated here */
        launchOptions: {
          args: [
            "--disable-blink-features=AutomationControlled", // Prevents automated element rejection blocks
            "--disable-web-security", // Overrides rigid cross-origin script drops
          ],
        },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        /* Firefox will launch cleanly using standard settings without crashing */
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        /* WebKit will launch cleanly using standard settings without crashing */
      },
    },
  ],
});

// import { defineConfig, devices } from "@playwright/test";

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// if (!process.env.CI) {
//   process.env.PLAYWRIGHT_BROWSERS_PATH = "0";
// }

// export default defineConfig({
//   testDir: "./tests",
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : 1,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: "html",
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('')`. */
//     baseURL: "https://automationexercise.com/",

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: "on-first-retry",
//     screenshot: "only-on-failure",
//     testIdAttribute: "data-qa",
//     video: "retry-with-video",
//     launchOptions: {
//       slowMo: 500,
//     },
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: "chromium",
//       use: { ...devices["Desktop Chrome"] },
//     },

//     {
//       name: "firefox",
//       use: { ...devices["Desktop Firefox"] },
//     },

//     {
//       name: "webkit",
//       use: { ...devices["Desktop Safari"] },
//     },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });
