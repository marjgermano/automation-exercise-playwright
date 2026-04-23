import { Page } from "@playwright/test";

export class LoginUser {
  constructor(private page: Page) {}

  get loginEmail() {
    return this.page.getByTestId("login-email");
  }
  get loginPassword() {
    return this.page.getByTestId("login-password");
  }
  get loginBtn() {
    return this.page.getByRole("button", { name: "Login" });
  }

  async login(email: string, pass: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(pass);
    await this.loginBtn.click();
  }
}
