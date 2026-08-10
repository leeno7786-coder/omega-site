import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SelectedSystems from './SelectedSystems';

describe('SelectedSystems', () => {
  it('leads with two verified featured systems', () => {
    render(<SelectedSystems />);
    const region = screen.getByRole('region', { name: 'Different problems. Working systems.' });
    expect(within(region).getByRole('heading', { name: 'Different problems. Working systems.' })).toBeVisible();
    expect(within(region).getByRole('heading', { name: 'Omega Browser Agent' })).toBeVisible();
    expect(within(region).getByText('Working source · Edge MV3')).toBeVisible();
    expect(within(region).getByText(/local 4B model/i)).toBeVisible();
    expect(within(region).getByRole('heading', { name: 'DevCard AI' })).toBeVisible();
    expect(within(region).getByText('Live SaaS product')).toBeVisible();
  });

  it('links to every approved public destination safely', () => {
    render(<SelectedSystems />);
    expect(screen.getByRole('link', { name: 'View source: Omega Browser Agent' })).toHaveAttribute(
      'href',
      'https://github.com/leeno7786-coder/Omega3.0/tree/main/browser_agent_extension',
    );
    expect(screen.getByRole('link', { name: 'Open live app: DevCard AI' })).toHaveAttribute(
      'href',
      'https://www.omega-dev.uk/',
    );
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    }
    expect(screen.getByRole('heading', { name: 'Omega Runtime' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Omega Memory MCP' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'NanoAgent' })).toBeVisible();
  });
});
