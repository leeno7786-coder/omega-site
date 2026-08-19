import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AutonomousSystemsPage from './AutonomousSystemsPage';
import { AUTONOMOUS_SYSTEMS_PAGE } from '../content/siteContent';

describe('AutonomousSystemsPage', () => {
  it('presents the capability, disciplines, and cleared SBIR statement', () => {
    render(<AutonomousSystemsPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(AUTONOMOUS_SYSTEMS_PAGE.title);
    expect(screen.getByRole('link', { name: 'Back to company site' })).toHaveAttribute('href', '/');
    expect(screen.getByText(AUTONOMOUS_SYSTEMS_PAGE.sbirStatement)).toBeVisible();
    expect(screen.getByText(/proposal submitted/i)).toBeVisible();
    const inquiryLinks = screen.getAllByRole('link', { name: 'Start a project' });
    expect(inquiryLinks.length).toBeGreaterThan(0);
    expect(inquiryLinks.every((link) => link.getAttribute('href') === '/#project-inquiry')).toBe(true);
    for (const discipline of AUTONOMOUS_SYSTEMS_PAGE.disciplines) {
      expect(screen.getByRole('heading', { name: discipline.title })).toBeVisible();
    }
  });

  it('does not describe the SBIR pursuit as awarded or endorsed', () => {
    render(<AutonomousSystemsPage />);
    expect(document.body.textContent).not.toMatch(/government-backed|validated by the DoW/i);
    expect(document.body.textContent).not.toMatch(/\bcontracted\b/i);
    expect(document.body.textContent).not.toMatch(/\bselected\b/i);
  });
});
