import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OmegaProofPreview from './OmegaProofPreview';

describe('OmegaProofPreview', () => {
  it('frames Omega 3.0 as qualified evidence of broad engineering ability', () => {
    render(<OmegaProofPreview />);
    expect(screen.getByRole('heading', { name: 'One system. Multiple disciplines proven.' })).toBeVisible();
    expect(screen.getByText('86.4% headline LongMemEval-S (mistral-large)')).toBeVisible();
    expect(screen.getByText(/up to 78.0% with a local 4B model/i)).toBeVisible();
    expect(screen.getByText(/Linux deployment and support/i)).toBeVisible();
    expect(screen.getByRole('link', { name: 'Explore the technical proof' })).toHaveAttribute('href', '/omega-3/');
  });

  it('links to real evidence and omits unavailable video', () => {
    render(<OmegaProofPreview />);
    expect(screen.getByRole('link', { name: 'Architecture' })).toHaveAttribute('href', '/omega-3/#architecture');
    expect(screen.getByRole('link', { name: 'Benchmarks' })).toHaveAttribute('href', '/omega-3/#benchmarks');
    expect(screen.getByRole('link', { name: 'Repositories' })).toHaveAttribute(
      'href',
      'https://github.com/leeno7786-coder/Omega3.0',
    );
    expect(screen.getByRole('link', { name: 'Screenshots' })).toHaveAttribute('href', '/omega-3/#screenshots');
    expect(screen.queryByText(/video/i)).not.toBeInTheDocument();
  });
});
