import { Page } from "@playwright/test";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  uploadFilePath?: string;
}

export class ContactUsPage {
  constructor(private page: Page) {}

  // Locators
  get nameInput() {
    return this.page.getByTestId("name");
  }
  get emailInput() {
    return this.page.getByTestId("email");
  }
  get subjectInput() {
    return this.page.getByTestId("subject");
  }
  get messageInput() {
    return this.page.getByTestId("message");
  }
  get fileUploadInput() {
    return this.page.locator('input[name="upload_file"]');
  }
  get submitBtn() {
    return this.page.getByRole("button", { name: "Submit" });
  }

  async submitForm(data: ContactFormData) {
    // 1. Fill text fields
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);

    // 2. Handle optional file upload
    if (data.uploadFilePath) {
      await this.fileUploadInput.setInputFiles(data.uploadFilePath);
    }

    // 3. Handle the browser dialog
    this.page.once("dialog", (dialog) => dialog.accept());

    // 4. Click Submit
    await this.submitBtn.click();
  }
}
