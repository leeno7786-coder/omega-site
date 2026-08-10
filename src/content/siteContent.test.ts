import { describe, expect, it } from 'vitest';
import {
  CAPABILITIES,
  COFOUNDERS,
  FOUNDER_PROFILE,
  HOME_PROOF_METRICS,
  PROCESS_STEPS,
  PROJECT_CATEGORIES,
  SELECTED_SYSTEMS,
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
  });

  it('keeps the approved founder hierarchy and selected systems', () => {
    expect(FOUNDER_PROFILE).toMatchObject({
      id: 'noah-lee',
      name: 'Noah Lee',
      role: 'Founder & Principal Engineer',
    });
    expect(FOUNDER_PROFILE.links).toEqual([
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/noah-lee-omegaai/' },
      { label: 'GitHub', href: 'https://github.com/leeno7786-coder' },
    ]);
    expect(COFOUNDERS.map((founder) => founder.name)).toEqual([
      'Mitchell Ray',
      'Larone Williamson',
    ]);
    expect(SELECTED_SYSTEMS.map((system) => system.id)).toEqual([
      'omega-browser-agent',
      'devcard-ai',
      'omega-runtime',
      'omega-memory-mcp',
      'nanoagent',
    ]);
    expect(SELECTED_SYSTEMS.filter((system) => system.tier === 'featured')).toHaveLength(2);
    expect(SELECTED_SYSTEMS.find((system) => system.id === 'devcard-ai')).toMatchObject({
      status: 'Live SaaS product',
      href: 'https://www.omega-dev.uk/',
      linkLabel: 'Open live app',
    });
    expect(SELECTED_SYSTEMS.find((system) => system.id === 'omega-browser-agent')).toMatchObject({
      status: 'Working source · Edge MV3',
      href: 'https://github.com/leeno7786-coder/Omega3.0/tree/main/browser_agent_extension',
      linkLabel: 'View source',
    });
    expect(JSON.stringify({ FOUNDER_PROFILE, SELECTED_SYSTEMS })).not.toMatch(
      /337-396-5510|downloads?\/.*resume|completed client/i,
    );
  });

  it('exposes real destinations and inquiry categories', () => {
    expect(SITE_NAV.some((item) => item.href === '/omega-3/')).toBe(true);
    expect(PROJECT_CATEGORIES).toContain('Unsure or another type of project');
  });
});
