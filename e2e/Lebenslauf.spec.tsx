import { test, expect } from '@playwright/test'

test.describe('Lebenslauf page', () => {
  test('renders core CV sections on /cv', async ({ page }) => {
    await page.goto('/cv')

    await expect(page.getByRole('heading', { level: 1, name: 'Mustafa Özdemir' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'Berufliche Werdegang' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'Bildungsweg' })).toBeVisible()
  })
})
