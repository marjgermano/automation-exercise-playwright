import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import 'dotenv/config';

test('Register user with dynamic data and delete account', async ({ page }) => {
    // 1. Define dynamic test data (One-time generation per test run)
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const randomEmail = faker.internet.email();
    const company = faker.company.name();
    const streetAddress = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();
    const phone = faker.phone.number();

    // 2. Start Test
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Automation Exercise');
    
    // Use getByRole for the navigation link
    const signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    await signupLoginLink.click();

    await expect(page.getByText('New User Signup!')).toBeVisible();

    // 3. Signup form
    await page.getByTestId('signup-name').fill(fullName);
    await page.getByTestId('signup-email').fill(randomEmail);
    await page.getByRole('button', { name: 'Signup' }).click();

    // 4. Account Information form
    await expect(page.getByText(/Enter Account Information/i)).toBeVisible();
    
    await page.getByRole('radio', { name: 'Mrs.' }).check(); 
    await expect(page.getByRole('radio', { name: 'Mrs.' })).toBeChecked();

    await page.getByTestId('name').fill(fullName);
    // Use .env for the password to maintain a stable secret
    await page.getByTestId('password').fill(process.env.USER_PASSWORD!);
    
    await page.getByTestId('days').selectOption({ index: 9 });
    await page.getByTestId('months').selectOption({ index: 3 });
    await page.getByTestId('years').selectOption('1990');

    await page.getByLabel('Sign up for our newsletter!').check();
    await page.getByLabel('Receive special offers from our partners!').check();

    // 5. Address Information
    await page.getByTestId('first_name').fill(firstName);
    await page.getByTestId('last_name').fill(lastName);
    await page.getByTestId('company').fill(company);
    await page.getByTestId('address').fill(streetAddress);
    await page.getByTestId('address2').fill('Waikato');
    await page.getByTestId('country').selectOption('Canada');
    await page.getByTestId('state').fill(state);
    await page.getByTestId('city').fill(city);
    await page.getByTestId('zipcode').fill(zipCode);
    await page.getByTestId('mobile_number').fill(phone);

    await page.getByRole('button', { name: 'Create Account' }).click();
    
    // 6. Verify Account Creation Success
    await expect(page.getByText(/account created/i)).toBeVisible();

    // 7. Post-Registration Journey & Deletion
    // Best Practice: The 'Continue' after account creation is a link, not a button
    await page.getByRole('link', { name: 'Continue' }).click();

    // Best Practice: Verify dynamic name matches the top-bar text
    await expect(page.getByText(`Logged in as ${fullName}`)).toBeVisible();

    // Best Practice: Clicking 'Delete Account' from the navigation bar
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 8. Final Verification
    await expect(page.getByText(/account deleted/i)).toBeVisible();
    
    // Click final continue to return to home
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/.*automationexercise/);
});

test('Login user with correct email and password', async ({ page }) => {
    // 1. Setup Dynamic Data (The Clean Slate)
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = faker.internet.email();
    const password = process.env.USER_PASSWORD!; // Keep password stable for logic

    // 2. Registration Step
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    
    // Fill Signup (Step 5 in your plan)
    await page.getByTestId('signup-name').fill(fullName);
    await page.getByTestId('signup-email').fill(email);
    await page.getByRole('button', { name: 'Signup' }).click();

    // Fill Account Details (Shortened for brevity - ensure all required fields are filled)
    await page.getByRole('radio', { name: 'Mrs.' }).check();
    await page.getByTestId('password').fill(password);
    await page.getByTestId('first_name').fill(firstName);
    await page.getByTestId('last_name').fill(lastName);
    await page.getByTestId('address').fill(faker.location.streetAddress());
    await page.getByTestId('state').fill(faker.location.state());
    await page.getByTestId('city').fill(faker.location.city());
    await page.getByTestId('zipcode').fill(faker.location.zipCode());
    await page.getByTestId('mobile_number').fill(faker.phone.number());
    
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();

    // 3. Login Verification (Step 16 in your plan)
    await page.getByRole('link', { name: 'Continue' }).click();
    
    // Dynamic assertion: we check for the name Faker generated
    await expect(page.getByText(`Logged in as ${fullName}`)).toBeVisible();

    // 4. Deletion Step (The Cleanup)
    // This removes the user so the database isn't cluttered
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 5. Final Assertion (Step 18)
    await expect(page.getByText(/ACCOUNT DELETED!/i)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    
    // Verification: Ensure we are redirected home
    await expect(page).toHaveURL(/.*automationexercise/);
});

test('Login user with  incorrect email and password', async({page}) => {
    const randomEmail = faker.internet.email();
    const password = faker.internet.password()

    await page.goto('/', {waitUntil:'domcontentloaded'})
    await expect(page).toHaveTitle('Automation Exercise')
    await page.getByRole('link', {name: 'Signup / Login'}).click()
    await expect(page.getByRole('heading', {name:'Login to your account'})).toBeVisible()
await page.getByTestId('login-email').fill(randomEmail)
await page.getByTestId('login-password').fill(password)
await page.getByRole('button', {name:'login'}).click()
await expect(page.getByText(/your email or password is incorrect/i)).toBeVisible()
}
)