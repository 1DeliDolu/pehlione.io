import { test, expect } from '@playwright/test'

test.describe('Header', () => {
  const getDrawer = (page: import('@playwright/test').Page) => page.getByRole('list')
  const getTopNav = (page: import('@playwright/test').Page) => page.getByRole('banner')

  test('shows app bar elements', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('button', { name: 'open drawer' })).toBeVisible()
    await expect(getTopNav(page).getByRole('link', { name: 'pehlione', exact: true })).toBeVisible()
    await expect(getTopNav(page).getByRole('button', { name: 'Lebenslauf' })).toBeVisible()
    await expect(getTopNav(page).getByRole('button', { name: 'Admin' })).toBeVisible()
  })

  test('drawer shows navigation items', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'open drawer' }).click()

    await expect(getDrawer(page).getByRole('button', { name: /^Lebenslauf Kurzprofil/ })).toBeVisible()
    await expect(getDrawer(page).getByRole('button', { name: /^Hobbys Interessen/ })).toBeVisible()
    await expect(getDrawer(page).getByRole('button', { name: /^Zertifikate Nachweise/ })).toBeVisible()
    await expect(getDrawer(page).getByRole('button', { name: /^Projekte Ausgewählte/ })).toBeVisible()
    await expect(getDrawer(page).getByRole('button', { name: /^Repositories Neueste/ })).toBeVisible()
    await expect(getDrawer(page).getByRole('button', { name: /^Anwendungsentwickler Profil/ })).toBeVisible()
    await expect(getDrawer(page).getByRole('button', { name: /^Admin Login ve Upload/ })).toBeVisible()

    await page.getByRole('button', { name: 'close drawer' }).click()
    await expect(page.getByRole('button', { name: 'open drawer' })).toBeVisible()
  })

  test('brand button always routes to the home page root', async ({ page }) => {
    await page.goto('/projects')

    await getTopNav(page).getByRole('link', { name: 'pehlione', exact: true }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1, name: /Mustafa's Portfolio/i })).toBeVisible()
  })

  test('brand button clears home section hash and returns to the top of home', async ({ page }) => {
    await page.goto('/#hobbies')
    await expect(page).toHaveURL(/\/#hobbies$/)

    await getTopNav(page).getByRole('link', { name: 'pehlione', exact: true }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1, name: /Mustafa's Portfolio/i })).toBeVisible()
  })
})
