import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the home page with initial articles', async ({ page }) => {
    // Wait for the articles to be loaded
    await page.waitForTimeout(10000);
    const articles = await page.locator('.p-4.border.rounded-lg');
    expect(await articles.count()).toBeGreaterThan(0);
  });

  test('should change period and fetch new articles', async ({ page }) => {
    await page.selectOption('#period', '7');

    // Wait for the articles to be loaded
    await page.waitForTimeout(10000);
    const articles = await page.locator('.p-4.border.rounded-lg');
    expect(await articles.count()).toBeGreaterThan(0);
  });
});
