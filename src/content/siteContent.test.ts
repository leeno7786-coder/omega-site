import { describe, expect, it } from 'vitest';
import {
  CAPABILITIES,
  FOUNDERS,
  HOME_PROOF_METRICS,
  PROCESS_STEPS,
  PROJECT_CATEGORIES,
  SITE_NAV,
} from './siteContent';

describe('site content contract', () => {
  it('keeps the approved company hierarchy', () => {
    expect(CAPABILITIES.map((item) => item.id)).toEqual([
      'metacognitive-ai',
      'custom-runtimes',
      'digital-products',
      'computers-integrations',
    ]);
    expect(HOME_PROOF_METRICS.map((item) => item.value)).toEqual([
      '13',
      '8 GB',
      '0',
      'Linux',
    ]);
    expect(PROCESS_STEPS).toHaveLength(4);
    expect(FOUNDERS.map((founder) => founder.name)).toEqual([
      'Noah Lee',
      'Mitchell Ray',
      'Larone Williamson',
    ]);
  });

  it('exposes real destinations and inquiry categories', () => {
    expect(SITE_NAV.some((item) => item.href === '/omega-3/')).toBe(true);
    expect(PROJECT_CATEGORIES).toContain('Unsure or another type of project');
  });
});
