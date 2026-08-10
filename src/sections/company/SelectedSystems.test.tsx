import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SelectedSystems from './SelectedSystems';

describe('SelectedSystems', () => {
  it('leads with two verified featured systems', () => {
    render(<SelectedSystems />);
    const region = screen.getByRole('region', { name: 'Different problems. Working systems.' });
    expect(within(region).getByRole('heading', { name: 'Different problems. Working systems.' })).toBeVisible();
    expect(within(region).getByRole('heading', { name: 'Omega Browser Agent' })).toBeVisible();
    expect(within(region).getByText('Working build · Edge MV3')).toBeVisible();
    expect(within(region).getByText(/local 4B model/i)).toBeVisible();
    expect(within(region).getByRole('heading', { name: 'DevCard AI' })).toBeVisible();
    expect(within(region).getByText('Live SaaS product')).toBeVisible();
  });

  it('keeps private-system inquiries in the current tab and public destinations external', () => {
    render(<SelectedSystems />);
    const browserDemo = screen.getByRole('link', { name: 'Request a demo: Omega Browser Agent' });
    expect(browserDemo).toHaveAttribute('href', '#project-inquiry');
    expect(browserDemo).not.toHaveAttribute('target');
    expect(browserDemo).not.toHaveAttribute('rel');

    const memoryInquiry = screen.getByRole('link', { name: 'Discuss this system: Omega Memory MCP' });
    expect(memoryInquiry).toHaveAttribute('href', '#project-inquiry');
    expect(memoryInquiry).not.toHaveAttribute('target');
    expect(memoryInquiry).not.toHaveAttribute('rel');

    for (const link of [
      screen.getByRole('link', { name: 'Open live app: DevCard AI' }),
      screen.getByRole('link', { name: 'View source: Omega Runtime' }),
      screen.getByRole('link', { name: 'View source: NanoAgent' }),
    ]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    }
    expect(document.querySelector('a[href*="Omega3.0/tree/main/browser_agent_extension"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="omega-memory-mcp"]')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Omega Runtime' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Omega Memory MCP' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'NanoAgent' })).toBeVisible();
  });
});
