import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OMEGA_BROWSER_AGENT } from '../content/projectsContent';
import ProjectsPage from './ProjectsPage';

describe('ProjectsPage', () => {
  it('showcases Omega Browser Agent with its store listing, sign-up site, demo and screenshots', () => {
    render(<ProjectsPage />);
    const agent = screen.getByRole('article', { name: 'Omega Browser Agent' });
    expect(within(agent).getByText('New · Microsoft Edge Add-ons')).toBeVisible();
    expect(within(agent).getAllByRole('listitem').length).toBeGreaterThanOrEqual(4);

    const store = within(agent).getByRole('link', { name: /Get it on Microsoft Edge Add-ons/ });
    expect(store).toHaveAttribute('href', OMEGA_BROWSER_AGENT.storeHref);
    expect(store).toHaveAttribute('href', expect.stringMatching(/^https:\/\/microsoftedge\.microsoft\.com\/addons\/detail\//));
    const signUp = within(agent).getByRole('link', { name: 'Sign up and plans' });
    expect(signUp).toHaveAttribute('href', 'https://omegabrowseragent.app/upgrade');
    for (const link of [store, signUp]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    }

    const video = agent.querySelector('video') as HTMLVideoElement;
    expect(video).toHaveAttribute('src', '/projects/omega-browser-agent/demo.mp4');
    expect(video).toHaveAttribute('poster', '/projects/omega-browser-agent/demo-poster.webp');
    expect(video).toHaveAttribute('controls');
    expect(video).not.toHaveAttribute('autoplay');
    expect(video).toHaveAccessibleName(/Omega Browser Agent demo/);

    const gallery = within(agent).getByRole('list', { name: 'Omega Browser Agent screenshots' });
    const shots = within(gallery).getAllByRole('img');
    expect(shots).toHaveLength(4);
    for (const shot of shots) expect(shot.getAttribute('alt')).not.toBe('');
  });

  it('lists every product and the research systems, with the right destinations', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Built, shipped and running.');

    const nanoAi = screen.getByRole('article', { name: 'NanoAI' });
    expect(within(nanoAi).getByText('New · Out now for Windows')).toBeVisible();
    expect(within(nanoAi).getByRole('link', { name: 'Download for Windows' })).toHaveAttribute('href', 'https://omega-dev.uk/download');
    expect(within(nanoAi).getByRole('link', { name: 'Explore NanoAI' })).toHaveAttribute('href', '/nanoai/');
    expect(within(nanoAi).queryByText(/beta/i)).not.toBeInTheDocument();

    // The Nano app builder was retired; omega-dev.uk now serves NanoAI.
    expect(screen.queryByRole('article', { name: 'Nano' })).not.toBeInTheDocument();
    expect(screen.queryByText(/join a beta/i)).not.toBeInTheDocument();

    const systems = screen.getByRole('region', { name: 'The engineering underneath.' });
    for (const name of ['Omega 3.0', 'Odin', 'Omega Runtime', 'Omega Memory MCP', 'NanoAgent']) {
      expect(within(systems).getByRole('heading', { name })).toBeVisible();
    }
    expect(within(systems).getByRole('link', { name: /See the technical proof/ })).toHaveAttribute('href', '/omega-3/');
    // This page has no inquiry form of its own, so inquiries go to the homepage's.
    expect(within(systems).getByRole('link', { name: 'Discuss this system: Odin' })).toHaveAttribute('href', '/#project-inquiry');

    const index = screen.getByRole('navigation', { name: 'Projects on this page' });
    for (const link of within(index).getAllByRole('link')) {
      expect(document.querySelector(link.getAttribute('href') as string)).not.toBeNull();
    }
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toContainElement(
      screen.getByRole('link', { name: 'Projects', current: 'page' }),
    );
  });
});
