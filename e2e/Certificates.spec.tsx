import { test, expect } from '@playwright/test'

test.describe('Certificates section', () => {
  test('shows summary cards on home', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#certificates')

    await expect(
      section.getByRole('heading', { level: 2, name: 'Zertifikate' }),
    ).toBeVisible()
    await expect(section.locator('article')).toHaveCount(3)
    await expect(section.locator('a[href^="/certificates/"]')).toHaveCount(3)
    await expect(section.getByText('Mehr Details im Drawer')).toBeVisible()
    await expect(section.getByRole('button', { name: 'Im Drawer ansehen' })).toBeVisible()
  })

  test('shows detail view content', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Zertifikate' }).click()

    await expect(page.getByRole('heading', { level: 1, name: /Zertifikate/ })).toBeVisible()

    const section = page.locator('#certificates')

    await expect(section.getByRole('heading', { level: 3, name: 'Schwerpunkte' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Ressourcen' })).toBeVisible()
    await expect(section.getByRole('link', { name: 'Beispiel-Projekte' })).toHaveAttribute('href', '#projects')
    await expect(section.getByRole('link', { name: 'Neueste Repositories' })).toHaveAttribute('href', '#repos')
    await expect(section.locator('a[href^="/certificates/"]').first()).toHaveAttribute('target', '_blank')

    const count = await section.locator('article').count()
    expect(count).toBeGreaterThan(3)
  })
})
