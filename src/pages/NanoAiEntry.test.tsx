import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import Home from './Home';

it('features NanoAI and preserves the existing Omega showcase', () => {
  render(<Home />);
  const systems = screen.getByRole('region', { name: 'Different problems. Working systems.' });
  expect(within(systems).getByRole('heading', { name: 'NanoAI' })).toBeVisible();
  expect(within(systems).getByRole('link', { name: 'Explore NanoAI' })).toHaveAttribute('href', '/nanoai/');
  expect(within(systems).getByRole('img', { name: /setup guide asking where Nano should think/ })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Explore the technical proof' })).toHaveAttribute('href', '/omega-3/');
  expect(within(systems).getByRole('heading', { name: 'Omega Browser Agent' })).toBeVisible();
  expect(within(systems).getByRole('heading', { name: 'Odin' })).toBeVisible();
});

it('announces the NanoAI launch in the hero and right after the proof rail', () => {
  const { container } = render(<Home />);
  const spotlight = screen.getByRole('region', { name: 'NanoAI runs your PC for you, hands-free.' });
  const capabilities = container.querySelector('#capabilities');
  expect(spotlight).toHaveAttribute('id', 'nanoai-launch');
  expect(spotlight.compareDocumentPosition(capabilities as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByRole('link', { name: /NanoAI is out now for Windows/ })).toHaveAttribute('href', '#nanoai-launch');

  expect(within(spotlight).getByText('New · Out now for Windows')).toBeVisible();
  expect(within(within(spotlight).getByRole('list', { name: 'How to start with NanoAI' })).getAllByRole('listitem')).toHaveLength(4);
  expect(within(spotlight).getByRole('link', { name: 'Download for Windows' })).toHaveAttribute('href', 'https://omega-dev.uk/download');
  expect(within(spotlight).getByRole('link', { name: 'See what Nano does' })).toHaveAttribute('href', '/nanoai/');
  expect(within(spotlight).getByRole('img', { name: /Meet Nano/ })).toBeVisible();
  expect(container.querySelector('#nano-apps')).toBeNull();
  expect(container.querySelector('video')).toBeNull();
});
