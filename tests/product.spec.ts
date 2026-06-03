import { test, expect } from "./baseTest";
import { AllProducts } from "../pages/allProducts";
import { ProductDetails } from "../pages/productDetails";
import { SidebarComponent } from "../pages/components/SidebarComponent";

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

  test("TC9: Search product", async ({ page }) => {
    const productsPage = new AllProducts(page);
    const searchKeyword = "Blue Top";

    await productsPage.navigateTo();
    await expect(productsPage.allProductsHeader).toBeVisible();

    await productsPage.searchForProduct(searchKeyword);

    await expect(productsPage.searchedProductsHeader).toBeVisible();

    // Verify all products related to search are visible
    // Get the collection of all product names in the search results
    const products = productsPage.searchResultNames;

    // Ensure at least one product was found
    await expect(products).not.toHaveCount(0);

    // Loop through every product found and verify the text
    const allNames = await products.allTextContents();
    for (const name of allNames) {
      expect(name.toLowerCase()).toContain(searchKeyword.toLowerCase());
    }
  });

  test("TC18: View Category Products", async ({ page }) => {
    const sidebar = new SidebarComponent(page);

    // 3. Verify that categories are visible on left side bar
    await expect(sidebar.categorySidebarTitle).toBeVisible();

    // 4. Click on 'Women' category
    await sidebar.expandCategory("Women");

    // 5. Click on any category link under 'Women' category, for example: Tops
    // (We use 'Tops' here to match the site's default header expectation in Step 6!)
    await sidebar.selectSubCategory("Women", "Tops");

    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect(page).toHaveURL(/.*category_products.*/);
    await expect(sidebar.categoryPageTitleHeader).toHaveText(
      "Women - Tops Products",
    );

    // 7. On left side bar, click on any sub-category link of 'Men' category
    await sidebar.expandCategory("Men");
    await sidebar.selectSubCategory("Men", "TShirts");

    // 8. Verify that user is navigated to that category page and header matches
    await expect(page).toHaveURL(/.*category_products.*/);
    await expect(sidebar.categoryPageTitleHeader).toHaveText(
      "Men - Tshirts Products",
    );
  });

  test('TC19: View & cart brand products', async({page})=> {
const sidebar = new SidebarComponent(page);

    await page.getByRole('link', { name: ' Products' }).click({ timeout: 10000 });
    await page.waitForURL(/.*products.*/, { timeout: 10000 });
    await expect(sidebar.brandSidebarTitle).toBeVisible();
    await sidebar.selectBrand('Polo');
    await expect(page).toHaveURL(/.*brand_products\/Polo.*/);
    await expect(sidebar.categoryPageTitleHeader).toHaveText('Brand - Polo Products');
  })
});
