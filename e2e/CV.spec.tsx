import { test, expect } from '@playwright/test';

test.describe('CV section', () => {
  test('loads and shows CV heading', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('open drawer').click();
    await page.getByRole('button', { name: 'Lebenslauf' }).first().click();
    await expect(page.getByRole('heading', { level: 2, name: /Berufliche Werdegang/ })).toBeVisible();
  });
});
