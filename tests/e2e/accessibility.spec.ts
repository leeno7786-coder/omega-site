import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type Rgb = readonly [number, number, number];

function parseRgb(value: string): Rgb {
  const channels = value.match(/\d+(?:\.\d+)?/g)?.map(Number);
  if (!channels || channels.length < 3) {
    throw new Error(`Unable to parse RGB color: ${value}`);
  }
  return [channels[0], channels[1], channels[2]];
}

function hexToRgb(value: `#${string}`): Rgb {
  return [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ];
}

function compositeRgb(foreground: Rgb, alpha: number, background: Rgb): Rgb {
  return [
    foreground[0] * alpha + background[0] * (1 - alpha),
    foreground[1] * alpha + background[1] * (1 - alpha),
    foreground[2] * alpha + background[2] * (1 - alpha),
  ];
}

function relativeLuminance(color: Rgb) {
  const [red, green, blue] = color.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: Rgb, background: Rgb) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
    / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
}

function formatRgb(color: Rgb) {
  return `rgb(${color.map((channel) => Math.round(channel)).join(', ')})`;
}

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

test('featured systems share a row on desktop and stack on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const browserAgent = page.locator('[data-featured-system="omega-browser-agent"]');
  const devcard = page.locator('[data-featured-system="devcard-ai"]');
  const desktopBrowserBox = await browserAgent.boundingBox();
  const desktopDevcardBox = await devcard.boundingBox();
  expect(desktopBrowserBox).not.toBeNull();
  expect(desktopDevcardBox).not.toBeNull();
  expect(Math.abs((desktopBrowserBox?.y ?? 0) - (desktopDevcardBox?.y ?? 0))).toBeLessThan(4);
  expect(desktopBrowserBox?.x).not.toBe(desktopDevcardBox?.x);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const mobileBrowserBox = await browserAgent.boundingBox();
  const mobileDevcardBox = await devcard.boundingBox();
  expect(mobileBrowserBox).not.toBeNull();
  expect(mobileDevcardBox).not.toBeNull();
  expect(Math.abs((mobileBrowserBox?.x ?? 0) - (mobileDevcardBox?.x ?? 0))).toBeLessThan(4);
  expect((mobileDevcardBox?.y ?? 0)).toBeGreaterThan((mobileBrowserBox?.y ?? 0));
});

test('technical dossier and founder metadata meet WCAG AA contrast on layered backgrounds', async ({ page }) => {
  await page.goto('/');

  const obsidian = hexToRgb('#071019');
  const graphite = hexToRgb('#0a1621');
  const blue = hexToRgb('#7dd3fc');
  // Both 3% company grid lines can overlap before the translucent founder panels are composited.
  const companyGridIntersection = compositeRgb(blue, 0.03, compositeRgb(blue, 0.03, graphite));
  const targets = [
    {
      name: 'Omega Browser Agent secondary topline',
      locator: page.locator('.system-dossier--omega-browser-agent .system-dossier__topline span:last-child'),
      // The dossier gradient reaches a 5.5% teal wash over graphite.
      background: compositeRgb(hexToRgb('#5eead4'), 0.055, graphite),
    },
    {
      name: 'DevCard AI secondary topline',
      locator: page.locator('.system-dossier--devcard-ai .system-dossier__topline span:last-child'),
      // The dossier gradient reaches a 6% blue wash over its custom base.
      background: compositeRgb(blue, 0.06, hexToRgb('#09141e')),
    },
    {
      name: 'Founder eyebrow',
      locator: page.locator('.founder-profile__identity > p'),
      background: compositeRgb(obsidian, 0.56, companyGridIntersection),
    },
    {
      name: 'Co-founder heading',
      locator: page.locator('.cofounder-credit > p'),
      background: compositeRgb(obsidian, 0.34, companyGridIntersection),
    },
    {
      name: 'Co-founder role',
      locator: page.locator('.cofounder-credit small'),
      background: compositeRgb(obsidian, 0.34, companyGridIntersection),
    },
    {
      name: 'Supporting system status',
      locator: page.locator('.supporting-system__status'),
      background: obsidian,
    },
  ];

  for (const target of targets) {
    const count = await target.locator.count();
    expect(count, `${target.name} target exists`).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      const computedColor = await target.locator.nth(index).evaluate((element) => getComputedStyle(element).color);
      const foreground = parseRgb(computedColor);
      const ratio = contrastRatio(foreground, target.background);
      expect.soft(
        ratio,
        `${target.name} ${formatRgb(foreground)} on worst-case ${formatRgb(target.background)}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  }
});

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
