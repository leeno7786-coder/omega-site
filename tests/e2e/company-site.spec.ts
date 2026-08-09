import { expect, test } from '@playwright/test';

test('visitor can understand the company and reach the inquiry form', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/think beyond the prompt/i);
  await page.getByRole('link', { name: 'Start a project' }).first().click();
  await expect(page.getByRole('heading', { name: 'What are you trying to build?' })).toBeInViewport();
});

test('technical visitor can open the proof page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'See Omega 3.0 proof' }).click();
  await expect(page).toHaveURL(/\/omega-3\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Omega 3.0 technical proof/i);
});

for (const legalPage of [
  { path: '/privacy/', heading: 'Privacy Policy' },
  { path: '/terms/', heading: 'Terms of Service' },
]) {
  test(`${legalPage.path} loads directly`, async ({ page }) => {
    const response = await page.goto(legalPage.path);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(legalPage.heading);
  });
}

test('mobile visitor can navigate without horizontal controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('link', { name: 'Capabilities' })).toBeVisible();
  await page.getByRole('link', { name: 'Capabilities' }).click();
  await expect(page).toHaveURL(/#capabilities$/);
  await expect(page.locator('#capabilities')).toBeInViewport();
});

test('confirmed form response shows success and clears the draft', async ({ page }) => {
  await page.route('**/', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 200, body: 'ok' });
      return;
    }
    await route.continue();
  });
  await page.goto('/');
  await page.getByLabel('Name').fill('Ada Lovelace');
  await page.getByLabel('Work email').fill('ada@example.com');
  await page.getByLabel('Company (optional)').fill('Analytical Engines');
  await page.getByLabel('Project category').selectOption({ label: 'Metacognitive or agentic AI' });
  await page.getByLabel('Project description').fill('Build a private autonomous research system.');
  await page.getByRole('button', { name: 'Send project inquiry' }).click();
  await expect(page.getByText('Project inquiry received')).toBeVisible();
  await expect(page.getByLabel('Name')).toHaveValue('');
});

test('failed form response keeps every visitor-entered value', async ({ page }) => {
  await page.route('**/', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 503, body: 'unavailable' });
      return;
    }
    await route.continue();
  });
  await page.goto('/');
  await page.getByLabel('Name').fill('Grace Hopper');
  await page.getByLabel('Work email').fill('grace@example.com');
  await page.getByLabel('Company (optional)').fill('Compiler Systems');
  await page.getByLabel('Project category').selectOption({ label: 'Custom AI runtime, local AI, or edge AI' });
  await page.getByLabel('Project description').fill('Keep this exact project draft after failure.');
  await page.getByRole('button', { name: 'Send project inquiry' }).click();
  await expect(page.getByText(/we could not deliver your inquiry/i)).toBeVisible();
  await expect(page.getByLabel('Name')).toHaveValue('Grace Hopper');
  await expect(page.getByLabel('Work email')).toHaveValue('grace@example.com');
  await expect(page.getByLabel('Company (optional)')).toHaveValue('Compiler Systems');
  await expect(page.getByLabel('Project category')).toHaveValue('Custom AI runtime, local AI, or edge AI');
  await expect(page.getByLabel('Project description')).toHaveValue('Keep this exact project draft after failure.');
});
