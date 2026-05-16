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

    //Products page
    await productsPage.navigateTo();
    await expect(productsPage.allProductsHeader).toBeVisible();
    await expect(productsPage.productList).toBeVisible();
    await productsPage.firstProductViewBtn.click();
    await productDetails.verifyProductDetailsVisible();
  });

  //   test("TC9: Search product", async ({ page }) => {
  //     const productsPage = new AllProducts(page);

  //     await productsPage.navigateTo();
  //     await expect(productsPage.allProductsHeader).toBeVisible();
  //     await productsPage.searchForProduct('Blue Top')
  //     await expect(productsPage.searchedProductsHeader).toBeVisible()
  //   });

  test("TC9: Search product", async ({ page }) => {
    const productsPage = new AllProducts(page);
    const searchKeyword = "Blue Top";

    // 1-5. Navigate and Verify "All Products"
    await productsPage.navigateTo();
    await expect(productsPage.allProductsHeader).toBeVisible();

    // 6. Enter product name and click search
    await productsPage.searchForProduct(searchKeyword);

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    await expect(productsPage.searchedProductsHeader).toBeVisible();

    // 8. Verify all products related to search are visible
    // We get the collection of all product names in the search results
    const products = productsPage.searchResultNames;

    // Safety check: Ensure at least one product was foundfcd[=-c vv]
    await expect(products).not.toHaveCount(0);

    // Loop through every product found and verify the text
    const allNames = await products.allTextContents();
    for (const name of allNames) {
      expect(name.toLowerCase()).toContain(searchKeyword.toLowerCase());
    }
  });
});
