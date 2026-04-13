import { test, expect } from '@playwright/test';

test('Verify Homepage Load', async ({ page }) => {
  await page.goto('/'); 
  await expect(page).toHaveTitle(/Automation Exercise/);
});