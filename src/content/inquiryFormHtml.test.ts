// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('static Netlify form detector', () => {
  it('registers project-inquiry with POST so Netlify can process submissions', () => {
    const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
    expect(html).toMatch(/<form[^>]*name=["']project-inquiry["'][^>]*>/i);
    expect(html).toMatch(/<form[^>]*method=["']POST["'][^>]*>/i);
    expect(html).toMatch(/data-netlify=["']true["']/i);
    expect(html).toMatch(/name=["']form-name["'][^>]*value=["']project-inquiry["']/i);
    expect(html).toMatch(/name=["']name["']/);
    expect(html).toMatch(/name=["']email["']/);
    expect(html).toMatch(/name=["']company["']/);
    expect(html).toMatch(/name=["']category["']/);
    expect(html).toMatch(/name=["']description["']/);
    expect(html).toMatch(/name=["']bot-field["']/);
  });
});
