import { test as it, expect } from '@playwright/test';

it.describe('Test loading page elements', () => {

    it.beforeEach(async ({page}) => {
        await page.goto('http://localhost:8000/');
    });
    it.describe('GIF testing', () => {
        it('has gif', async ({ page }) => {
          await expect(page.locator('#game_img').locator('img')).toBeVisible();
        });
      
        it('gif is visible', async ({ page }) => {
          await expect(page.locator('#game_img').locator('img')).toBeVisible();
        });

        it('Correct gif is displayed', async ({ page }) => {
            expect(await page.locator('#game_img').locator('img').getAttribute('src')).toContain('loading');
          });
    });

    it.describe('continue BTN testing', () => {
        it('button is not visible at first', async ({ page }) => {
          await expect(page.locator('#but_a')).toBeHidden();
        });
      
        it('button is visible after X time', async ({ page }) => {
          await page.waitForTimeout(3000);
          await expect(page.locator('#but_a')).toBeVisible();
        });
      
        it('button text', async ({ page }) => {
            await page.waitForTimeout(3000);
            await expect(page.locator('#but_a')).toHaveText('Continue');
        });
      
        it('button initial color', async ({ page }) => {
            await page.waitForTimeout(3000);
            await expect(page.locator('#but_a')).toHaveCSS('color', 'rgb(144, 43, 145)');
        });
      
        it('button color on hover', async ({ page }) => {
            await page.waitForTimeout(3000);
            await page.locator('#but_a').hover();
            await expect(page.locator('#but_a')).toHaveCSS('color', 'rgb(144, 43, 245)');
        });
      
        // it('button onclick navigation', async ({ page }) => {
        //   await page.goto('http://localhost:8000/');
        // });

        // it('button other buttons not visible', async ({ page }) => {
        //     await page.goto('http://localhost:8000/');
        //   });
    });
});