import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

it('registers a separate NanoAI report form with the complete preview and no configurable recipient', () => {
  const html = readFileSync(resolve('public/__nanoai-bug-report.html'), 'utf8');
  const document = new DOMParser().parseFromString(html, 'text/html');
  const form = document.querySelector('form');
  expect(form?.getAttribute('name')).toBe('nanoai-bug-report');
  expect(form?.getAttribute('method')).toBe('POST');
  expect(form?.getAttribute('data-netlify')).toBe('true');
  expect(form?.getAttribute('netlify-honeypot')).toBe('bot-field');
  expect(form?.hasAttribute('action')).toBe(false);
  expect([...document.querySelectorAll('[name]')].map(element => element.getAttribute('name')).sort()).toEqual([
    'area', 'bot-field', 'form-name', 'message', 'nanoai-bug-report', 'reference', 'robots', 'subject',
  ]);
  expect(document.querySelector('input[name="form-name"]')?.getAttribute('value')).toBe('nanoai-bug-report');
  expect(document.querySelector('textarea[name="message"]')).not.toBeNull();
});
