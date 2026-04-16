import { test ,expect } from "@playwright/test";
import 'dotenv/config';

test('Register user', async ({page}) => {
 await page.goto('/')
 await expect(page).toHaveTitle('Automation Exercise')
 await page.getByRole('link', {name: 'Signup / Login'}).click()
await expect(page.getByText('New User Signup!')).toBeVisible()
await page.locator('[data-qa="signup-name"]').fill('Test Account')
// Add the ! at the end
await page.locator('[data-qa="signup-email"]').fill(process.env.USER_EMAIL!);
 await page.getByRole('button', {name:'Signup'}).click()
 await expect(page.getByText(/Enter Account Information/i)).toBeVisible();
})
