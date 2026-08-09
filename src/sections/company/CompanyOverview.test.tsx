import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CompanyOverview from './CompanyOverview';

describe('CompanyOverview', () => {
  it('uses only verified company and founder information', () => {
    render(<CompanyOverview />);
    expect(screen.getByText('Research-minded. Deployment-ready.')).toBeVisible();
    expect(screen.getByText('Noah Lee')).toBeVisible();
    expect(screen.getByText('Mitchell Ray')).toBeVisible();
    expect(screen.getByText('Larone Williamson')).toBeVisible();
    expect(screen.getAllByText('Co-founder')).toHaveLength(3);
    expect(screen.queryByText(/CEO|CTO|operations|engineering lead/i)).not.toBeInTheDocument();
  });
});
