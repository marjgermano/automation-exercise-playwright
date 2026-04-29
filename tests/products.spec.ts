import { test, expect } from "./baseTest";
import { AllProducts } from "../pages/allProducts";
import { ProductDetails } from "../pages/productDetails";


test('TC8: Verify All Products and product detail page', async ({ page }) => {
    const productsPage = new AllProducts(page);
    const detailPage = new ProductDetails(page);

    // 1. Navigate to products page
    await productsPage.navigateTo();
    await expect(productsPage.allProductsHeader).toBeVisible();

    // 2. Click on 'View Product' of first product
    await productsPage.firstProductViewBtn.click();

    // 3. Verify user is landed to product detail page
 await expect(page).toHaveURL('https://automationexercise.com/product_details/1');

    // 4. Verify all details are visible
    await detailPage.verifyProductDetailsVisible();
});