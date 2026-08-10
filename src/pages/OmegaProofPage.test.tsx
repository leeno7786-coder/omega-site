import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OmegaProofPage from './OmegaProofPage';

describe('OmegaProofPage', () => {
  it('presents the complete qualified technical proof structure', () => {
    render(<OmegaProofPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Omega 3.0 technical proof');
    expect(screen.getByRole('link', { name: 'Back to company site' })).toHaveAttribute('href', '/');
    for (const heading of [
      'Architecture',
      'Autonomous behavior',
      'Benchmarks',
      'Runtime',
      'Memory',
      'Agent layer',
      'Image evidence',
      'Portability',
      'Repositories',
    ]) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
  });

  it('keeps benchmark, local-model, and platform claims qualified', () => {
    render(<OmegaProofPage />);
    expect(screen.getByText('86.4% headline LongMemEval-S (mistral-large)')).toBeVisible();
    expect(screen.getByText(/up to 78.0% with a local 4B model/i)).toBeVisible();
    expect(screen.getByText(/76.7% three-trial mean/i)).toBeVisible();
    expect(screen.getByText(/Linux support is available/i)).toBeInTheDocument();
    expect(screen.queryByText(/Linux coming soon/i)).not.toBeInTheDocument();
  });

  it('routes private repositories to inquiry while public repositories remain external', () => {
    render(<OmegaProofPage />);

    for (const link of [
      screen.getByRole('link', { name: /Private engineering repository Omega 3\.0/ }),
      screen.getByRole('link', { name: /Private engineering repository Omega Memory MCP/ }),
    ]) {
      expect(link).toHaveAttribute('href', '/#project-inquiry');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    }

    for (const { name, href } of [
      { name: /Public repository NanoAgent/, href: 'https://github.com/leeno7786-coder/nanoagent' },
      { name: /Public repository Omega NPU Runtime/, href: 'https://github.com/leeno7786-coder/Omega-NPU-Runtime' },
    ]) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    }

    expect(document.querySelector('a[href*="leeno7786-coder/Omega3.0"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="leeno7786-coder/omega-memory-mcp"]')).not.toBeInTheDocument();
  });
});
