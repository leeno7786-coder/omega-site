import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EngagementProcess from './EngagementProcess';

describe('EngagementProcess', () => {
  it('turns an uncertain difficult problem into four concrete stages', () => {
    render(<EngagementProcess />);
    expect(screen.getByRole('heading', { name: 'Bring us the difficult problem.' })).toBeVisible();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByRole('heading', { name: 'Discover' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Architect' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Build' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Deploy' })).toBeVisible();
  });
});
