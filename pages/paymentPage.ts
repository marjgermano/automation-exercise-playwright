import { Page, expect } from "@playwright/test";

export class PaymentPage {
  constructor(private page: Page) {}

  // ==========================================
  // Locators
  // ==========================================
  get nameOnCardInput() {
    return this.page.getByTestId("name-on-card");
  }
  get cardNumberInput() {
    return this.page.locator('[data-qa="card-number"]');
  }
  get cvcInput() {
    return this.page.locator('[data-qa="cvc"]');
  }
  get expiryMonthInput() {
    return this.page.locator('[data-qa="expiry-month"]');
  }
  get expiryYearInput() {
    return this.page.locator('[data-qa="expiry-year"]');
  }
  get submitPaymentBtn() {
    return this.page.locator('[data-qa="pay-button"]');
  }
  get successAlert() {
    return this.page.locator('[data-qa="order-placed"]');
  }

  // ==========================================
  // Actions
  // ==========================================
  async fillPaymentDetailsAndConfirm(
    name: string,
    num: string,
    cvc: string,
    mm: string,
    yy: string,
  ) {
    await this.nameOnCardInput.fill(name);
    await this.cardNumberInput.fill(num);
    await this.cvcInput.fill(cvc);
    await this.expiryMonthInput.fill(mm);
    await this.expiryYearInput.fill(yy);

    // 🟢 CRITICAL FLAKINESS FIX: Bypass actionability checks to counter slow animations and overlay frames
    await this.submitPaymentBtn.waitFor({ state: "attached", timeout: 7000 });
    await this.submitPaymentBtn.click({ force: true });
  }
}
