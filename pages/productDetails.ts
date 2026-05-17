import { Page, expect } from "@playwright/test";

export interface ProductDetailsData {
  name: string;
  category: string;
  price: string;
  availabily: string;
  condition: string;
  brand: string;
}

export class ProductDetails {
  constructor(private page: Page) {}

  //Locators
  get productName() {
    return this.page.locator(".product-information h2");
  }

  get productCategory() {
    return this.page
      .locator(".product-information p")
      .filter({ hasText: "Category:" });
  }

  get productPrice() {
    return this.page.locator(".product-information span span").first();
  }

  get productAvailability() {
    return this.page
      .locator(".product-information p")
      .filter({ hasText: "Availability:" });
  }

  get productCondition() {
    return this.page
      .locator(".product-information p")
      .filter({ hasText: "Condition:" });
  }

  get productBrand() {
    return this.page
      .locator(".product-information p")
      .filter({ hasText: "Brand:" });
  }

  get quantityInput() {
    return this.page.locator("#quantity");
  }

  get addToCartBtn() {
    return this.page.locator('button:has-text("Add to cart")');
  }

  async verifyProductDetailsVisible() {
    // TC8 requires verifying that these specific details are displayed
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async setQuantityAndAddToCart(quantity: string) {
    await this.quantityInput.fill(quantity);
    await this.addToCartBtn.click();
  }
}
