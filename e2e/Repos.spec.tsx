import { test, expect } from '@playwright/test'

type RepoResponse = {
  id: number
  name: string
  html_url: string
  description: string
  language: string
  stargazers_count: number
  pushed_at: string
}

const createRepos = (count: number): RepoResponse[] =>
  Array.from({ length: count }, (_, index) => {
    const id = index + 1
    return {
      id,
      name: `repo-${id}`,
      html_url: `https://github.com/1DeliDolu/repo-${id}`,
      description: `Description ${id}`,
      language: id % 2 === 0 ? 'TypeScript' : 'Go',
      stargazers_count: id,
      pushed_at: '2024-01-01T00:00:00Z',
    }
  })

const mockReposApi = async (page: import('@playwright/test').Page) => {
  await page.route(/https:\/\/api\.github\.com\/users\/1DeliDolu\/repos\?/, async (route) => {
    const url = new URL(route.request().url())
    const perPage = Number(url.searchParams.get('per_page') || '0')
    const repos = createRepos(perPage || 1)
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(repos),
    })
  })
}

test.describe('Repos section', () => {
  test('shows summary list on home', async ({ page }) => {
    await mockReposApi(page)
    await page.goto('/')

    const section = page.locator('#repos')

    await expect(section.getByRole('heading', { level: 2, name: 'Repositories' })).toBeVisible()
    await expect(section.getByText('@1DeliDolu')).toBeVisible()
    await expect(section.locator('ul.grid').locator('li')).toHaveCount(6)
    await expect(section.getByRole('link', { name: 'repo-1' })).toHaveAttribute('target', '_blank')
    await expect(section.getByText('More details in the drawer')).toBeVisible()
    await expect(section.getByRole('button', { name: 'View in Drawer' })).toBeVisible()
  })

  test('shows detail view content', async ({ page }) => {
    await mockReposApi(page)
    await page.goto('/')
    await page.getByLabel('open drawer').click()
    await page
      .getByRole('list')
      .getByRole('button', { name: /^Repositories Neueste/ })
      .click()

    await expect(page.getByRole('heading', { level: 1, name: /Repositories • Details/ })).toBeVisible()

    const section = page.locator('#repos')

    await expect(
      section.getByRole('heading', { level: 2, name: 'Repositories • Details' }),
    ).toBeVisible()
    await expect(section.getByText('@1DeliDolu')).toBeVisible()
    await expect(section.locator('ul.grid').locator('li')).toHaveCount(10)
    await expect(section.getByRole('heading', { level: 3, name: 'Filters & Tips' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Links' })).toBeVisible()
    await expect(section.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    await expect(section.getByRole('link', { name: 'Developer Profile' })).toHaveAttribute('href', '#developer')
  })
})
