import { test, expect } from "./baseTest";
import { SidebarComponent } from "../pages/components/SidebarComponent";

test.describe("Product Categories (TC18)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("TC18: View Category Products", async ({ page }) => {
    const sidebar = new SidebarComponent(page);

    await expect(sidebar.categorySidebarTitle).toBeVisible();

    await sidebar.expandCategory("Women");

    await sidebar.selectSubCategory("Women", "Dress");

    await expect(page).toHaveURL(/.*category_products.*/);
    await expect(sidebar.categoryPageTitleHeader).toHaveText(
      "Women - Dress Products",
    );

    await sidebar.expandCategory("Men");
    await sidebar.selectSubCategory("Men", "TShirts");

    await expect(page).toHaveURL(/.*category_products.*/);
    await expect(sidebar.categoryPageTitleHeader).toHaveText(
      "Men - Tshirts Products",
    );
  });
});
