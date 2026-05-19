import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  // Locators
  get deliveryAddressTitle() {
    return this.page.locator("#address_delivery .address_firstname");
  }

  get commentTextArea() {
    return this.page.locator('textarea[name="message"]');
  }

  get placeOrderBtn() {
    return this.page.locator('a:has-text("Place Order")');
  }

  // Actions
  async verifyDeliveryName(firstName: string) {
    // Verifies that the delivery panel contains the dynamic user name
    await expect(this.deliveryAddressTitle).toContainText(firstName);
  }

  async enterCommentAndPlaceOrder(comment: string) {
    await this.commentTextArea.fill(comment);
    await this.placeOrderBtn.click();
  }
}
