import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FounderProfileSection from './FounderProfile';

describe('FounderProfileSection', () => {
  it('presents Noah as the hands-on technical lead with verified proof', () => {
    render(<FounderProfileSection />);
    expect(screen.getByRole('heading', { name: 'Noah Lee' })).toBeVisible();
    expect(screen.getByText('Founder & Principal Engineer')).toBeVisible();
    expect(screen.getByText(/clients work directly with Noah/i)).toBeVisible();
    expect(screen.getByText(/U.S. Provisional Patent Application No. 63\/965,475/i)).toBeVisible();
    for (const { name, href } of [
      { name: 'Noah Lee on LinkedIn', href: 'https://www.linkedin.com/in/noah-lee-omegaai/' },
      { name: 'Noah Lee on GitHub', href: 'https://github.com/leeno7786-coder' },
    ]) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    }
  });

  it('preserves co-founder credit and omits private résumé details', () => {
    render(<FounderProfileSection />);
    expect(screen.getByText('Larone Williamson')).toBeVisible();
    expect(screen.getAllByText('Co-founder')).toHaveLength(1);
    expect(screen.queryByText(/337-396-5510|DeRidder, Louisiana/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument();
  });
});
