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

// Beta requests go to Netlify only. Their notification goes to the NanoAI inbox, and the form asks the visitor to
// email that inbox instead when delivery fails, so there is no third-party fallback holding PC details.
export async function submitNanoAiBetaRequest(payload: NanoAiBetaRequest, fetcher: typeof fetch = fetch) {
  if (payload['bot-field']) return;
  const response = await fetcher('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeNanoAiBetaRequest(payload).toString(),
  });
  if (!response.ok) throw new Error('Beta request delivery failed');
}
