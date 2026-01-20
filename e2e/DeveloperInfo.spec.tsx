import { test, expect } from '@playwright/test'

test.describe('Developer info section', () => {
  test('shows summary content on home', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#developer')

    await expect(
      section.getByRole('heading', { level: 2, name: 'Junior Anwendungsentwickler' }),
    ).toBeVisible()
    await expect(section.getByText('Einstieg als Junior Developer')).toBeVisible()
    await expect(section.getByText('TypeScript')).toBeVisible()
    await expect(section.getByText('React')).toBeVisible()
    await expect(section.getByRole('button', { name: 'Im Drawer ansehen' })).toBeVisible()
  })

  test('shows detail view content', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Anwendungsentwickler' }).click()

    await expect(page.getByRole('heading', { level: 1, name: /Anwendungsentwickler/ })).toBeVisible()

    const section = page.locator('#developer')

    await expect(
      section.getByRole('heading', { level: 2, name: 'Junior Anwendungsentwickler' }),
    ).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Grundkenntnisse' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Aufgaben' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Soft Skills' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Links' })).toBeVisible()
    await expect(section.getByRole('link', { name: 'Übungsprojekte' })).toHaveAttribute('href', '#projects')
    await expect(section.getByRole('link', { name: 'GitHub Repositories' })).toHaveAttribute('href', '#repos')

    const skillCount = await section.locator('span').count()
    expect(skillCount).toBeGreaterThan(5)
  })
})
