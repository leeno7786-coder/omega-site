import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './Home';

describe('Home', () => {
  it('places selected systems after flagship proof and before the process', () => {
    const { container } = render(<Home />);
    const proof = container.querySelector('#proof');
    const systems = container.querySelector('#selected-systems');
    const process = container.querySelector('#process');
    expect(proof).not.toBeNull();
    expect(systems).not.toBeNull();
    expect(process).not.toBeNull();
    expect(proof!.compareDocumentPosition(systems as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(systems!.compareDocumentPosition(process as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('shows the expanded section numbering', () => {
    render(<Home />);
    expect(within(document.querySelector('#selected-systems') as HTMLElement).getByText('04')).toBeVisible();
    expect(within(document.querySelector('#process') as HTMLElement).getByText('05')).toBeVisible();
    expect(within(document.querySelector('#company') as HTMLElement).getByText('06')).toBeVisible();
    expect(within(document.querySelector('#project-inquiry') as HTMLElement).getByText('07')).toBeVisible();
  });
});
