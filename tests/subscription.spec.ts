import { test, expect } from "./baseTest";
import { Footer } from "../pages/footer";

test.describe("TC 10-11: Cart & Subscription", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("TC10: Verify subscription in homepage", async ({ page }) => {
    const footer = new Footer(page);
    await expect(footer.subscriptionHeader).toBeVisible();
    await footer.subscribe("examples@email.com");
    await footer.verifySuccessMsg();
  });

  test("TC11: Verify subscription in Cart page", async ({ page }) => {
    const footer = new Footer(page);

    await page.goto("view_cart");
    await expect(footer.subscriptionHeader).toBeVisible();
    await footer.subscribe("examples@email.com");
    await footer.verifySuccessMsg();
  });
});
