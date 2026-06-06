import { test, expect } from "./baseTest";
import { AllProducts } from "../pages/allProducts";
import { Cart } from "../pages/cartPage";
import { RegisterUser } from "../pages/registerUser";
import { CheckoutPage } from "../pages/checkoutPage";
import { PaymentPage } from "../pages/paymentPage";
import { LoginUser } from "../pages/loginUser";
import { createUserData } from "../utils/dataFactory";

test.describe("Checkout & Order (TC14-16)", () => {
  test.beforeEach(async ({ page }) => {
    // 1-3. Launch browser, navigate to URL, and confirm landing visibility cleanly
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("TC14: Place order: Register while checkout", async ({ page }) => {
    // Instantiate all relevant page object modules
    const productsPage = new AllProducts(page);
    const cartPage = new Cart(page);
    const registerUser = new RegisterUser(page);
    const checkOutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const data = createUserData();

    // 4. Add products to cart
    await productsPage.addProductToCartByIndex(0);
    await productsPage.continueShoppingBtn.click();
    await productsPage.addProductToCartByIndex(1);

    // 5. Click 'Cart' button
    await productsPage.viewCartLink.click();

    // 6. Verify that cart page is displayed
    await expect(cartPage.cartRows).toHaveCount(2);
    await cartPage.verifyProductDetailsInCart(0, "Rs. 500", "1", "Rs. 500");
    await cartPage.verifyProductDetailsInCart(1, "Rs. 400", "1", "Rs. 400");

    // 7. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();

    // 8. Click 'Register / Login' button
    await cartPage.registerLoginModalLink.click();

    // 9-10. Fill all details in Signup and create account -> Verify 'ACCOUNT CREATED!'
    await registerUser.fullRegistration(data);
    await expect(page.getByText(/account created/i)).toBeVisible();
    await registerUser.continueBtn.click();

    // 11. Verify 'Logged in as username' at top navigation bar
    await expect(page.getByText(`Logged in as ${data.fullName}`)).toBeVisible();

    // 12. Click 'Cart' button
    await cartPage.navigateTo();

    // 13. Click 'Proceed To Checkout' button
    await cartPage.clickProceedToCheckout();

    // 14. Verify Address Details and Review Order matches Faker outputs
    await checkOutPage.verifyDeliveryName(data.firstName);

    // 15. Enter description in comment text area and click 'Place Order'
    await checkOutPage.enterCommentAndPlaceOrder(
      "Drop off at reception desk, thank you.",
    );

    // 16-17. Enter payment details and click 'Pay and Confirm Order' button
    await paymentPage.fillPaymentDetailsAndConfirm(
      data.fullName,
      "4111222233334444",
      "123",
      "12",
      "2030",
    );

    // 18. Verify success message 'Your order has been placed successfully!'
    await expect(paymentPage.successAlert).toBeVisible();

    // 19. Click 'Delete Account' button
    await page.getByRole("link", { name: "Delete Account" }).click();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(/account deleted/i)).toBeVisible();
    await registerUser.continueBtn.click();
  });

  test("TC15: Place order: Register before checkout", async ({ page }) => {
    const registerUser = new RegisterUser(page);
    const data = createUserData();
    const productsPage = new AllProducts(page);
    const cartPage = new Cart(page);
    const checkOutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    await page.getByRole("link", { name: "Signup / Login" }).click();
    await registerUser.fullRegistration(data);
    await expect(page.getByText(/account created/i)).toBeVisible();
    await registerUser.continueBtn.click();
    await expect(page.getByText(`Logged in as ${data.fullName}`)).toBeVisible();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.continueShoppingBtn.click();
    await cartPage.navigateTo();
    await expect(cartPage.cartRows).toHaveCount(1);
    await cartPage.clickProceedToCheckout();
    await checkOutPage.verifyDeliveryName(data.firstName);
    await checkOutPage.enterCommentAndPlaceOrder("drop off, thanks");
    await paymentPage.fillPaymentDetailsAndConfirm(
      data.fullName,
      "4111222233334444",
      "123",
      "12",
      "2030",
    );

    await expect(paymentPage.successAlert).toBeVisible();

    // 19. Click 'Delete Account' button
    await page.getByRole("link", { name: "Delete Account" }).click();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(/account deleted/i)).toBeVisible();
  });

  test("TC16: Place order: Login before checkout", async ({ page }) => {
    const registerUser = new RegisterUser(page);
    const data = createUserData();
    const productsPage = new AllProducts(page);
    const cartPage = new Cart(page);
    const checkOutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const loginUser = new LoginUser(page);

    await page.getByText("Signup / Login").click();
    await registerUser.fullRegistration(data);
    await expect(page.getByText(/account created/i)).toBeVisible();
    await registerUser.continueBtn.click();

    await page.getByText("Logout").click();
    await loginUser.login(data.email, data.password);
    await expect(page.getByText(`Logged in as ${data.fullName}`)).toBeVisible();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.continueShoppingBtn.click();
    await cartPage.navigateTo();
    await expect(cartPage.cartRows).toHaveCount(1);
    await cartPage.clickProceedToCheckout();
    await checkOutPage.verifyDeliveryName(data.firstName);
    await checkOutPage.enterCommentAndPlaceOrder("drop off, thanks");
    await paymentPage.fillPaymentDetailsAndConfirm(
      data.fullName,
      "4111222233334444",
      "123",
      "12",
      "2030",
    );

    await expect(paymentPage.successAlert).toBeVisible();

    // 19. Click 'Delete Account' button
    await page.getByRole("link", { name: "Delete Account" }).click();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(/account deleted/i)).toBeVisible();
  });

  test("TC23: Verify address details in checkout page", async ({ page }) => {
    const registerUser = new RegisterUser(page);
    const data = createUserData();
    const productsPage = new AllProducts(page);
    const cartPage = new Cart(page);
    const checkOutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const loginUser = new LoginUser(page);

    await page.getByText("Signup / Login").click();
    await registerUser.fullRegistration(data);
    await expect(page.getByText(/account created/i)).toBeVisible();
    await registerUser.continueBtn.click();

    await page.getByText("Logout").click();
    await loginUser.login(data.email, data.password);
    await expect(page.getByText(`Logged in as ${data.fullName}`)).toBeVisible();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.continueShoppingBtn.click();
    await cartPage.navigateTo();
    await expect(cartPage.cartRows).toHaveCount(1);
    await cartPage.clickProceedToCheckout();
    await checkOutPage.verifyDeliveryName(data.firstName);
    await checkOutPage.enterCommentAndPlaceOrder("drop off, thanks");
    await paymentPage.fillPaymentDetailsAndConfirm(
      data.fullName,
      "4111222233334444",
      "123",
      "12",
      "2030",
    );

    await expect(paymentPage.successAlert).toBeVisible();

    // 19. Click 'Delete Account' button
    await page.getByRole("link", { name: "Delete Account" }).click();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(/account deleted/i)).toBeVisible();
  });

  test("TC24: Download Invoice after purchase order", async ({ page }) => {
    const registerUser = new RegisterUser(page);
    const data = createUserData();
    const productsPage = new AllProducts(page);
    const cartPage = new Cart(page);
    const checkOutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const loginUser = new LoginUser(page);

    await page.getByText("Signup / Login").click();
    await registerUser.fullRegistration(data);
    await expect(page.getByText(/account created/i)).toBeVisible();
    await registerUser.continueBtn.click();

    await page.getByText("Logout").click();
    await loginUser.login(data.email, data.password);
    await expect(page.getByText(`Logged in as ${data.fullName}`)).toBeVisible();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.continueShoppingBtn.click();
    await cartPage.navigateTo();
    await expect(cartPage.cartRows).toHaveCount(1);
    await cartPage.clickProceedToCheckout();
    await checkOutPage.verifyDeliveryName(data.firstName);
    await checkOutPage.enterCommentAndPlaceOrder("drop off, thanks");
    await paymentPage.fillPaymentDetailsAndConfirm(
      data.fullName,
      "4111222233334444",
      "123",
      "12",
      "2030",
    );
    await checkOutPage.verifyOrderPlaced();
    await checkOutPage.downloadInvoice(data.firstName);
    await checkOutPage.continueBtn.click();

    await page.getByText("Delete Account").click();
    await checkOutPage.verifyAccountDeleted();
    await checkOutPage.continueBtn.click();
  });
});
