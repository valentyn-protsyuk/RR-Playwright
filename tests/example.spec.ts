import { test as it, expect } from '@playwright/test';

it.describe('Test page elements', () => {
  it('has title', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await expect(page).toHaveTitle(/Russian Roulette/);
  });
});
