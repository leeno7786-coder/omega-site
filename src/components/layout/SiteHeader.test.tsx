import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SiteHeader from './SiteHeader';

describe('SiteHeader', () => {
  it('exposes every destination through the mobile menu', async () => {
    render(<SiteHeader currentPage="home" />);
    await userEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(screen.getByRole('link', { name: 'Capabilities' })).toHaveAttribute('href', '/#capabilities');
    expect(screen.getByRole('link', { name: 'Omega 3.0' })).toHaveAttribute('href', '/omega-3/');
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/#project-inquiry');
  });

  it('announces the NanoAI beta above the header and links to its sign-up form', () => {
    render(<SiteHeader currentPage="home" />);
    const launch = screen.getByRole('complementary', { name: 'NanoAI beta launch' });
    expect(launch).toHaveTextContent('The NanoAI beta is live.');
    expect(screen.getByRole('link', { name: /Sign up for the beta/ })).toHaveAttribute('href', '/nanoai/#beta');
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
