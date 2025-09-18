import { test, expect } from '@playwright/test'

test.describe('App navigation', () => {
  test('loads home and shows portfolio intro', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: "Mustafa's Portfolio in Development" })).toBeVisible()
    await expect(page.locator('a[href="#home"]').first()).toBeVisible()
  })

  test('drawer navigation to Developer (Anwendungsentwickler)', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Anwendungsentwickler' }).click()
    await expect(page.getByRole('heading', { level: 1, name: /Anwendungsentwickler/ })).toBeVisible()
  })

  test('drawer navigation to Zertifikate', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Zertifikate' }).click()
    await expect(page.getByRole('heading', { level: 1, name: /Zertifikate/ })).toBeVisible()
  })

  test('drawer navigation to Projekte', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Projekte' }).first().click()
    await expect(page.getByRole('heading', { level: 1, name: /Projekte/ })).toBeVisible()
  })

  test('drawer navigation to Repositories', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Repositories' }).first().click()
    await expect(page.getByRole('heading', { level: 1, name: /Repositories/ })).toBeVisible()
  })

  test('Hobbys → Gartenarbeit opens photo gallery (title visible)', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Hobbys' }).click()
    await expect(page.getByRole('heading', { level: 1, name: /Hobbys/ })).toBeVisible()

    // In the detail view, click Gartenarbeit card (button role)
    await page.getByRole('button', { name: /Gartenarbeit/ }).click()

    // Title should be visible even if images are still loading under an overlay
    await expect(page.getByRole('heading', { level: 1, name: 'Gartenarbeit' })).toBeVisible()
  })

  test('Hobbys → Fotografie opens photo gallery (title visible)', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Hobbys' }).click()
    await expect(page.getByRole('heading', { level: 1, name: /Hobbys/ })).toBeVisible()
    await page.getByRole('button', { name: /Fotografie/ }).click()
    await expect(page.getByRole('heading', { level: 1, name: 'Fotografie' })).toBeVisible()
  })

  test('Hobbys → Programmieren opens Developer section', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Hobbys' }).click()
    await expect(page.getByRole('heading', { level: 1, name: /Hobbys/ })).toBeVisible()

    await page.getByRole('button', { name: /Programmieren/ }).click()
    await expect(page.getByRole('heading', { level: 1, name: /Anwendungsentwickler/ })).toBeVisible()
  })


})
