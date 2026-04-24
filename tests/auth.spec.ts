import { test, expect } from "@playwright/test";
import { RegisterUser, RegisterUserData } from "../pages/registerUser";
import { LoginUser } from "../pages/loginUser";
import { faker } from "@faker-js/faker";

// Data Generator with Randomized Title
const createUserData = (): RegisterUserData => ({
  title: faker.helpers.arrayElement(["Mr.", "Mrs."]),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  city: faker.location.city(),
  zip: faker.location.zipCode(),
  phone: faker.phone.number(),
});

test.describe("Automation Exercise: User Authentication (TC 1-5)", () => {
  let registerUser: RegisterUser;
  let loginUser: LoginUser;

  test.beforeEach(async ({ page }) => {
    registerUser = new RegisterUser(page);
    loginUser = new LoginUser(page);
    await page.goto("/", { waitUntil: "load" });
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("TC1: Register User and Delete Account", async ({ page }) => {
    const data = createUserData();
    console.log(`TC1: Testing with ${data.title} - ${data.email}`);

    await page.getByRole("link", { name: "Signup / Login" }).click();
    await registerUser.fullRegistration(data);
    await expect(page.getByText(/account created/i)).toBeVisible();

    await registerUser.continueBtn.click();
    await page.getByRole("link", { name: "Delete Account" }).click();
    await expect(page.getByText(/account deleted/i)).toBeVisible();
  });

  test("TC2: Login User with correct credentials", async ({ page }) => {
    const data = createUserData();

    // 1. Setup: Create user
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await registerUser.fullRegistration(data);
    await registerUser.continueBtn.click();
    await page.getByRole("link", { name: "Logout" }).click();

    // 2. Login
    await loginUser.login(data.email, data.password);
    await expect(page.getByText(`Logged in as ${data.fullName}`)).toBeVisible();
  });

  test("TC3: Login User with incorrect credentials", async ({ page }) => {
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await loginUser.login("wrong_user@test.com", "InvalidPass123");
    await expect(
      page.getByText(/your email or password is incorrect/i),
    ).toBeVisible();
  });

  test("TC4: Logout User", async ({ page }) => {
    const data = createUserData();
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await registerUser.fullRegistration(data);
    await registerUser.continueBtn.click();

    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page).toHaveURL(/.*login/);
  });

  test("TC5: Register User with existing email", async ({ page }) => {
    const data = createUserData();
    console.log(`TC5: Testing existing email flow for ${data.email}`);

    // 1. Register first time
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await registerUser.fullRegistration(data);
    await registerUser.continueBtn.click();
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page).toHaveURL(/.*login/);

    // 2. Attempt registration with same data
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await registerUser.enterSignupDetails(data.fullName, data.email);

    // Assert error message
    await expect(registerUser.errorMessage).toBeVisible();
  });
});
