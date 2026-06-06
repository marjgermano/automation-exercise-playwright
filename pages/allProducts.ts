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

    await productCard.hover();
    await productCard.locator(".product-overlay .add-to-cart").click();
  }

  // 🟢 TARGETED ANIMATION FIX: Explicitly wait for modal layout stabilization
  async clickContinueShopping() {
    await this.continueShoppingBtn.waitFor({ state: "visible", timeout: 7000 });
    await this.continueShoppingBtn.click({ force: true });
  }

  // 🟢 TARGETED ANIMATION FIX: Explicitly wait for modal layout stabilization
  async clickViewCart() {
    await this.viewCartLink.waitFor({ state: "visible", timeout: 7000 });
    await this.viewCartLink.click({ force: true });
  }
}

// import { Page } from "@playwright/test";

// export class AllProducts {
//   constructor(private page: Page) {}

//   // Locators
//   get allProductsHeader() {
//     return this.page.getByRole("heading", { name: "All Products" });
//   }

//   get productList() {
//     return this.page.locator(".features_items");
//   }

//   get searchInput() {
//     return this.page.locator("#search_product");
//   }

//   get searchBtn() {
//     return this.page.locator("#submit_search");
//   }

//   get firstProductViewBtn() {
//     // Selects the first "View Product" link in the list
//     return this.page.locator(".choose > .nav > li > a").first();
//   }

//   get searchedProductsHeader() {
//     return this.page.getByRole("heading", { name: "Searched Products" });
//   }

//   get searchResultNames() {
//     return this.page.locator(".productinfo p");
//   }

//   get continueShoppingBtn() {
//     return this.page.locator('button:has-text("Continue Shopping")');
//   }

//   get viewCartLink() {
//     return this.page.locator('u:has-text("View Cart")');
//   }

//   get footer(){
//     return this.page.locator("#footer");
//   }

//   get recommendedHeader(){
//     return this.page.getByRole('heading', { name: 'RECOMMENDED ITEMS' });
//   }

//   get firstActiveRecommendedAddToCartBtn(){
//     return this.page.locator('.recommended_items .item.active .add-to-cart').first();
//   }

//   get recommendedProductName(){
//     return this.page.locator('.recommended_items .item.active p').first().textContent();
//   }

//   get finalCartProductName(){
//     return this.page.locator('.cart_description h4 a')
//   }

//   // Actions
//   async navigateTo() {
//     await this.page.goto("/products");
//   }

//   async searchForProduct(productName: string) {
//     await this.searchInput.fill(productName);
//     await this.searchBtn.click();
//   }

//   async addProductToCartByIndex(index: number) {
//     const productCard = this.page.locator(".single-products").nth(index);

//     await productCard.hover();
//     await productCard.locator(".product-overlay .add-to-cart").click();
//   }
// }
