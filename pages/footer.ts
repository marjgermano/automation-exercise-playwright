import { expect, Page } from "@playwright/test";

export class Footer {
  constructor(private page: Page) {}

  get subscriptionHeader() {
    return this.page.getByRole("heading", { name: "Subscription" });
  }

  get subscribeEmailInput() {
    return this.page.locator("#susbscribe_email");
  }

  get subscribeBtn() {
    return this.page.locator("#subscribe");
  }

  get successMsg() {
    return this.page.locator("#success-subscribe");
  }

  // Actions

  async subscribe(email: string) {
    await this.subscribeEmailInput.fill(email);
    await this.subscribeBtn.click();
  }

  async verifySuccessMsg() {
    await expect(this.successMsg).toBeVisible();
    await expect(this.successMsg).toHaveText(
      "You have been successfully subscribed!",
    );
  }
}
