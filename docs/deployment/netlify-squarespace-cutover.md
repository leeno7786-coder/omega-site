# Omega AI site: Netlify + Squarespace domain cutover

This checklist moves `omega2ai.com` from the current GitHub Pages web hosting to Netlify while leaving the domain registered and managed in Squarespace. Do not remove or replace mail, verification, or unrelated service records.

## 1. Record the current state

- [ ] Export or screenshot the complete Squarespace DNS record set.
- [ ] Record the current apex (`@`) and `www` web records separately as the rollback values.
- [ ] Confirm which MX, SPF, DKIM, DMARC, Google verification, and other non-web records must remain untouched.
- [ ] Confirm the current GitHub Pages deployment and custom-domain configuration still work before cutover.

## 2. Connect the repository to Netlify

- [ ] In Netlify, choose **Add new site → Import an existing project** and connect the GitHub repository `leeno7786-coder/omega-site`.
- [ ] Set the production branch to `main`.
- [ ] Confirm the build command is `npm run build` and the publish directory is `dist` (also declared in `netlify.toml`).
- [ ] Run the first deploy and require the build, unit tests, route checks, bundle budget, and asset budget to pass.
- [ ] Open the unique Netlify deploy-preview URL and test `/`, `/omega-3/`, `/privacy/`, `/terms/`, and `/privacy.html`.

## 3. Verify the inquiry form before DNS changes

- [ ] In the Netlify deploy log or Forms panel, confirm that the `project-inquiry` form was detected.
- [ ] Submit a realistic test inquiry from the deploy-preview URL.
- [ ] Confirm the success state appears only after Netlify accepts the submission.
- [ ] Configure Netlify form submission notifications for both `noahlee@omega2ai.com` and `mitchellray@omega2ai.com`.
- [ ] Confirm both company inboxes receive the test notification and that the full submitted fields are present.
- [ ] Submit one intentionally invalid or interrupted request and confirm the form preserves the draft and shows an error.

## 4. Add and verify the production domain

- [ ] Add `omega2ai.com` as the primary custom domain in Netlify.
- [ ] Add `www.omega2ai.com` as a domain alias and retain the configured permanent redirect to the apex domain.
- [ ] Copy Netlify's exact apex and `www` DNS targets. Do not guess the values; Netlify can change the recommended targets.
- [ ] In Squarespace DNS, change only the existing apex and `www` web-hosting records to the exact Netlify values.
- [ ] Preserve every MX, SPF, DKIM, DMARC, verification, subdomain, and other non-web record exactly.
- [ ] Wait for Netlify to show both the apex and `www` records as verified.
- [ ] Provision the Netlify-managed TLS certificate and wait for HTTPS to be active before announcing the site.

## 5. Production verification

- [ ] Verify `https://omega2ai.com/` loads the company homepage without a redirect loop or mixed content.
- [ ] Verify `https://www.omega2ai.com/` redirects once to `https://omega2ai.com/`.
- [ ] Verify `/omega-3/`, `/privacy/`, `/terms/`, `/favicon.svg`, `/og-image.png`, `/robots.txt`, and `/sitemap.xml` return HTTP 200.
- [ ] Verify `/privacy.html` permanently redirects to `/privacy/`.
- [ ] Check desktop and mobile navigation, keyboard focus, reduced motion, disclosure controls, proof images, inquiry validation, and a real production form submission.
- [ ] Confirm the canonical URLs and social preview image use `https://omega2ai.com/`.
- [ ] Confirm both company inboxes receive the production form test.

## 6. Rollback plan

If the apex, `www`, HTTPS, or form flow fails and cannot be corrected promptly:

1. Restore only the prior Squarespace apex and `www` web records captured in section 1.
2. Leave mail, verification, and all other DNS records unchanged.
3. Re-enable or confirm the prior GitHub Pages custom-domain deployment.
4. Verify the old site and HTTPS are serving again before investigating the Netlify issue offline.

## 7. Retire GitHub Pages after stability

- [ ] Keep GitHub Pages available during DNS propagation and the production observation window.
- [ ] After at least one complete production verification cycle and confirmed form delivery, disable GitHub Pages for this repository.
- [ ] Remove obsolete GitHub Pages domain configuration only after Netlify is stable and the rollback window is closed.
- [ ] Keep this checklist and the captured DNS rollback values with the deployment records.

## 8. Local release verification — August 9, 2026

- [x] `npm run check` passed: ESLint, 13 Vitest files / 24 tests, TypeScript, Vite production build, route checks, metadata checks, sitemap checks, and asset budgets.
- [x] Homepage JavaScript measured 67,089 gzip bytes against the 204,800-byte budget.
- [x] Every production image is below 512,000 bytes; retained proof images range from 29 KB to 121 KB.
- [x] `npm run test:e2e` passed 34 desktop/mobile Playwright checks covering buyer journeys, direct routes, successful and failed form behavior, six viewport widths, axe analysis, keyboard focus, skip navigation, and reduced motion.
- [x] `npm audit --omit=dev` reported zero production vulnerabilities.
- [x] Local production preview returned the correct Privacy and Terms documents on their direct routes.
- [x] The generated 1200 × 630 Open Graph card was visually inspected and is 51,497 bytes.
- [x] No Squarespace DNS records were changed during implementation or local verification.

## 9. Netlify deploy-preview verification — pending

These checks require the branch to be published and connected to Netlify. Record the deploy URL and results here before authorizing any production DNS change.

- [ ] Deploy-preview URL:
- [ ] Real non-sensitive form delivery reaches both company email notifications.
- [ ] Preview Lighthouse performance, accessibility, best-practices, and SEO scores are recorded.
- [ ] Netlify custom 404 behavior is verified.
- [ ] Browser console is free of errors on `/`, `/omega-3/`, `/privacy/`, and `/terms/`.
- [ ] Metadata and the social card pass a public share-preview inspection.
- [ ] Direct proof and legal routes return their intended documents.
- [ ] Mobile widths and at least one physical mobile device pass a smoke test.
