// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

interface FounderSchema {
  '@id'?: string;
  name: string;
  jobTitle?: string;
  sameAs?: string[];
}

interface OrganizationSchema {
  '@id'?: string;
  '@type': string;
  founder: FounderSchema[];
}

describe('homepage identity metadata', () => {
  it('connects Noah Lee to Omega AI and his public profiles', () => {
    const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const schema = JSON.parse(match?.[1] ?? '{}') as OrganizationSchema;
    expect(schema).toMatchObject({
      '@type': 'Organization',
      '@id': 'https://omega2ai.com/#organization',
    });
    expect(schema.founder.map((founder) => founder.name)).toEqual([
      'Noah Lee',
      'Mitchell Ray',
      'Larone Williamson',
    ]);
    expect(schema.founder.find((founder) => founder.name === 'Noah Lee')).toMatchObject({
      '@id': 'https://omega2ai.com/#noah-lee',
      jobTitle: 'Founder & Principal Engineer',
      sameAs: [
        'https://www.linkedin.com/in/noah-lee-omegaai/',
        'https://github.com/leeno7786-coder',
      ],
    });
  });
});
