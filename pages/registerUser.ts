// import { Page, Locator } from '@playwright/test';

// export class RegisterUser {
//     readonly page: Page;
//     readonly signupName: Locator;
//     readonly signupEmail: Locator;
//     readonly signupBtn: Locator;
//     readonly passwordInput: Locator;
//     readonly firstNameInput: Locator;
//     readonly lastNameInput: Locator;
//     readonly addressInput: Locator;
//     readonly stateInput: Locator;
//     readonly cityInput: Locator;
//     readonly zipInput: Locator;
//     readonly mobileInput: Locator;
//     readonly createAccBtn: Locator;

//     constructor(page: Page) {
//         this.page = page;
//         this.signupName = page.getByTestId('signup-name');
//         this.signupEmail = page.getByTestId('signup-email');
//         this.signupBtn = page.getByRole('button', { name: 'Signup' });
//         this.passwordInput = page.getByTestId('password');
//         this.firstNameInput = page.getByTestId('first_namo-e');
//         this.lastNameInput = page.getByTestId('last_name');
//         this.addressInput = page.getByTestId('address');
//         this.stateInput = page.getByTestId('state');
//         this.cityInput = page.getByTestId('city');
//         this.zipInput = page.getByTestId('zipcode');
//         this.mobileInput = page.getByTestId('mobile_number');
//         this.createAccBtn = page.getByRole('button', { name: 'Create Account' });
//     }

//     async fullRegistration(data: any) {
//         await this.signupName.fill(data.fullName);
//         await this.signupEmail.fill(data.email);
//         await this.signupBtn.click();

//         // Form details
//         await this.page.getByRole('radio', { name: 'Mrs.' }).check();
//         await this.passwordInput.fill(data.password);
//         await this.firstNameInput.fill(data.firstName);
//         await this.lastNameInput.fill(data.lastName);
//         await this.addressInput.fill(data.address);
//         await this.stateInput.fill(data.state);
//         await this.cityInput.fill(data.city);
//         await this.zipInput.fill(data.zip);
//         await this.mobileInput.fill(data.phone);
//         await this.createAccBtn.click();
//     }
// }

import { Page } from "@playwright/test";

export class RegisterUser {
  constructor(private page: Page) {}

  get signupName() {
    return this.page.getByTestId("signup-name");
  }
  get signupEmail() {
    return this.page.getByTestId("signup-email");
  }
  get signupBtn() {
    return this.page.getByRole("button", { name: "Signup" });
  }
  get passwordInput() {
    return this.page.getByTestId("password");
  }
  get firstNameInput() {
    return this.page.getByTestId("first_name");
  }
  get lastNameInput() {
    return this.page.getByTestId("last_name");
  }
  get addressInput() {
    return this.page.getByTestId("address");
  }
  get stateInput() {
    return this.page.getByTestId("state");
  }
  get cityInput() {
    return this.page.getByTestId("city");
  }
  get zipInput() {
    return this.page.getByTestId("zipcode");
  }
  get mobileInput() {
    return this.page.getByTestId("mobile_number");
  }
  get createAccBtn() {
    return this.page.getByRole("button", { name: "Create Account" });
  }

  // THIS WAS MISSING:
  get continueBtn() {
    return this.page.getByRole("link", { name: "Continue" });
  }

  async fullRegistration(data: any) {
    await this.signupName.fill(data.fullName);
    await this.signupEmail.fill(data.email);
    await this.signupBtn.click();

    await this.page.getByRole("radio", { name: "Mrs." }).check();
    await this.passwordInput.fill(data.password);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipInput.fill(data.zip);
    await this.mobileInput.fill(data.phone);
    await this.createAccBtn.click();
  }
}
