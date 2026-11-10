import { describe, expect, it } from 'vitest';
import {
  AUTONOMOUS_SYSTEMS_PAGE,
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
      'autonomous-systems',
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
      'Larone Williamson',
    ]);
    expect(SELECTED_SYSTEMS.map((system) => system.id)).toEqual([
      'omega-browser-agent',
      'odin',
      'omega-runtime',
      'omega-memory-mcp',
      'nanoagent',
    ]);
    // NanoAI is featured by its own preview (NanoAiPreview); the retired Nano app builder is gone.
    expect(SELECTED_SYSTEMS.filter((system) => system.tier === 'featured')).toHaveLength(1);
    expect(JSON.stringify(SELECTED_SYSTEMS)).not.toMatch(/omega-dev\.uk|Android app builder/);
    expect(SELECTED_SYSTEMS.find((system) => system.id === 'omega-browser-agent')).toMatchObject({
      status: 'Live · Microsoft Edge Add-ons',
      href: 'https://microsoftedge.microsoft.com/addons/detail/omega-browser-agent/djcijkfloeepplakbehdnplfahfhpleo',
      linkLabel: 'Get it on Edge Add-ons',
    });
    expect(SELECTED_SYSTEMS.find((system) => system.id === 'omega-memory-mcp')).toMatchObject({
      status: 'Private memory infrastructure',
      href: '#project-inquiry',
      linkLabel: 'Discuss this system',
    });
    expect(JSON.stringify({ FOUNDER_PROFILE, SELECTED_SYSTEMS })).not.toMatch(
      /337-396-5510|downloads?\/.*resume|completed client|github\.com\/leeno7786-coder\/(?:Omega3\.0\/tree\/main\/browser_agent_extension|omega-memory-mcp)/i,
    );
  });

  it('exposes real destinations and inquiry categories', () => {
    expect(SITE_NAV.map((item) => item.label)).toEqual(['Capabilities', 'Projects', 'How we work', 'Company']);
    expect(SITE_NAV.find((item) => item.label === 'Projects')?.href).toBe('/projects/');
    expect(PROJECT_CATEGORIES).toContain('Unsure or another type of project');
    expect(PROJECT_CATEGORIES).toContain('Autonomous systems and drone robotics');
    expect(CAPABILITIES.find((item) => item.id === 'autonomous-systems')).toMatchObject({
      href: '/autonomous-systems/',
    });
    expect(AUTONOMOUS_SYSTEMS_PAGE.sbirStatement).toBe(
      'In 2026, Omega AI LLC submitted an SBIR proposal addressing autonomous planning for a 200-agent UAS swarm operating under degraded conditions.',
    );
    expect(AUTONOMOUS_SYSTEMS_PAGE.sbirStatus).toBe('Proposal submitted');
    expect(JSON.stringify(AUTONOMOUS_SYSTEMS_PAGE)).not.toMatch(/government-backed|validated by the DoW/i);
    expect(JSON.stringify(AUTONOMOUS_SYSTEMS_PAGE)).not.toMatch(/\bcontracted\b/i);
    expect(JSON.stringify(AUTONOMOUS_SYSTEMS_PAGE)).not.toMatch(/\bselected\b/i);
  });
});
