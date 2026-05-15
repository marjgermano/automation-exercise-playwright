import { test, expect } from "./baseTest";
import { AllProducts } from "../pages/allProducts";
import { ProductDetails } from "../pages/productDetails";

test.describe("Product Catalog (TC 8-9)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("TC8: Verify all products and product detail page", async ({ page }) => {
    const productsPage = new AllProducts(page);
    const productDetails = new ProductDetails(page);

    await page.goto("/", { waitUntil: "load" });

    //Products page
    await productsPage.navigateTo();
    await expect(productsPage.allProductsHeader).toBeVisible();
    await expect(productsPage.productList).toBeVisible();
    await productsPage.firstProductViewBtn.click();
    await expect(productDetails.productName).toBeVisible();
    await expect(productDetails.productName).toBeVisible();
    await expect(productDetails.productCategory).toBeVisible();
    await expect(productDetails.productPrice).toBeVisible();
    await expect(productDetails.productAvailability).toBeVisible();
    await expect(productDetails.productCondition).toBeVisible();
    await expect(productDetails.productBrand).toBeVisible();
  });
});
