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
    expect(fetcher).toHaveBeenCalledWith('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeProjectInquiry(payload).toString(),
    });
  });

  it('throws when delivery is not confirmed', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('', { status: 500 }));
    await expect(submitProjectInquiry(payload, fetcher)).rejects.toThrow('Inquiry delivery failed');
  });
});
