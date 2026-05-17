import { Page } from "@playwright/test";

export class AllProducts {
  constructor(private page: Page) {}

  // Locators
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

  // Actions
  async navigateTo() {
    await this.page.goto("/products");
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchBtn.click();
  }

  async addProductToCartByIndex(index: number) {
    const productCard = this.page.locator(".single-products").nth(index);

    await productCard.hover();
    await productCard.locator(".product-overlay .add-to-cart").click();
  }
}
