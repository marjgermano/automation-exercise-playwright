import { expect, Page } from "@playwright/test";

export class Cart {
  constructor(private page: Page) {}

  get cartRows() {
    return this.page.locator("#cart_info_table tbody tr");
  }

  get proceedToCheckoutBtn() {
    return this.page.locator('a:has-text("Proceed To Checkout")');
  }
  get registerLoginModalLink() {
    return this.page.locator('u:has-text("Register / Login")');
  }

  get deleteProductFromCart() {
    return this.page.locator(".cart_quantity_delete");
  }

  async verifyProductDetailsInCart(
    rowIndex: number,
    expectedPrice: string,
    expectedQuantity: string,
    expectedTotal: string,
  ) {
    const row = this.cartRows.nth(rowIndex);

    await expect(row.locator(".cart_price p")).toHaveText(expectedPrice);
    await expect(row.locator(".cart_quantity button")).toHaveText(
      expectedQuantity,
    );
    await expect(row.locator(".cart_total_price")).toHaveText(expectedTotal);
  }

  async navigateTo() {
    await this.page.goto("/view_cart");
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
}
