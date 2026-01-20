import { test, expect } from '@playwright/test'

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#projects')
  })

  test('Projects section loads and shows projects heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2, name: 'Projekte' })).toBeVisible()
  })

  test('renders all projects with title, description and links', async ({ page }) => {
    const projects = page.locator('#projects').locator('article')
    await expect.poll(async () => projects.count()).toBeGreaterThan(0)
    const count = await projects.count()

    for (let i = 0; i < count; i++) {
      const project = projects.nth(i)
      await expect(project.getByRole('heading', { level: 3 })).toBeVisible()
      const description = await project.locator('p').first().textContent()
      expect(description).not.toBeNull()
      expect(description!.length).toBeGreaterThan(10)

      // Ensure that either repo or demo link exists
      const demoLink = project.getByRole('link', { name: 'Live-Demo' })
      const repoLink = project.getByRole('link', { name: 'Repository' })

      const hasDemoLink = (await demoLink.count()) > 0
      const hasRepoLink = (await repoLink.count()) > 0

      expect(hasDemoLink || hasRepoLink).toBeTruthy()
    }
  })

  test('renders detail view with additional sections', async ({ page }) => {
    await page.getByLabel('open drawer').click()
    await page.getByRole('button', { name: 'Projekte' }).first().click()

    await expect(
      page.getByRole('heading', { level: 1, name: 'Projekte • Details' }),
    ).toBeVisible()

    await expect(page.getByRole('heading', { name: 'Technologien' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Highlights' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Weitere Links' })).toBeVisible()
  })
})
