import { expect, Page } from "@playwright/test";

export class Cart {
  constructor(private page: Page) {}

  get cartRows() {
    return this.page.locator("#cart_info_table tbody tr");
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
}
