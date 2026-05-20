import { test, expect } from "./baseTest";
import { AllProducts } from "../pages/allProducts";
import { ProductDetails } from "../pages/productDetails";
import { Cart } from "../pages/cartPage";

test.describe("Cart & Subscription (TC 12-13)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("TC12: Add product in cart", async ({ page }) => {
    const productsPage = new AllProducts(page);
    const cartPage = new Cart(page);

    await productsPage.navigateTo();
    await expect(productsPage.allProductsHeader).toBeVisible();
    await productsPage.addProductToCartByIndex(0);
    await productsPage.continueShoppingBtn.click();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.viewCartLink.click();
    await expect(cartPage.cartRows).toHaveCount(2);
    await cartPage.verifyProductDetailsInCart(0, "Rs. 500", "1", "Rs. 500");
    await cartPage.verifyProductDetailsInCart(1, "Rs. 400", "1", "Rs. 400");
  });

  test("TC13: Verify product quantity in cart", async ({ page }) => {
    const productsPage = new AllProducts(page);
    const productDetails = new ProductDetails(page);
    const cartPage = new Cart(page);

    await productsPage.firstProductViewBtn.click();
    await expect(productDetails.productName).toBeVisible();
    await productDetails.setQuantityAndAddToCart("4");
    await productsPage.viewCartLink.click();
    await cartPage.verifyProductDetailsInCart(0, "Rs. 500", "4", "Rs. 2000");
  });

  test("TC17: Remove products from cart", async ({ page }) => {
    const productsPage = new AllProducts(page);
    const cartPage = new Cart(page);

    await productsPage.addProductToCartByIndex(1);
    await productsPage.viewCartLink.click();
    await expect(cartPage.cartRows).toHaveCount(1);
    await cartPage.deleteProductFromCart.click();
    await expect(cartPage.cartRows).toHaveCount(0);
  });
});
