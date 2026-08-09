import { gzipSync } from 'node:zlib';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_ROUTES = ['index.html', 'omega-3/index.html', 'privacy/index.html', 'terms/index.html'];
const METADATA = {
  description: /<meta[^>]+name=["']description["'][^>]*>/i,
  canonical: /<link[^>]+rel=["']canonical["'][^>]*>/i,
  'og:title': /<meta[^>]+property=["']og:title["'][^>]*>/i,
  'og:description': /<meta[^>]+property=["']og:description["'][^>]*>/i,
  'og:image': /<meta[^>]+property=["']og:image["'][^>]*>/i,
  'twitter:card': /<meta[^>]+name=["']twitter:card["'][^>]*>/i,
  'json-ld': /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i,
};
const IMAGE_PATTERN = /\.(?:avif|jpe?g|png|webp)$/i;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  }));
  return nested.flat();
}

function collectEntryFiles(manifest, key, collected = new Set()) {
  const entry = manifest[key];
  if (!entry || collected.has(key)) return collected;
  collected.add(key);
  for (const importedKey of entry.imports ?? []) collectEntryFiles(manifest, importedKey, collected);
  return collected;
}

export async function checkBuildOutput({ distDir = 'dist', maxHomeGzipBytes = 204800 } = {}) {
  const errors = [];
  const routePresence = {};
  let homeHtml = '';

  for (const route of REQUIRED_ROUTES) {
    try {
      const html = await readFile(path.join(distDir, route), 'utf8');
      routePresence[route] = true;
      if (route === 'index.html') homeHtml = html;
    } catch {
      routePresence[route] = false;
      errors.push(`Missing route: ${route}`);
    }
  }

  const missingMetadata = Object.entries(METADATA)
    .filter(([, pattern]) => !pattern.test(homeHtml))
    .map(([name]) => name);
  errors.push(...missingMetadata.map((name) => `Missing homepage metadata: ${name}`));

  let sitemapHashUrls = [];
  try {
    const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
    sitemapHashUrls = [...sitemap.matchAll(/<loc>([^<]*#[^<]*)<\/loc>/gi)].map((match) => match[1]);
    errors.push(...sitemapHashUrls.map((url) => `Sitemap URL contains a fragment: ${url}`));
  } catch {
    errors.push('Missing sitemap.xml');
  }

  let homeJsGzipBytes = 0;
  try {
    const manifest = JSON.parse(await readFile(path.join(distDir, '.vite', 'manifest.json'), 'utf8'));
    if (!manifest['index.html']) throw new Error('Homepage entry is missing');
    const keys = collectEntryFiles(manifest, 'index.html');
    for (const key of keys) {
      const file = manifest[key]?.file;
      if (file?.endsWith('.js')) {
        homeJsGzipBytes += gzipSync(await readFile(path.join(distDir, file))).byteLength;
      }
    }
    if (homeJsGzipBytes > maxHomeGzipBytes) {
      errors.push(`Homepage JavaScript is ${homeJsGzipBytes} gzip bytes; budget is ${maxHomeGzipBytes}.`);
    }
  } catch (error) {
    errors.push(`Could not inspect Vite manifest: ${error.message}`);
  }

  const oversizedImages = [];
  for (const file of await walk(distDir)) {
    if (!IMAGE_PATTERN.test(file)) continue;
    const bytes = (await stat(file)).size;
    if (bytes > 512000) oversizedImages.push({ file: path.relative(distDir, file), bytes });
  }
  errors.push(...oversizedImages.map(({ file, bytes }) => `Image ${file} is ${bytes} bytes; budget is 512000.`));

  return {
    ok: errors.length === 0,
    routePresence,
    missingMetadata,
    sitemapHashUrls,
    oversizedImages,
    homeJsGzipBytes,
    errors,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkBuildOutput();
  if (!result.ok) {
    console.error(result.errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Build checks passed; homepage JavaScript: ${result.homeJsGzipBytes} gzip bytes.`);
  }
}
