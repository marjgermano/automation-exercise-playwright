import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// 1. Load environment variables from your local .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// 2. Local Isolated Browser Path Guard
// Automatically isolates browser storage to your project directory on your machine,
// but leaves it to standard global paths when executing inside GitHub Actions CI.
if (!process.env.CI) {
  process.env.PLAYWRIGHT_BROWSERS_PATH = '0';
}

export default defineConfig({
  // Directory where your test specs are located
  testDir: "./tests",
  
  /* 🟢 ENTERPRISE TIMEOUT SAFETY MATRICES */
  timeout: 60 * 1000,        // 60s total execution limit per test case
  expect: {
    timeout: 10 * 1000,      // 10s timeout for individual assertions (e.g., expect().toBeVisible())
  },

  /* Run tests inside files in parallel to maximize local CPU utilization */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left a focused test (test.only) active */
  forbidOnly: !!process.env.CI,
  
  /* 🟢 SMART RETRY MECHANISMS */
  // Retries failed specs twice on GitHub CI servers and once locally to absorb network fluctuations
  retries: process.env.CI ? 2 : 1,
  
  /* Opt out of parallel file execution on CI to preserve clean container memory footprint */
  workers: process.env.CI ? 1 : 1,
  
  /* Report structure type output generation targets */
  reporter: "html",
  
  /* Shared settings for all the browser project targets configured below */
  use: {
    /* Base URL utilized for relative routing actions like `await page.goto('/')` */
    baseURL: "https://automationexercise.com/",

    /* 🟢 ACTION & NAVIGATION LAYER TIME LIMITS */
    actionTimeout: 15 * 1000,     // 15s cap for low-level pointer triggers (clicks, text fills)
    navigationTimeout: 20 * 1000, // 20s cap for page loading execution states

    /* 🟢 AUTOMATION EVIDENCE GATHERING HARVESTERS */
    trace: "retain-on-failure",   // Generates deep-dive trace zips exclusively for failing tests
    video: "retain-on-failure",   // Records clean MP4 execution videos only on failures
    screenshot: "only-on-failure", // Captures an immediate viewport picture at failure coordinates
    testIdAttribute: "data-qa",   // Configures page.getByTestId() to natively scan data-qa attributes
    
    /* 🟢 ADVANCED CHROMIUM INTERACTION CONTROL PARAMETERS */
    launchOptions: {
      slowMo: 300,                // 300ms action pacing delay helps lagging server connections keep up
      args: [
        '--disable-blink-features=AutomationControlled', // Masks automation flags to stop layout rendering glitches
        '--disable-web-security',                        // Helps bypass cross-origin sandboxing iframe freezes
      ]
    },
  },

  /* 🟢 CROSS-BROWSER MATRIX PLATFORMS */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});