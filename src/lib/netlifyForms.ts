import { CONTACT_EMAILS } from '../content/siteContent';
import type { NanoAiBetaRequest, ProjectInquiryPayload } from '../types/site';

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAILS[0])}`;

export function encodeProjectInquiry(payload: ProjectInquiryPayload) {
  return new URLSearchParams({ 'form-name': 'project-inquiry', ...payload });
}

function encodeFormSubmitInquiry(payload: ProjectInquiryPayload) {
  return JSON.stringify({
    name: payload.name,
    email: payload.email,
    company: payload.company || 'Not specified',
    category: payload.category,
    message: payload.description,
    _replyto: payload.email,
    _subject: `Omega AI inquiry: ${payload.category || 'General'}`,

    _template: 'table',
    _captcha: 'false',
  });
}

function isFormSubmitSuccess(data: { success?: boolean | string }) {
  return data.success === true || data.success === 'true';
}

export async function submitProjectInquiry(
  payload: ProjectInquiryPayload,
  fetcher: typeof fetch = fetch,
) {
  if (payload['bot-field']) return;

  let netlifyOk = false;
  try {
    const netlifyResponse = await fetcher('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeProjectInquiry(payload).toString(),
    });
    netlifyOk = netlifyResponse.ok;
  } catch {
    netlifyOk = false;
  }

  if (netlifyOk) return;

  try {
    const fallbackResponse = await fetcher(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: encodeFormSubmitInquiry(payload),
    });

    const fallbackData = (await fallbackResponse.json().catch(() => ({}))) as {
      success?: boolean | string;
    };

    if (fallbackResponse.ok && isFormSubmitSuccess(fallbackData)) return;
  } catch {
    // Fall through to the shared delivery error.
  }

  throw new Error('Inquiry delivery failed');
}

export function encodeNanoAiBetaRequest(payload: NanoAiBetaRequest) {
  return new URLSearchParams({ 'form-name': 'nanoai-beta', ...payload });
}

// New Netlify form notifications need a paid plan, but the bug-report form already emails nanoai@omega2ai.com. Each
// beta request is filed there too, as a "Beta request" carrying every detail, so it reaches that inbox.
export function encodeNanoAiBetaEmail(payload: NanoAiBetaRequest, reference: string) {
  const message = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || 'Not given'}`,
    `Windows: ${payload.windows}`,
    `Processor: ${payload.processor}`,
    `Graphics: ${payload.graphics}`,
    `Memory: ${payload.memory}`,
    `Free disk space: ${payload.disk}`,
    `Agreed to beta email: ${payload.consent === 'yes' ? 'yes' : 'no'}`,
    '',
    'What they would use NanoAI for:',
    payload.use,
  ].join('\n');
  return new URLSearchParams({
    'form-name': 'nanoai-bug-report',
    reference,
    area: 'Beta request',
    subject: `NanoAI beta request from ${payload.name}`,
    message,
    'bot-field': '',
  });
}

// Beta requests go to Netlify only; there is no third-party fallback holding PC details. When delivery fails, the form
// asks the visitor to email the NanoAI inbox instead.
export async function submitNanoAiBetaRequest(
  payload: NanoAiBetaRequest,
  fetcher: typeof fetch = fetch,
  reference: string = crypto.randomUUID(),
) {
  if (payload['bot-field']) return;
  const post = (body: URLSearchParams) => fetcher('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const response = await post(encodeNanoAiBetaRequest(payload));
  if (!response.ok) throw new Error('Beta request delivery failed');
  // The record above is what counts. A failed copy to the inbox must not make the visitor send the request twice.
  try {
    await post(encodeNanoAiBetaEmail(payload, reference));
  } catch {
    // The request is already recorded in the nanoai-beta form.
  }
}
