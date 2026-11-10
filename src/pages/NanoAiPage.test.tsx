import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import NanoAiPage from './NanoAiPage';

it('explains connected accounts and links the NanoAI privacy policy', () => {
  render(<NanoAiPage />);
  const section = screen.getByRole('region', { name: /Your accounts\.\s*Your data\./ });
  expect(within(section).getByText(/Gmail, Google Calendar, Drive, Docs, Sheets, Slides and Chat/)).toBeVisible();
  expect(within(section).getByRole('link', { name: 'Read the NanoAI privacy policy' })).toHaveAttribute('href', '/nanoai/privacy/');
  expect(screen.getByRole('navigation', { name: 'NanoAI showcase sections' })).toHaveTextContent('Your data');
});

it('presents NanoAI as released, with the download in place of the beta form', () => {
  const { container } = render(<NanoAiPage />);
  const hero = screen.getByRole('region', { name: /NanoAI\s*Bring your PC\s*to life\./ });
  expect(within(hero).getByRole('link', { name: 'Download for Windows' })).toHaveAttribute('href', 'https://omega-dev.uk/download');
  expect(within(hero).getByRole('link', { name: /See Nano Cloud plans/ })).toHaveAttribute('href', 'https://omega-dev.uk/#plans');

  const download = screen.getByRole('region', { name: /Get NanoAI\s*for Windows\./ });
  expect(download).toHaveAttribute('id', 'download');
  expect(within(download).getByRole('link', { name: 'Download for Windows' })).toHaveAttribute('href', 'https://omega-dev.uk/download');
  expect(within(download).getByRole('link', { name: /Your Nano Cloud account/ })).toHaveAttribute('href', 'https://cloud.omega-dev.uk/account');
  expect(within(download).getByText('Free')).toBeVisible();
  expect(within(download).getByText('From $20 a month')).toBeVisible();

  expect(screen.getByRole('navigation', { name: 'NanoAI showcase sections' })).toHaveTextContent('Download');
  expect(container.querySelector('#beta')).toBeNull();
  expect(container.querySelector('form')).toBeNull();
  expect(container.textContent).not.toMatch(/\bbeta\b|Azure|voice companion|development build/i);
});

it('shows the current app in its gallery', () => {
  render(<NanoAiPage />);
  for (const name of ['Meet Nano', 'Where Nano thinks', 'Plugins', 'Settings']) {
    expect(screen.getByRole('button', { name: `Enlarge ${name}` })).toBeVisible();
  }
});
