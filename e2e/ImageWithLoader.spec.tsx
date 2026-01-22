import { test, expect } from '@playwright/test'

const tinyPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO8m9JkAAAAASUVORK5CYII=',
  'base64',
)

test.describe('ImageWithLoader', () => {
  test('shows loader until image loads', async ({ page }) => {
    await page.route(/\/(garten|foto)\/thumbs\/.*\.webp$/i, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      await route.fulfill({
        status: 200,
        contentType: 'image/png',
        body: tinyPng,
      })
    })

    await page.goto('/foto/gartenarbeit')

    const img = page.locator('img.image-with-loader-img').first()
    const wrapper = img.locator('xpath=..')

    await expect(wrapper.getByRole('progressbar')).toBeVisible()
    await expect(img).toBeVisible()
    await expect(wrapper.getByRole('progressbar')).toBeHidden({ timeout: 6000 })
  })
})
