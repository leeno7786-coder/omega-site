import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Capabilities from './Capabilities';

describe('Capabilities', () => {
  it('shows the four approved capability families and complete-system flow', () => {
    render(<Capabilities />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { name: 'Metacognitive & agentic AI' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Custom AI runtimes' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Applications & digital products' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Custom computers & integrations' })).toBeVisible();
    expect(screen.getByText('Intelligence → Runtime → Application → Machine')).toBeVisible();
  });
});
