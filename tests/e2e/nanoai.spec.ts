import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('visitor discovers NanoAI, inspects its screens, finds the download and reaches the existing contact form', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore NanoAI', exact: true }).click();
  await expect(page).toHaveURL(/\/nanoai\/$/);
  await expect(page).toHaveTitle(/NanoAI.*Omega AI LLC/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/NanoAI.*Bring your PC.*to life/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://omega2ai.com/nanoai/');
  await expect(page.locator('.nanoai-hero__art figcaption')).toContainText('NanoAI 0.3.1');
  const menuToggle = page.getByRole('button', { name: 'Open navigation' });
  if (await menuToggle.isVisible()) await menuToggle.click();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  if (await page.getByRole('button', { name: 'Close navigation' }).isVisible()) await page.keyboard.press('Escape');

  await page.getByRole('navigation', { name: 'NanoAI showcase sections' }).getByRole('link', { name: /Two ways it works/ }).click();
  await expect(page.getByRole('heading', { name: 'Its computer, or yours.' })).toBeInViewport();
  await expect(page.getByRole('heading', { name: 'Nano’s own computer' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your PC, hands-free' })).toBeVisible();

  await page.getByRole('navigation', { name: 'NanoAI showcase sections' }).getByRole('link', { name: /Screens/ }).click();
  const enlarge = page.getByRole('button', { name: 'Enlarge Where Nano thinks', exact: true });
  await enlarge.focus();
  await enlarge.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Where Nano thinks', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('img')).toHaveAttribute('src', '/nanoai/images/nanoai-where-nano-thinks.webp');
  await expect(dialog.getByRole('button', { name: 'Close image' })).toBeFocused();
  await page.keyboard.press('Tab');
  expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(enlarge).toBeFocused();
  await enlarge.click();
  await dialog.getByRole('button', { name: 'Close image' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(enlarge).toBeFocused();

  await page.locator('summary').filter({ hasText: 'Is NanoAI free?' }).click();
  await expect(page.locator('details[open]')).toContainText('You pay only if you want Nano Cloud to run the model for you');

  await page.getByRole('navigation', { name: 'NanoAI showcase sections' }).getByRole('link', { name: /Download/ }).click();
  const download = page.getByRole('region', { name: /Get NanoAI\s*for Windows/ });
  await expect(download).toBeInViewport();
  await expect(download.getByRole('link', { name: 'Download for Windows' })).toHaveAttribute('href', 'https://omega-dev.uk/download');
  await expect(page.locator('#beta')).toHaveCount(0);

  await page.getByRole('link', { name: 'Discuss a custom AI system', exact: true }).last().click();
  await expect(page).toHaveURL(/\/#project-inquiry$/);
  await expect(page.getByRole('heading', { name: 'What are you trying to build?' })).toBeInViewport();
});

for (const width of [375, 768, 1280]) {
  test(`NanoAI renders and loads its public images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto('/nanoai/');
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
      const box = await image.boundingBox();
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
    }
    for (const frame of await page.locator('.nanoai-gallery__item:not(.nanoai-gallery__item--lead) button').all()) {
      expect((await frame.boundingBox())?.height).toBeLessThan(500);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(page.locator('vite-error-overlay')).toHaveCount(0);
    expect(errors).toEqual([]);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}

test('the Projects tab leads from NanoAI to the Omega proof', async ({ page }) => {
  await page.goto('/nanoai/');
  if (await page.getByRole('button', { name: 'Open navigation' }).isVisible()) {
    await page.getByRole('button', { name: 'Open navigation' }).click();
  }
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await page.getByRole('link', { name: /See the technical proof/ }).click();
  await expect(page).toHaveURL(/\/omega-3\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Omega 3.0 technical proof');
});

test('NanoAI screenshot entry opens the proof section directly', async ({ page }) => {
  await page.goto('/nanoai/#proof');
  await expect(page.getByRole('heading', { name: 'A look inside the app.' })).toBeInViewport();
});
