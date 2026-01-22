import { test, expect } from '@playwright/test'

test.describe('OptimizedImage', () => {
  test('applies safe defaults and renders encoded src', async ({ page }) => {
    await page.goto('/')

    const img = page.locator('img.optimized-image').first()

    await expect(img).toBeVisible()
    await expect(img).toHaveAttribute('loading', 'lazy')
    await expect(img).toHaveAttribute('decoding', 'async')
    await expect(img).toHaveAttribute('draggable', 'false')

    const src = await img.getAttribute('src')
    expect(src).toBeTruthy()
    expect(src).toContain('/certificates/')

    await expect(img).toHaveAttribute('sizes', '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw')
  })
})
