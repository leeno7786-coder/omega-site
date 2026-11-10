import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SelectedSystems from './SelectedSystems';

describe('SelectedSystems', () => {
  it('leads with NanoAI and the Omega Browser Agent, without the retired Nano app builder', () => {
    render(<SelectedSystems />);
    const region = screen.getByRole('region', { name: 'Different problems. Working systems.' });
    expect(within(region).getByRole('heading', { name: 'Different problems. Working systems.' })).toBeVisible();
    expect(within(region).getByRole('heading', { name: 'NanoAI' })).toBeVisible();
    expect(within(region).getByText('Featured platform / Out now for Windows')).toBeVisible();
    expect(within(region).getByRole('heading', { name: 'Omega Browser Agent' })).toBeVisible();
    expect(within(region).getByText('Live · Microsoft Edge Add-ons')).toBeVisible();
    expect(within(region).getByText(/local model on your own PC/i)).toBeVisible();
    expect(within(region).queryByRole('heading', { name: 'Nano' })).not.toBeInTheDocument();
    expect(within(region).queryByText('Android app builder')).not.toBeInTheDocument();
  });

  it('keeps private-system inquiries in the current tab and public destinations external', () => {
    render(<SelectedSystems />);
    for (const title of ['Odin', 'Omega Memory MCP']) {
      const inquiry = screen.getByRole('link', { name: `Discuss this system: ${title}` });
      expect(inquiry).toHaveAttribute('href', '#project-inquiry');
      expect(inquiry).not.toHaveAttribute('target');
      expect(inquiry).not.toHaveAttribute('rel');
    }

    for (const { name, href } of [
      { name: 'Get it on Edge Add-ons: Omega Browser Agent', href: 'https://microsoftedge.microsoft.com/addons/detail/omega-browser-agent/djcijkfloeepplakbehdnplfahfhpleo' },
      { name: 'View source: Omega Runtime', href: 'https://github.com/leeno7786-coder/Omega-NPU-Runtime' },
      { name: 'View source: NanoAgent', href: 'https://github.com/leeno7786-coder/nanoagent' },
    ]) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    }
    expect(document.querySelector('a[href*="Omega3.0/tree/main/browser_agent_extension"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="omega-memory-mcp"]')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Omega Runtime' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Omega Memory MCP' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'NanoAgent' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'See all projects' })).toHaveAttribute('href', '/projects/');
  });
});
