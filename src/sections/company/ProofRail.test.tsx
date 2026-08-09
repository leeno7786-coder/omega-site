import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProofRail from './ProofRail';

describe('ProofRail', () => {
  it('pairs every proof value with a claim and qualifier', () => {
    render(<ProofRail />);
    expect(screen.getAllByTestId('proof-metric')).toHaveLength(4);
    expect(screen.getByText('13')).toBeVisible();
    expect(screen.getByText('Validated in the Omega 3.0 architecture')).toBeVisible();
    expect(screen.getByText('For the validated local architecture')).toBeVisible();
    expect(screen.getByText('For custom systems and deployments')).toBeVisible();
  });
});
