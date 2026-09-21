import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ProjectInquiryForm from './ProjectInquiryForm';

async function completeForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
  await user.type(screen.getByLabelText('Work email'), 'ada@example.com');
  await user.type(screen.getByLabelText('Company (optional)'), 'Analytical Engines');
  await user.selectOptions(screen.getByLabelText('Project category'), 'Metacognitive or agentic AI');
  await user.type(
    screen.getByLabelText('Project description'),
    'Build a private autonomous research system.',
  );
  return user;
}

describe('ProjectInquiryForm', () => {
  it('associates every visible label with a form control', () => {
    render(<ProjectInquiryForm />);
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Work email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Company (optional)')).not.toBeRequired();
    expect(screen.getByLabelText('Project category')).toBeRequired();
    expect(screen.getByLabelText('Project description')).toBeRequired();
  });

  it('does not call delivery for an invalid empty form', async () => {
    const submit = vi.fn().mockResolvedValue(undefined);
    render(<ProjectInquiryForm submit={submit} />);
    await userEvent.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    expect(submit).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Name')).toBeInvalid();
  });

  it('allows only one delivery while a request is pending', async () => {
    let resolveDelivery!: () => void;
    const submit = vi.fn(() => new Promise<void>((resolve) => { resolveDelivery = resolve; }));
    render(<ProjectInquiryForm submit={submit} />);
    const user = await completeForm();
    await user.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    const pendingButton = screen.getByRole('button', { name: 'Sending…' });
    expect(pendingButton).toBeDisabled();
    await user.click(pendingButton);
    expect(submit).toHaveBeenCalledTimes(1);
    resolveDelivery();
  });

  it('shows confirmed success and clears visitor-entered values', async () => {
    const submit = vi.fn().mockResolvedValue(undefined);
    render(<ProjectInquiryForm submit={submit} />);
    const user = await completeForm();
    await user.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    expect(await screen.findByText('Project inquiry received')).toBeVisible();
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Work email')).toHaveValue('');
    expect(screen.getByLabelText('Project description')).toHaveValue('');
  });

  it('preserves the complete draft and provides recovery after a failed request', async () => {
    const submit = vi.fn().mockRejectedValue(new Error('offline'));
    render(<ProjectInquiryForm submit={submit} />);
    const user = await completeForm();
    await user.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    expect(
      await screen.findByText(
        'We could not deliver your inquiry. Your information is still here—retry or email us directly.',
      ),
    ).toBeVisible();
    expect(screen.getByLabelText('Name')).toHaveValue('Ada Lovelace');
    expect(screen.getByLabelText('Work email')).toHaveValue('ada@example.com');
    expect(screen.getByLabelText('Company (optional)')).toHaveValue('Analytical Engines');
    expect(screen.getByLabelText('Project category')).toHaveValue('Metacognitive or agentic AI');
    expect(screen.getByLabelText('Project description')).toHaveValue(
      'Build a private autonomous research system.',
    );
    expect(screen.getAllByRole('link', { name: /@omega2ai\.com/ })).toHaveLength(1);
  });
});
