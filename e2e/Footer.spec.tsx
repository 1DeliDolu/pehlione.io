import { test, expect } from '@playwright/test'

process.loadEnvFile?.('.env')

const githubUsername =
  process.env.IO_USERNAME ||
  process.env.VITE_IO_USERNAME ||
  process.env.GITHUB_USER ||
  process.env.VITE_GITHUB_USER ||
  "1DeliDolu";

test.describe('Footer', () => {
  test('shows copyright, contact, and GitHub link', async ({ page }) => {
    await page.goto('/')

    const footer = page.getByRole('contentinfo')

    await expect(footer).toContainText(`© ${new Date().getFullYear()} • Alle Rechte vorbehalten.`)
    await expect(
      footer.getByRole('link', { name: 'mustafa.ozdemir1408@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:mustafa.ozdemir1408@gmail.com')

    const githubLink = footer.getByRole('link', { name: /GitHub/i })

    await expect(githubLink).toHaveAttribute(
      'href',
      `https://github.com/${githubUsername}/pehlione.io`,
    )
    await expect(githubLink).toHaveAttribute('target', '_blank')
  })
})
