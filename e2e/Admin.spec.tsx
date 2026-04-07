import { test, expect } from '@playwright/test'

test.describe('Admin access', () => {
  test('top nav Admin button opens the login route', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('banner').getByRole('button', { name: 'Admin' }).click()

    await expect(page).toHaveURL(/\/login$/)
    await expect(page.getByRole('heading', { level: 1, name: /Geschützter Zugang für neue Inhalte/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Admin-Anmeldung' })).toBeVisible()
  })

  test('upload route redirects to login without an active session', async ({ page }) => {
    await page.goto('/upload')

    await expect(page).toHaveURL(/\/login$/)
    await expect(page.getByRole('heading', { name: 'Admin-Anmeldung' })).toBeVisible()
  })

  test('login form navigates to upload after a successful auth response', async ({ page }) => {
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          token: 'playwright.jwt.token',
          expiresIn: 900,
        }),
      })
    })

    await page.goto('/login')
    await page.getByLabel('Benutzername').fill('demo-admin')
    await page.getByLabel('Passwort').fill('demo-password')
    await page.getByRole('button', { name: 'Anmelden' }).click()

    await expect(page).toHaveURL(/\/upload$/)
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /Neue Inhalte direkt im Admin-Bereich erfassen/,
      }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: /Neues Foto hinzufügen/ })).toBeVisible()
  })
})
