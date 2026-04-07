import { test, expect } from '@playwright/test'

process.loadEnvFile?.('.env')

const githubUsername =
  process.env.GITHUB_USERNAME ||
  process.env.VITE_GITHUB_USERNAME ||
  process.env.GITHUB_USER ||
  process.env.VITE_GITHUB_USER ||
  '1DeliDolu'

test.describe('Developer info section', () => {
  test('shows summary content on home', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#developer')

    await expect(
      section.getByRole('heading', { level: 2, name: 'Anwendungsentwickler' }),
    ).toBeVisible()
    await expect(section.getByText('Teamorientiert')).toBeVisible()
    await expect(section.getByText('TypeScript')).toBeVisible()
    await expect(section.getByText('React')).toBeVisible()
    await expect(section.getByRole('button', { name: 'Im Drawer ansehen' })).toBeVisible()
  })

  test('shows detail view content', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page
      .getByRole('list')
      .getByRole('button', { name: /^Anwendungsentwickler Profil/ })
      .click()

    await expect(
      page.getByRole('heading', { level: 1, name: /Anwendungsentwickler • Details/ }),
    ).toBeVisible()

    const section = page.locator('#developer')

    await expect(
      section.getByRole('heading', { level: 2, name: 'Anwendungsentwickler' }),
    ).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Arbeitsweise & Team' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Motivation & Lernbereitschaft' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Technische Kenntnisse (Auszug)' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Persönliche Schwerpunkte' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Links' })).toBeVisible()
    await expect(section.getByRole('link', { name: /Grafana Data Source Plugin für PRTG/ })).toHaveAttribute('href', `https://github.com/${githubUsername}/PRTG`)
    await expect(section.getByRole('link', { name: 'GitHub Repositories' })).toHaveAttribute('href', `https://github.com/${githubUsername}?tab=repositories`)

    const skillCount = await section.locator('span').count()
    expect(skillCount).toBeGreaterThan(5)
  })
})
