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
