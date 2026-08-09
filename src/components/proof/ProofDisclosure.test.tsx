import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ProofDisclosure from './ProofDisclosure';

describe('ProofDisclosure', () => {
  it('opens dense technical evidence with the native summary control', async () => {
    render(
      <ProofDisclosure id="runtime" title="Runtime" summary="Model and orchestration evidence">
        <p>Thirteen model slots</p>
      </ProofDisclosure>,
    );
    const details = screen.getByText('Runtime').closest('details');
    expect(details).not.toHaveAttribute('open');
    await userEvent.click(screen.getByText('Runtime'));
    expect(details).toHaveAttribute('open');
    expect(screen.getByText('Thirteen model slots')).toBeVisible();
  });

  it('supports evidence that is expanded by default', () => {
    render(
      <ProofDisclosure id="architecture" title="Architecture" summary="Eight cognitive layers" defaultOpen>
        <p>Pressure through DeepSleep</p>
      </ProofDisclosure>,
    );
    expect(screen.getByText('Architecture').closest('details')).toHaveAttribute('open');
  });
});
