import { describe, expect, it, vi } from 'vitest';
import { encodeProjectInquiry, submitProjectInquiry } from './netlifyForms';

const payload = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  company: 'Analytical Engines',
  category: 'Metacognitive or agentic AI' as const,
  description: 'Build a private autonomous research system.',
  'bot-field': '',
};

describe('Netlify inquiry adapter', () => {
  it('encodes the Netlify form name and every field', () => {
    const body = encodeProjectInquiry(payload);
    expect(body.get('form-name')).toBe('project-inquiry');
    expect(body.get('name')).toBe('Ada Lovelace');
    expect(body.get('email')).toBe('ada@example.com');
    expect(body.get('company')).toBe('Analytical Engines');
    expect(body.get('category')).toBe('Metacognitive or agentic AI');
    expect(body.get('description')).toContain('private autonomous');
    expect(body.get('bot-field')).toBe('');
  });

  it('posts the encoded form to the site root', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('', { status: 200 }));
    await submitProjectInquiry(payload, fetcher);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeProjectInquiry(payload).toString(),
    });
  });

  it('falls back to FormSubmit when Netlify returns 404', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(new Response('', { status: 404 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }));

    await submitProjectInquiry(payload, fetcher);

    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(String(fetcher.mock.calls[1][0])).toContain('formsubmit.co/ajax/');
    expect(fetcher.mock.calls[1][1]).toMatchObject({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    expect(JSON.parse(fetcher.mock.calls[1][1].body as string)).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      _cc: 'mitchellray@omega2ai.com',
      _captcha: 'false',
    });
  });

  it('throws when neither Netlify nor FormSubmit confirms delivery', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(new Response('', { status: 404 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: false, message: 'undeliverable' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }));

    await expect(submitProjectInquiry(payload, fetcher)).rejects.toThrow('Inquiry delivery failed');
  });

  it('does not send a honeypot-filled submission', async () => {
    const fetcher = vi.fn();
    await submitProjectInquiry({ ...payload, 'bot-field': 'spam' }, fetcher);
    expect(fetcher).not.toHaveBeenCalled();
  });
});
