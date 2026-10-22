import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ProjectInquiryForm from './ProjectInquiryForm';

function installConversionSnippet(gtag = vi.fn()) {
  const html = new DOMParser().parseFromString(readFileSync(resolve('index.html'), 'utf8'), 'text/html');
  const snippets = [...html.head.querySelectorAll('script')]
    .filter((script) => script.textContent.includes('function gtag_report_conversion('));
  expect(snippets).toHaveLength(1);
  expect(snippets[0].previousElementSibling?.textContent).toContain("gtag('config', 'AW-18531956530')");
  const reportConversion = new Function('gtag', `${snippets[0].textContent}; return gtag_report_conversion;`)(gtag);
  vi.stubGlobal('gtag_report_conversion', reportConversion);
  expect(gtag).not.toHaveBeenCalled();
  return gtag;
}

afterEach(() => vi.unstubAllGlobals());

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
    const gtag = installConversionSnippet();
    const submit = vi.fn().mockResolvedValue(undefined);
    render(<ProjectInquiryForm submit={submit} />);
    await userEvent.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    expect(submit).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Name')).toBeInvalid();
    expect(gtag).not.toHaveBeenCalled();
  });

  it('allows only one delivery while a request is pending', async () => {
    const gtag = installConversionSnippet();
    let resolveDelivery!: () => void;
    const submit = vi.fn(() => new Promise<void>((resolve) => { resolveDelivery = resolve; }));
    render(<ProjectInquiryForm submit={submit} />);
    const user = await completeForm();
    await user.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    const pendingButton = screen.getByRole('button', { name: 'Sending…' });
    expect(pendingButton).toBeDisabled();
    await user.click(pendingButton);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(gtag).not.toHaveBeenCalled();
    resolveDelivery();
    expect(await screen.findByText('Project inquiry received')).toBeVisible();
    expect(gtag).toHaveBeenCalledTimes(1);
  });

  it('shows confirmed success and clears visitor-entered values', async () => {
    const gtag = installConversionSnippet();
    const submit = vi.fn().mockResolvedValue(undefined);
    render(<ProjectInquiryForm submit={submit} />);
    const user = await completeForm();
    await user.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    expect(await screen.findByText('Project inquiry received')).toBeVisible();
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Work email')).toHaveValue('');
    expect(screen.getByLabelText('Project description')).toHaveValue('');
    expect(gtag).toHaveBeenCalledExactlyOnceWith('event', 'conversion', {
      send_to: 'AW-18531956530/R2gmCPy1qaYdELLu3IRF',
      event_callback: expect.any(Function),
    });
  });

  it('preserves the complete draft and provides recovery after a failed request', async () => {
    const gtag = installConversionSnippet();
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
    expect(gtag).not.toHaveBeenCalled();
  });

  it('does not report a lead when the honeypot is filled', async () => {
    const gtag = installConversionSnippet();
    render(<ProjectInquiryForm submit={vi.fn().mockResolvedValue(undefined)} />);
    const user = await completeForm();
    fireEvent.change(screen.getByLabelText('Do not fill this out'), { target: { value: 'spam' } });
    await user.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    expect(await screen.findByText('Project inquiry received')).toBeVisible();
    expect(gtag).not.toHaveBeenCalled();
  });

  it('keeps successful delivery confirmed when conversion reporting fails', async () => {
    const gtag = installConversionSnippet(vi.fn(() => { throw new Error('Tracking unavailable'); }));
    render(<ProjectInquiryForm submit={vi.fn().mockResolvedValue(undefined)} />);
    const user = await completeForm();
    await user.click(screen.getByRole('button', { name: 'Send project inquiry' }));
    expect(await screen.findByText('Project inquiry received')).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(gtag).toHaveBeenCalledTimes(1);
  });
});
