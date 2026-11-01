import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('visitor opens Projects from the menu and reaches Omega Browser Agent', async ({ page }) => {
  await page.goto('/');
  const menuToggle = page.getByRole('button', { name: 'Open navigation' });
  if (await menuToggle.isVisible()) await menuToggle.click();
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page).toHaveTitle(/Projects.*Omega AI LLC/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://omega2ai.com/projects/');

  await page.getByRole('navigation', { name: 'Projects on this page' }).getByRole('link', { name: /Omega Browser Agent/ }).click();
  const agent = page.getByRole('article', { name: 'Omega Browser Agent' });
  await expect(agent.getByRole('heading', { name: 'Omega Browser Agent' })).toBeInViewport();
  await expect(agent.getByRole('link', { name: /Get it on Microsoft Edge Add-ons/ })).toHaveAttribute('href', /^https:\/\/microsoftedge\.microsoft\.com\/addons\/detail\/omega-browser-agent\//);
  await expect(agent.getByRole('link', { name: 'Sign up and plans' })).toHaveAttribute('href', 'https://omegabrowseragent.app/upgrade');
});

test('Projects serves the browser agent demo video and its poster', async ({ page, request }) => {
  await page.goto('/projects/');
  for (const video of await page.locator('main video').all()) {
    for (const attribute of ['src', 'poster']) {
      const url = await video.getAttribute(attribute);
      const response = await request.get(url as string);
      expect(response.ok(), `${attribute} ${url}`).toBe(true);
    }
  }
});

for (const width of [320, 375, 768, 1280]) {
  test(`Projects renders and loads its images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto('/projects/');
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    expect(errors).toEqual([]);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
