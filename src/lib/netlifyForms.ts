import type { ProjectInquiryPayload } from '../types/site';

export function encodeProjectInquiry(payload: ProjectInquiryPayload) {
  return new URLSearchParams({ 'form-name': 'project-inquiry', ...payload });
}

export async function submitProjectInquiry(
  payload: ProjectInquiryPayload,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeProjectInquiry(payload).toString(),
  });

  if (!response.ok) throw new Error('Inquiry delivery failed');
}
