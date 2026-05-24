import { test, expect } from '@playwright/test'
import { existsSync } from 'node:fs'

if (existsSync('.env')) {
  process.loadEnvFile?.('.env')
}

const githubUsername =
  process.env.IO_USERNAME ||
  process.env.VITE_IO_USERNAME ||
  process.env.GITHUB_USER ||
  process.env.VITE_GITHUB_USER ||
  "1DeliDolu";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

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
      html_url: `https://github.com/${githubUsername}/repo-${id}`,
      description: `Description ${id}`,
      language: id % 2 === 0 ? 'TypeScript' : 'Go',
      stargazers_count: id,
      pushed_at: '2024-01-01T00:00:00Z',
    }
  })

const mockReposApi = async (page: import('@playwright/test').Page) => {
  await page.route(
    new RegExp(`http://localhost:3001/api/github/users/${escapeRegExp(githubUsername)}/repos\\?`),
    async (route) => {
    const url = new URL(route.request().url())
    const perPage = Number(url.searchParams.get('per_page') || '0')
    const repos = createRepos(perPage || 1)
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(repos),
    })
    },
  )
}

const staticFallbackRepos: RepoResponse[] = [
  {
    id: -1,
    name: 'pehlione.io',
    html_url: `https://github.com/${githubUsername}/pehlione.io/`,
    description: 'Persönliche Website mit React + TypeScript + Vite.',
    language: 'TypeScript',
    stargazers_count: -1,
    pushed_at: '',
  },
  {
    id: -2,
    name: 'PRTG',
    html_url: `https://github.com/${githubUsername}/PRTG`,
    description: 'Plugin zur Integration von PRTG in Grafana (Go Backend, TypeScript Frontend).',
    language: 'TypeScript',
    stargazers_count: -1,
    pushed_at: '',
  },
  {
    id: -3,
    name: 'pehlione_symfony',
    html_url: `https://github.com/${githubUsername}/pehlione_symfony`,
    description: 'Persönliche Website mit Symfony und Twig + TailwindCSS.',
    language: 'PHP',
    stargazers_count: -1,
    pushed_at: '',
  },
  {
    id: -4,
    name: 'pehlione_go',
    html_url: `https://github.com/${githubUsername}/pehlione_go`,
    description: 'E-Commerce Plattform mit Go an TailwindCSS.',
    language: 'Go',
    stargazers_count: -1,
    pushed_at: '',
  },
  {
    id: -5,
    name: 'ecommerce_laravel',
    html_url: `https://github.com/${githubUsername}/ecommerce_laravel.git`,
    description: 'E-Commerce Plattform mit Laravel und Blade + TailwindCSS.',
    language: 'PHP',
    stargazers_count: -1,
    pushed_at: '',
  },
  {
    id: -6,
    name: 'pehlione_dotnet',
    html_url: `https://github.com/${githubUsername}/pehlione_dotnet`,
    description: 'E-Commerce Plattform mit C# .NET und Razor Pages + TailwindCSS.',
    language: 'C#',
    stargazers_count: -1,
    pushed_at: '',
  },
]

test.describe('Repos section', () => {
  test('shows summary list on home', async ({ page }) => {
    await mockReposApi(page)
    await page.goto('/')

    const section = page.locator('#repos')

    await expect(section.getByRole('heading', { level: 2, name: 'Repositories' })).toBeVisible()
    await expect(section.getByText(`@${githubUsername}`)).toBeVisible()
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
    await expect(section.getByText(`@${githubUsername}`)).toBeVisible()
    await expect(section.locator('ul.grid').locator('li')).toHaveCount(10)
    await expect(section.getByRole('heading', { level: 3, name: 'Filters & Tips' })).toBeVisible()
    await expect(section.getByRole('heading', { level: 3, name: 'Links' })).toBeVisible()
    await expect(section.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    await expect(section.getByRole('link', { name: 'Developer Profile' })).toHaveAttribute('href', '#developer')
  })

  test('shows proxy fallback repository cards when GitHub API returns 403', async ({ page }) => {
    await page.route(
      new RegExp(`http://localhost:3001/api/github/users/${escapeRegExp(githubUsername)}/repos\\?`),
      async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: {
          'X-Repo-Source': 'static',
          'X-Repo-Warning': 'github-403',
          'Access-Control-Expose-Headers': 'X-Repo-Source, X-Repo-Warning',
        },
        body: JSON.stringify(staticFallbackRepos),
      })
      },
    )

    await page.goto('/')

    const section = page.locator('#repos')

    await expect(section.getByText(/GitHub API derzeit nicht verfügbar/)).toBeVisible()
    await expect(section.locator('ul.grid').locator('li')).toHaveCount(6)
    await expect(section.getByRole('link', { name: 'pehlione.io' })).toHaveAttribute(
      'href',
      `https://github.com/${githubUsername}/pehlione.io/`,
    )
  })
})
