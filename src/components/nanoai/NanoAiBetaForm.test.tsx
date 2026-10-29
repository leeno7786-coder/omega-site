import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { encodeNanoAiBetaRequest, submitNanoAiBetaRequest } from '../../lib/netlifyForms';
import NanoAiBetaForm from './NanoAiBetaForm';

async function completeForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
  await user.type(screen.getByLabelText('Email'), 'ada@example.com');
  await user.type(screen.getByLabelText('What would you use NanoAI for?'), 'Run my shop inbox and calendar.');
  await user.selectOptions(screen.getByLabelText('Windows version'), 'Windows 11');
  await user.selectOptions(screen.getByLabelText('Memory (RAM)'), '32 GB');
  await user.type(screen.getByLabelText('Processor'), 'AMD Ryzen 7 7840HS');
  await user.type(screen.getByLabelText('Graphics'), 'AMD Radeon 780M');
  await user.selectOptions(screen.getByLabelText('Free disk space'), '50–100 GB');
  await user.click(screen.getByLabelText(/Omega AI may email me about the NanoAI beta/));
  return user;
}

describe('NanoAiBetaForm', () => {
  it('requires the contact, use and PC details, and consent', () => {
    render(<NanoAiBetaForm />);
    for (const label of ['Name', 'Email', 'What would you use NanoAI for?', 'Windows version', 'Memory (RAM)', 'Processor', 'Graphics', 'Free disk space']) {
      expect(screen.getByLabelText(label)).toBeRequired();
    }
    expect(screen.getByLabelText('Company (optional)')).not.toBeRequired();
    expect(screen.getByLabelText(/Omega AI may email me about the NanoAI beta/)).toBeRequired();
    expect(screen.getByRole('link', { name: 'NanoAI privacy policy' })).toHaveAttribute('href', '/nanoai/privacy/');
  });

  it('does not send an incomplete form', async () => {
    const submit = vi.fn().mockResolvedValue(undefined);
    render(<NanoAiBetaForm submit={submit} />);
    await userEvent.click(screen.getByRole('button', { name: 'Request a beta place' }));
    expect(submit).not.toHaveBeenCalled();
  });

  it('sends every detail once, confirms and clears the form', async () => {
    const submit = vi.fn().mockResolvedValue(undefined);
    render(<NanoAiBetaForm submit={submit} />);
    const user = await completeForm();
    await user.click(screen.getByRole('button', { name: 'Request a beta place' }));
    expect(await screen.findByText('Beta request received')).toBeVisible();
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit.mock.calls[0][0]).toEqual({
      name: 'Ada Lovelace', email: 'ada@example.com', company: '', use: 'Run my shop inbox and calendar.',
      windows: 'Windows 11', processor: 'AMD Ryzen 7 7840HS', graphics: 'AMD Radeon 780M', memory: '32 GB',
      disk: '50–100 GB', consent: 'yes', 'bot-field': '',
    });
    expect(screen.getByLabelText('Processor')).toHaveValue('');
    expect(screen.getByLabelText(/Omega AI may email me about the NanoAI beta/)).not.toBeChecked();
  });

  it('keeps the details and offers the inbox when delivery fails', async () => {
    const submit = vi.fn().mockRejectedValue(new Error('offline'));
    render(<NanoAiBetaForm submit={submit} />);
    const user = await completeForm();
    await user.click(screen.getByRole('button', { name: 'Request a beta place' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('We could not send your request.');
    expect(screen.getByRole('link', { name: 'nanoai@omega2ai.com' })).toHaveAttribute('href', 'mailto:nanoai@omega2ai.com');
    expect(screen.getByLabelText('Processor')).toHaveValue('AMD Ryzen 7 7840HS');
  });
});

describe('Netlify beta request adapter', () => {
  const request = {
    name: 'Ada Lovelace', email: 'ada@example.com', company: '', use: 'Inbox', windows: 'Windows 10',
    processor: 'Intel Core i5-8250U', graphics: 'none', memory: '16 GB', disk: 'Under 20 GB', consent: 'yes', 'bot-field': '',
  };

  it('records the request, then files a copy where the NanoAI inbox is emailed, and fails only when the record fails', async () => {
    expect(encodeNanoAiBetaRequest(request).get('form-name')).toBe('nanoai-beta');
    const fetcher = vi.fn().mockResolvedValue(new Response('', { status: 200 }));
    await submitNanoAiBetaRequest(request, fetcher, 'ref-1');
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[0]).toEqual(['/', expect.objectContaining({ method: 'POST', body: encodeNanoAiBetaRequest(request).toString() })]);
    const copy = new URLSearchParams(fetcher.mock.calls[1][1].body);
    expect(copy.get('form-name')).toBe('nanoai-bug-report');
    expect(copy.get('area')).toBe('Beta request');
    expect(copy.get('reference')).toBe('ref-1');
    expect(copy.get('subject')).toBe('NanoAI beta request from Ada Lovelace');
    for (const detail of ['Email: ada@example.com', 'Windows: Windows 10', 'Processor: Intel Core i5-8250U', 'Graphics: none', 'Memory: 16 GB', 'Free disk space: Under 20 GB', 'Agreed to beta email: yes', 'Inbox'])
      expect(copy.get('message')).toContain(detail);

    const recordFails = vi.fn().mockResolvedValue(new Response('', { status: 404 }));
    await expect(submitNanoAiBetaRequest(request, recordFails)).rejects.toThrow();
    expect(recordFails).toHaveBeenCalledTimes(1);
    const copyFails = vi.fn().mockResolvedValueOnce(new Response('', { status: 200 })).mockRejectedValueOnce(new Error('offline'));
    await expect(submitNanoAiBetaRequest(request, copyFails)).resolves.toBeUndefined();
  });

  it('drops honeypot submissions without sending them', async () => {
    const fetcher = vi.fn();
    await submitNanoAiBetaRequest({ ...request, 'bot-field': 'spam' }, fetcher);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('registers every field for Netlify form detection', () => {
    const html = new DOMParser().parseFromString(readFileSync(resolve('public/__nanoai-beta.html'), 'utf8'), 'text/html');
    const form = html.querySelector('form[name="nanoai-beta"]');
    expect(form).not.toBeNull();
    for (const field of Object.keys(request)) expect(form?.querySelector(`[name="${field}"]`)).not.toBeNull();
  });
});
