import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import Home from './Home';

it('features NanoAI computer use and preserves the existing Omega showcase', () => {
  render(<Home />);
  const systems = screen.getByRole('region', { name: 'Different problems. Working systems.' });
  expect(within(systems).getByRole('heading', { name: 'NanoAI' })).toBeVisible();
  expect(within(systems).getByRole('link', { name: 'Explore NanoAI' })).toHaveAttribute('href', '/nanoai/');
  expect(within(systems).getByRole('img', { name: /recorded Windows application actions/ })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Explore the technical proof' })).toHaveAttribute('href', '/omega-3/');
  expect(within(systems).getByRole('heading', { name: 'Omega Browser Agent' })).toBeVisible();
  expect(within(systems).getByRole('heading', { name: 'DevCard AI' })).toBeVisible();
  expect(within(systems).getByRole('heading', { name: 'Odin' })).toBeVisible();
});
