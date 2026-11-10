import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SiteHeader from './SiteHeader';

describe('SiteHeader', () => {
  it('exposes every destination through the mobile menu', async () => {
    render(<SiteHeader currentPage="home" />);
    await userEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(screen.getByRole('link', { name: 'Capabilities' })).toHaveAttribute('href', '/#capabilities');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects/');
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/#project-inquiry');
  });

  it('lists projects under one Projects tab and marks it on every project page', () => {
    const { rerender } = render(<SiteHeader currentPage="home" />);
    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    for (const name of ['Omega 3.0', 'NanoAI']) {
      expect(within(navigation).queryByRole('link', { name })).not.toBeInTheDocument();
    }
    expect(within(navigation).getByRole('link', { name: 'Projects' })).not.toHaveAttribute('aria-current');
    for (const page of ['projects', 'nanoai', 'omega-3'] as const) {
      rerender(<SiteHeader currentPage={page} />);
      expect(within(navigation).getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
    }
  });

  it('announces the NanoAI release above the header and links to its download', () => {
    render(<SiteHeader currentPage="home" />);
    const launch = screen.getByRole('complementary', { name: 'NanoAI launch' });
    expect(launch).toHaveTextContent('NanoAI is out now for Windows.');
    expect(launch).not.toHaveTextContent(/beta/i);
    expect(screen.getByRole('link', { name: /Get NanoAI/ })).toHaveAttribute('href', '/nanoai/#download');
    expect(launch.compareDocumentPosition(screen.getByRole('banner')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('closes an open menu with Escape', async () => {
    render(<SiteHeader currentPage="home" />);
    const toggle = screen.getByRole('button', { name: 'Open navigation' });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
