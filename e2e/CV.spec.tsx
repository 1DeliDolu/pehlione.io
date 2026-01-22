import { test, expect } from '@playwright/test';

test.describe('CV section', () => {
  test('loads and shows CV heading', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('open drawer').click();
    await page
      .getByRole('list')
      .getByRole('button', { name: /^Lebenslauf Kurzprofil/ })
      .click();
    await expect(
      page.getByRole('heading', { level: 2, name: /Berufliche Werdegang/ }),
    ).toBeVisible();
  });
});
