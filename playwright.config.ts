import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

if (!process.env.CI) {
  process.env.PLAYWRIGHT_BROWSERS_PATH = '0';
}

export default defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  expect: { timeout: 10 * 1000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 1,
  reporter: "html",
  
  /* Shared settings for all the browser projects below */
  use: {
    baseURL: "https://automationexercise.com/",
    actionTimeout: 15 * 1000,
    navigationTimeout: 20 * 1000,
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    testIdAttribute: "data-qa",
    
    
    launchOptions: {
      slowMo: 300,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"],
        
        launchOptions: {
          slowMo: 300,
          args: [
            '--disable-blink-features=AutomationControlled',
            '--disable-web-security',
          ]
        }
      },
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