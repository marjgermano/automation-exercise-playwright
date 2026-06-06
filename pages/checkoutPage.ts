import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  // ==========================================
  // Locators
  // ==========================================
  get deliveryAddressTitle() {
    return this.page.locator("#address_delivery .address_firstname");
  }

  get commentTextArea() {
    return this.page.locator('textarea[name="message"]');
  }

  get placeOrderBtn() {
    return this.page.locator('a:has-text("Place Order")');
  }

  get orderPlacedHeader() {
    return this.page.locator('[data-qa="order-placed"] b');
  }

  get downloadInvoiceBtn() {
    return this.page.getByRole('link', { name: 'Download Invoice' });
  }

  get continueBtn() {
    return this.page.locator('[data-qa="continue-button"]');
  }

  get accountDeletedHeader() {
    return this.page.locator('[data-qa="account-deleted"] b');
  }

  // ==========================================
  // Actions
  // ==========================================
  async verifyDeliveryName(firstName: string) {
    // Verifies that the delivery panel contains the dynamic user name
    await expect(this.deliveryAddressTitle).toContainText(firstName);
  }

  async enterCommentAndPlaceOrder(comment: string) {
    await this.commentTextArea.fill(comment);
    await this.placeOrderBtn.click();
  }

  async verifyOrderPlaced() {
    // Verifies success message 'ORDER PLACED!' is displayed cleanly
    await expect(this.orderPlacedHeader).toBeVisible();
    await expect(this.orderPlacedHeader).toHaveText(/ORDER PLACED!/i);
  }

  async downloadInvoice(firstName: string) {
    // Set up the download event listener promise thread before clicking
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadInvoiceBtn.click();
    const download = await downloadPromise;
    
    // Assert that the file downloaded successfully with expected extension type
    expect(download.suggestedFilename()).toContain('.txt');
    
    // Save the downloaded file into a dedicated execution workspace folder
    await download.saveAs(`./test-results/invoice_${firstName}.txt`);
  }

  async verifyAccountDeleted() {
    // Verify 'ACCOUNT DELETED!' text heading display state
    await expect(this.accountDeletedHeader).toBeVisible();
    await expect(this.accountDeletedHeader).toHaveText(/ACCOUNT DELETED!/i);
  }
}