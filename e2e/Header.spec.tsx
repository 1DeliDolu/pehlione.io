import { test, expect } from '@playwright/test'

test.describe('Header', () => {
  test('shows app bar elements', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('button', { name: 'open drawer' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'pehlione', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Lebenslauf' })).toHaveAttribute('href', '#cv')
  })

  test('drawer shows navigation items', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'open drawer' }).click()

    await expect(page.getByRole('button', { name: /^Lebenslauf Kurzprofil/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /^Hobbys/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /^Zertifikate/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /^Projekte/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /^Repositories/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /^Anwendungsentwickler/ })).toBeVisible()

    await page.getByRole('button', { name: 'close drawer' }).click()
    await expect(page.getByRole('button', { name: 'open drawer' })).toBeVisible()
  })
})
