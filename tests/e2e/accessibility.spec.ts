import { expect, test } from '@playwright/test';

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`home has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const sizes = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));

    expect(sizes.page).toBe(sizes.viewport);
  });
}
