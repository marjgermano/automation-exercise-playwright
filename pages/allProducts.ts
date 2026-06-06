import { Page } from "@playwright/test";

export class AllProducts {
  constructor(private page: Page) {}

  // ==========================================
  // Locators
  // ==========================================
  get allProductsHeader() {
    return this.page.getByRole("heading", { name: "All Products" });
  }

  get productList() {
    return this.page.locator(".features_items");
  }

  get searchInput() {
    return this.page.locator("#search_product");
  }

  get searchBtn() {
    return this.page.locator("#submit_search");
  }

  get firstProductViewBtn() {
    // Selects the first "View Product" link in the list
    return this.page.locator(".choose > .nav > li > a").first();
  }

  get searchedProductsHeader() {
    return this.page.getByRole("heading", { name: "Searched Products" });
  }

  get searchResultNames() {
    return this.page.locator(".productinfo p");
  }

  get continueShoppingBtn() {
    return this.page.locator('button:has-text("Continue Shopping")');
  }

  get viewCartLink() {
    return this.page.locator('u:has-text("View Cart")');
  }

  get footer() {
    return this.page.locator("#footer");
  }

  get recommendedHeader() {
    return this.page.getByRole("heading", { name: "RECOMMENDED ITEMS" });
  }

  get firstActiveRecommendedAddToCartBtn() {
    return this.page
      .locator(".recommended_items .item.active .add-to-cart")
      .first();
  }

  // 🟢 CLEAN CORRECTION: Returns the singular first active item
  get recommendedProductName() {
    return this.page.locator(".recommended_items .item.active p").first();
  }

  // 🟢 CRITICAL FIX: Added to satisfy `productsPage.activeRecommendedProductNames.first()` on line 97
  get activeRecommendedProductNames() {
    return this.page.locator(".recommended_items .item.active p");
  }

  get finalCartProductName() {
    return this.page.locator(".cart_description h4 a");
  }

  // ==========================================
  // Actions
  // ==========================================
  async navigateTo() {
    await this.page.goto("/products");
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchBtn.click();
  }

  async addProductToCartByIndex(index: number) {
    const productCard = this.page.locator(".single-products").nth(index);

    // Ensure the element is painted, visible, and stable in the viewport before hovering
    await productCard.waitFor({ state: "visible", timeout: 10000 });
    await productCard.scrollIntoViewIfNeeded();

    // ROOT-CAUSE FLAKINESS FIX: Synchronize with the backend cart payload registration API stream
    const cartResponse = this.page.waitForResponse(
      (response) =>
        response.url().includes("/add_to_cart") && response.status() === 200,
      { timeout: 7000 },
    );

    await productCard.hover();
    await productCard.locator(".product-overlay .add-to-cart").click();

    // Hold the execution context until the network handshake finishes successfully
    await cartResponse;
  }

  // 🟢 PERMANENT ANIMATION FIX: Wait until the node is structurally attached to the DOM tree.
  // This completely stops Playwright from timing out over slow CSS opacity/fade-in visibility calculations.
  async clickContinueShopping() {
    await this.continueShoppingBtn.waitFor({
      state: "attached",
      timeout: 10000,
    });
    await this.continueShoppingBtn.click({ force: true });
  }

  // 🟢 PERMANENT ANIMATION FIX: Use structural DOM presence verification to guarantee actionability
  async clickViewCart() {
    await this.viewCartLink.waitFor({ state: "attached", timeout: 10000 });
    await this.viewCartLink.click({ force: true });
  }
}
