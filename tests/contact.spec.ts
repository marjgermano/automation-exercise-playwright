import { test, expect } from "@playwright/test";
import { ContactUsPage, ContactFormData } from "../pages/contactForm";
import { faker } from "@faker-js/faker";
import * as fs from "fs";

const createContactData = (): ContactFormData => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  subject: faker.word.sample(),
  message: faker.lorem.paragraph(),
});

test("TC6: Contact Us Form", async ({ page }) => {
  const contactUsPage = new ContactUsPage(page);
  const data = createContactData();
  //Create dummy file
  const filePath = "test-file.txt";
  fs.writeFileSync(filePath, "This is a dummy file for TC6 upload testing.");

  await page.goto("/", { waitUntil: "load" });
  await expect(page).toHaveTitle(/Automation Exercise/);
  await page.getByRole("link", { name: "Contact us" }).click();

  await expect(
    page.getByRole("heading", { name: "GET IN TOUCH" }),
  ).toBeVisible();
  await contactUsPage.submitForm({ ...data, uploadFilePath: filePath });

  //   await expect(page.locator(".status.alert.alert-success")).toHaveCount(1);

  //   await page.locator("a.btn.btn-success").click();
  //   await expect(page).toHaveURL("/");
  await expect(page).toHaveTitle(/Automation Exercise/);
});
