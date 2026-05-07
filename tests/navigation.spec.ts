import { test, expect } from "./baseTest";

test("TC7: Verify Test Cases page", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  await expect(page).toHaveTitle("Automation Exercise");
  await page.getByRole("button", { name: "Test Cases" }).click();
  await expect(page).toHaveURL("/test_cases");
});
