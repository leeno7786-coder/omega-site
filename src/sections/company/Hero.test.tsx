import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('leads with metacognitive AI and broadens the company offering', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /think beyond the prompt/i })).toBeVisible();
    expect(screen.getByText(/custom runtimes, applications, Linux systems, and hardware/i)).toBeVisible();
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '#project-inquiry');
    expect(screen.getByRole('link', { name: 'See Omega 3.0 proof' })).toHaveAttribute('href', '/omega-3/');
  });
});
