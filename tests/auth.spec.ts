import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { RegisterUser } from "../pages/registerUser";
import { LoginUser } from "../pages/loginUser";
import "dotenv/config";

test.describe("User Authentication (TC 1-5)", () => {
  let registerUser: RegisterUser;
  let loginUser: LoginUser;

  const createUserData = () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: process.env.USER_PASSWORD || "TestPass123!",
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zip: faker.location.zipCode(),
    phone: faker.phone.number(),
  });

  test.beforeEach(async ({ page }) => {
    registerUser = new RegisterUser(page);
    loginUser = new LoginUser(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle('Automation Exercise')
  });

  test("TC1: Register User", async ({ page }) => {
    const data = createUserData();
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await registerUser.fullRegistration(data);
    await expect(page.getByText(/account created/i)).toBeVisible();
    await registerUser.continueBtn.click();
    await expect(page.getByText(`Logged in as ${data.fullName}`)).toBeVisible();
    await page.getByRole("link", { name: "Delete Account" }).click();
    await expect(page.getByText(/account deleted/i)).toBeVisible();
  });

  test("TC2: Login User with correct email and password", async ({ page }) => {
    const data = createUserData();
    // 1. Create user & Logout
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await registerUser.fullRegistration(data);
    await registerUser.continueBtn.click();
    await page.getByRole("link", { name: "Logout" }).click();
    // 2. Login & Delete
    await loginUser.login(data.email, data.password);
    await expect(page.getByText(`Logged in as ${data.fullName}`)).toBeVisible();
    await page.getByRole("link", { name: "Delete Account" }).click();
    await expect(page.getByText(/account deleted/i)).toBeVisible();
  });

  test("TC3: Login User with incorrect email and password", async ({ page }) => {
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await loginUser.login(faker.internet.email(), faker.internet.password());
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

  test('Register User with existing email', async({page}) => {
    const user = createUserData()
    
  })
  
});



