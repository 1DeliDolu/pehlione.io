import { test, expect } from '@playwright/test'

test.describe('Hobbies section', () => {
  test('shows summary grid on home', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#hobbies')

    await expect(section.getByRole('heading', { level: 2, name: 'Hobbys' })).toBeVisible()
    await expect(section.locator('li')).toHaveCount(4)
    await expect(section.getByRole('button', { name: 'Gartenarbeit öffnen' })).toBeVisible()
    await expect(section.getByRole('button', { name: 'Fotografie öffnen' })).toBeVisible()
    await expect(section.getByRole('button', { name: 'Programmieren öffnen' })).toBeVisible()
    await expect(section.getByText('Mehr Details im Drawer')).toBeVisible()
    await expect(section.getByRole('button', { name: 'Im Drawer ansehen' })).toBeVisible()
  })

  test('shows detail view content', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Hobbys' }).click()

    await expect(page.getByRole('heading', { level: 1, name: /Hobbys/ })).toBeVisible()

    const section = page.locator('#hobbies')

    await expect(section.getByRole('heading', { level: 2, name: 'Hobbys' })).toBeVisible()
    await expect(section.locator('article')).toHaveCount(4)
    await expect(section.getByRole('heading', { level: 3, name: 'Outdoor' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Kreativ' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Technik' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Links' })).toBeVisible()
    await expect(section.getByRole('link', { name: 'Meine Projekte' })).toHaveAttribute('href', '#projects')
    await expect(section.getByRole('link', { name: 'Neueste Repositories' })).toHaveAttribute('href', '#repos')
  })
})
