# NanoAI bug-report delivery

Status: the owner approved publication, form detection, destination-specific notifications and one labelled verification email on 2026-10-20. Publication and actual inbox delivery must still be verified; do not call this service active from the approval alone.

The static `public/__nanoai-bug-report.html` registers the separate `nanoai-bug-report` Netlify form. Distributed NanoAI installations must never contain SMTP credentials or private Netlify tokens. The report has only its reference, area, subject and reviewed message, plus an empty honeypot. Its destination is configured privately in Netlify, never accepted from the submitting app.

## Activation order

1. With the owner's publication/configuration approval, enable form detection on Netlify project `omega2ai`, then publish this exact tested site build. No plan upgrade or purchase is authorized.
2. Confirm Netlify lists **both** `nanoai-bug-report` and the existing `project-inquiry` form. Enabling detection also activates the existing inquiry form, whose client already tries Netlify before its FormSubmit fallback.
3. Configure form-specific email notifications: `nanoai-bug-report` to `nanoai@omega2ai.com`; preserve project inquiries by configuring `project-inquiry` to `noahlee@omega2ai.com`. Do not create a global notification that mixes these destinations.
4. Connect NanoAI's fixed server-side report transport to `https://omega2ai.com/__nanoai-bug-report.html` using URL-encoded POST fields matching this registration. Retain app session/origin guards, review-before-send, bounded input, duplicate suppression, rate limiting, safe uncertainty handling and the copy/email fallback. Update the visible relay disclosure from FormSubmit to Netlify at the same time.
5. Verify the deployed form registration and actual submission acknowledgement before enabling success in the app. A generic HTTP 200 marketing page is not evidence of acceptance. Verify a clearly labelled, owner-authorized test appears in Netlify's correct form and arrives at the NanoAI inbox. Do not send real customer data during setup.

The prior owner-authorized FormSubmit test timed out without an acknowledgement, and neither activation nor its email has arrived. Its reference is `f8a921a8-802f-44b2-8917-41b771ed7886`; do not automatically resend it or claim that it was delivered. A Netlify verification must use a separately labelled setup test and requires the owner's approval.

## Verification before publication

Run the form-registration and existing inquiry-delivery tests, production build and build-output checks. Inspect `dist/__nanoai-bug-report.html` to ensure the complete registration survives the build. Existing OAuth functions and routes are outside this change.

Netlify setup and notification documentation:

- https://docs.netlify.com/manage/forms/setup/
- https://docs.netlify.com/manage/forms/notifications/

Form processing stores submissions in the site's Netlify account and sends configured email notifications. The app must disclose that route, collect only the reviewed report, and avoid promising inbox arrival from an HTTP acknowledgement alone.
