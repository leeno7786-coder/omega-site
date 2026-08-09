import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

for (const path of ['/', '/omega-3/']) {
  test(`${path} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('keyboard users receive a skip link and visible focus throughout the homepage', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await skipLink.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  const controls = page.locator(
    'header a[href]:visible, main a[href]:visible, main button:visible, main summary:visible, main input:visible, main select:visible, main textarea:visible, footer a[href]:visible',
  );
  const count = await controls.count();
  expect(count).toBeGreaterThan(10);
  for (let index = 0; index < count; index += 1) {
    const control = controls.nth(index);
    await control.focus();
    await expect(control).toBeFocused();
    const indicator = await control.evaluate((element) => {
      const style = getComputedStyle(element);
      return `${style.outlineStyle} ${style.outlineWidth} ${style.boxShadow}`;
    });
    expect(indicator).not.toMatch(/^none 0px none$/);
  }

  await page.goto('/omega-3/');
  const disclosures = page.locator('main summary:visible');
  await expect(disclosures).toHaveCount(9);
  for (let index = 0; index < await disclosures.count(); index += 1) {
    const disclosure = disclosures.nth(index);
    await disclosure.focus();
    await expect(disclosure).toBeFocused();
    const indicator = await disclosure.evaluate((element) => {
      const style = getComputedStyle(element);
      return `${style.outlineStyle} ${style.outlineWidth} ${style.boxShadow}`;
    });
    expect(indicator).not.toMatch(/^none 0px none$/);
  }
});

test('reduced motion stops the signature visualization', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const running = await page.locator('[data-cognitive-orbit]').evaluate((element) =>
    element.getAnimations().filter((animation) => animation.playState === 'running').length,
  );
  expect(running).toBe(0);
});
