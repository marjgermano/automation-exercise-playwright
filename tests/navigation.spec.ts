import { test, expect } from "./baseTest";

test.describe("TC7, TC25-26", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Automation Exercise");
  });

  test("TC7: Verify Test Cases page", async ({ page }) => {
    await page.getByRole("button", { name: "Test Cases" }).click();
    await expect(page).toHaveURL("/test_cases");
  });

  test("TC25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async ({
    page,
  }) => {
    const topCarouselHeader = page
      .getByRole("heading", {
        name: "Full-Fledged practice website for Automation Engineers",
      })
      .first();
    const subscriptionHeader = page.getByRole("heading", {
      name: "Subscription",
    });

    await expect(topCarouselHeader).toBeVisible();
    await subscriptionHeader.scrollIntoViewIfNeeded();
    await expect(subscriptionHeader).toBeVisible();
    await page.locator("#scrollUp").click();
    await expect(topCarouselHeader).toBeInViewport();
    await expect(topCarouselHeader).toBeVisible();
  });

  test("TC26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({
    page,
  }) => {
    const topCarouselHeader = page
      .getByRole("heading", {
        name: "Full-Fledged practice website for Automation Engineers",
      })
      .first();
    const subscriptionHeader = page.getByRole("heading", {
      name: "Subscription",
    });

    await expect(topCarouselHeader).toBeVisible();
    await subscriptionHeader.scrollIntoViewIfNeeded();
    await expect(subscriptionHeader).toBeVisible();
    await topCarouselHeader.scrollIntoViewIfNeeded();
    await expect(topCarouselHeader).toBeInViewport();
    await expect(topCarouselHeader).toBeVisible();
  });
});
