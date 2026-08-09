import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, test } from 'node:test';
import { checkBuildOutput } from './check-build-output.mjs';

const fixtures = [];

afterEach(async () => {
  await Promise.all(fixtures.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

async function createFixture({ homeHtml, homeJs = 'console.log("home")' } = {}) {
  const distDir = await mkdtemp(path.join(tmpdir(), 'omega-build-'));
  fixtures.push(distDir);
  await Promise.all([
    mkdir(path.join(distDir, '.vite'), { recursive: true }),
    mkdir(path.join(distDir, 'assets'), { recursive: true }),
    mkdir(path.join(distDir, 'omega-3'), { recursive: true }),
    mkdir(path.join(distDir, 'privacy'), { recursive: true }),
    mkdir(path.join(distDir, 'terms'), { recursive: true }),
  ]);

  const validHome = `<!doctype html><html><head>
    <meta name="description" content="Custom metacognitive AI and technology engineering." />
    <link rel="canonical" href="https://omega2ai.com/" />
    <meta property="og:title" content="Omega AI LLC" />
    <meta property="og:description" content="Custom metacognitive AI and technology engineering." />
    <meta property="og:image" content="https://omega2ai.com/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">{"@type":"Organization"}</script>
  </head><body></body></html>`;

  await Promise.all([
    writeFile(path.join(distDir, 'index.html'), homeHtml ?? validHome),
    writeFile(path.join(distDir, 'omega-3', 'index.html'), '<!doctype html><title>Omega 3.0</title>'),
    writeFile(path.join(distDir, 'privacy', 'index.html'), '<!doctype html><title>Privacy</title>'),
    writeFile(path.join(distDir, 'terms', 'index.html'), '<!doctype html><title>Terms</title>'),
    writeFile(path.join(distDir, 'sitemap.xml'), '<urlset><url><loc>https://omega2ai.com/</loc></url></urlset>'),
    writeFile(path.join(distDir, 'assets', 'home.js'), homeJs),
    writeFile(
      path.join(distDir, '.vite', 'manifest.json'),
      JSON.stringify({ 'index.html': { file: 'assets/home.js', isEntry: true } }),
    ),
  ]);
  return distDir;
}

test('accepts a complete build inside all budgets', async () => {
  const result = await checkBuildOutput({ distDir: await createFixture(), maxHomeGzipBytes: 204800 });
  assert.equal(result.ok, true, result.errors.join('\n'));
});

test('reports missing homepage metadata', async () => {
  const result = await checkBuildOutput({
    distDir: await createFixture({ homeHtml: '<!doctype html><title>Incomplete</title>' }),
    maxHomeGzipBytes: 204800,
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.missingMetadata.sort(), [
    'canonical',
    'description',
    'json-ld',
    'og:description',
    'og:image',
    'og:title',
    'twitter:card',
  ]);
});

test('reports a missing required route', async () => {
  const distDir = await createFixture();
  await rm(path.join(distDir, 'privacy'), { recursive: true, force: true });
  const result = await checkBuildOutput({ distDir, maxHomeGzipBytes: 204800 });
  assert.equal(result.ok, false);
  assert.equal(result.routePresence['privacy/index.html'], false);
  assert.match(result.errors.join('\n'), /missing route: privacy\/index\.html/i);
});

test('reports a homepage JavaScript bundle above the gzip budget', async () => {
  const result = await checkBuildOutput({
    distDir: await createFixture({ homeJs: randomBytes(400_000) }),
    maxHomeGzipBytes: 204800,
  });
  assert.equal(result.ok, false);
  assert.ok(result.homeJsGzipBytes > 204800);
  assert.match(result.errors.join('\n'), /homepage javascript/i);
});
