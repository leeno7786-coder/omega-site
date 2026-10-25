import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '../../pages/Home';
import NanoAppsSpotlight from './NanoAppsSpotlight';

describe('NanoAppsSpotlight', () => {
  it('advertises Nano with its steps, price and a link to the live app', () => {
    render(<NanoAppsSpotlight />);
    const region = screen.getByRole('region', { name: 'Nano builds real Android apps from a sentence.' });
    expect(within(region).getByText('New · Live now')).toBeVisible();
    const steps = within(region).getByRole('list', { name: 'How Nano works' });
    expect(within(steps).getAllByRole('listitem')).toHaveLength(5);
    expect(within(region).getByText('From $4.99 per app')).toBeVisible();
    const action = within(region).getByRole('link', { name: /Build an app with Nano/ });
    expect(action).toHaveAttribute('href', 'https://omega-dev.uk/');
    expect(action).toHaveAttribute('target', '_blank');
    expect(action).toHaveAttribute('rel', 'noreferrer');
  });

  it('shows the real demo, muted with controls', () => {
    const { container } = render(<NanoAppsSpotlight />);
    const video = container.querySelector('video') as HTMLVideoElement;
    expect(video).toHaveAttribute('src', '/nano/nano-demo.mp4');
    expect(video).toHaveAttribute('poster', '/nano/nano-demo-poster.webp');
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveAccessibleName(/Nano demo/);
  });

  it('sits right after the proof rail, with an announcement in the hero and a nav entry', () => {
    const { container } = render(<Home />);
    const spotlight = container.querySelector('#nano-apps');
    const capabilities = container.querySelector('#capabilities');
    expect(spotlight).not.toBeNull();
    expect(spotlight!.compareDocumentPosition(capabilities as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('link', { name: /Nano builds Android apps from one sentence/ })).toHaveAttribute('href', '#nano-apps');
    expect(screen.getByRole('link', { name: 'Nano Apps' })).toHaveAttribute('href', '/#nano-apps');
  });
});
