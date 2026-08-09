# Omega AI LLC Company Site Redesign

**Status:** Approved design

**Date:** 2026-08-09
**Project:** `omega-site`

## 1. Purpose

Redesign the existing Omega AI LLC website from a dense Omega 3.0 product showcase into a professional company website for custom technology and AI engineering work.

Omega 3.0 remains the flagship proof of capability. It no longer defines the entire company or dominates the primary buyer journey.

The redesigned site must make visitors understand two things quickly:

1. Omega's defining expertise is metacognitive autonomous AI.
2. Omega can deliver the complete system around that intelligence, including custom AI runtimes, agentic systems, web products, Android applications, Linux support, custom computers, hardware-aware optimization, and deployment.

## 2. Current Problems

The existing site has strong technical material but presents it as a five-panel product console. This creates several business and usability problems:

- The company reads primarily as a pitch for Omega 3.0.
- The primary value proposition appears after duplicate navigation and a large panel banner.
- Cross-panel calls to action target sections that are not mounted and therefore do not complete the promised navigation.
- The contact form opens a `mailto:` URL and displays success without confirming delivery.
- Mobile navigation and the GitHub Sponsor embed create horizontal overflow.
- Constant particles, shimmer, floating text, glass panels, scan lines, and 3D effects compete with the content.
- The Products panel is excessively long and forces general buyers through deep technical material.
- The live site lacks complete sharing metadata, structured data, and a clear semantic heading structure.
- The production bundle is heavy, linting is not configured for ESLint 9, and a direct React Router dependency has an audited advisory.

## 3. Positioning

### Brand thesis

Omega AI LLC is a cognitive engineering company that builds original autonomous intelligence and the complete technology systems required to deploy it.

### Primary message

> We build AI systems that think beyond the prompt.

### Supporting message

> Omega AI engineers autonomous intelligence—and the custom runtimes, applications, Linux systems, and hardware it needs to operate in the real world.

### Brand perception

Visitors should perceive Omega's work as unique, technically serious, and different from conventional AI consultancies. The site must demonstrate that difference with working evidence instead of relying on futuristic language or decorative effects.

### Audience

The site is intentionally broad. It should be understandable to individuals, startups, established companies, research teams, and organizations with difficult technology problems. The information architecture is organized by capabilities and problems rather than by one narrow industry persona.

### Conversion goal

The primary conversion is a qualified project inquiry. Visitors do not need to know the exact service category before contacting Omega. The inquiry flow should invite them to describe an idea, goal, operational constraint, or difficult technical problem.

## 4. Approved Visual Direction

The approved direction is **Cognitive Engineering Lab**.

It is quiet, precise, advanced, and evidence-led. It should feel like a small research and engineering organization capable of building systems that larger generalist firms cannot.

### Visual principles

- Use an obsidian and graphite foundation with restrained ice-blue and teal signals.
- Use high-contrast, disciplined typography with a characterful display treatment and highly readable body copy.
- Use borders, labels, diagrams, and metrics only when they encode real information.
- Spend visual boldness on one signature cognitive-system motif.
- Avoid generic glassmorphism, decorative gradient overload, neon card grids, and continuous motion on every element.
- Use generous whitespace and a clear type scale so the company feels established rather than experimental for its own sake.

### Initial token direction

- `Obsidian`: `#071019`
- `Graphite`: `#0A1621`
- `Deep panel`: `#0C1B25`
- `Ice`: `#DFFBFF`
- `Signal teal`: `#5EEAD4`
- `Signal blue`: `#7DD3FC`
- `Muted steel`: `#8098A8`
- `Structural border`: `#193A4B`

Final contrast values may be adjusted during implementation to meet WCAG AA.

### Signature element

A restrained cognitive-orbit or system-topology visualization supports the hero and Omega 3.0 proof. It must be lightweight, purposeful, and quiet. It should not become another full-screen particle background.

## 5. Site Architecture

The marketing site will use a small Vite multi-page structure rather than a client-side panel router.

### Public URLs

- `/` — company homepage
- `/omega-3/` — dedicated technical proof and demonstration page
- `/privacy/` — privacy policy
- `/terms/` — terms of service

The homepage contains the complete company pitch. The Omega 3.0 page contains the deep technical material that is valuable to technical evaluators but too dense for the primary buyer journey.

### Technical approach

- Retain React 19, TypeScript, Vite, and Tailwind CSS.
- Configure Vite with separate HTML entry points for the homepage and Omega 3.0 proof page.
- Remove the five-panel state machine, panel dock, keyboard panel shortcuts, and hash-based panel routing.
- Remove the unused React Router dependency instead of carrying it forward.
- Keep privacy and terms as crawlable static pages, updated to match the new visual system.
- Ensure privacy and terms links exist in initial HTML, not only after JavaScript execution, to preserve legal and OAuth verification requirements.
- Keep content data separate from presentation components so metrics, services, founders, links, and proof items can be maintained without editing layout code.

### Component boundaries

Homepage components:

- `SiteHeader`
- `Hero`
- `ProofRail`
- `Capabilities`
- `OmegaProofPreview`
- `EngagementProcess`
- `CompanyOverview`
- `FounderList`
- `ProjectInquiryForm`

The legal footer is static markup placed outside the React root in each HTML entry and styled by shared CSS. React must not be the sole source of privacy and terms anchors.

Omega 3.0 proof components:

- `ProofHero`
- `ArchitectureDiagram`
- `ValidatedMetrics`
- `AutonomousBehaviorDemo`
- `MemoryAndRuntimeEvidence`
- `RepositoryLinks`
- `MediaGallery`
- `TechnicalDisclosures`

Each component must own one content responsibility and expose a small, typed props interface. Shared data types belong in `src/data` or `src/content`; layout and animation logic stay inside their consuming components.

## 6. Homepage Content Design

### 6.1 Header

The header contains:

- Omega AI LLC identity
- Capabilities
- Omega 3.0
- How we work
- Company
- Primary `Start a project` action

Desktop navigation is one row. Mobile uses an accessible menu rather than a horizontally scrolling segmented control.

### 6.2 Hero

Eyebrow:

> Metacognitive systems engineering

Headline:

> We build AI systems that think beyond the prompt.

Supporting copy introduces the broader company immediately:

> Omega AI engineers autonomous intelligence—and the custom runtimes, applications, Linux systems, and hardware it needs to operate in the real world.

Primary action:

> Start a project

Secondary action:

> See Omega 3.0 proof

The primary action scrolls to the real inquiry form. The secondary action navigates to `/omega-3/`.

### 6.3 Proof rail

The hero is followed by a compact proof rail. Initial proof items are:

- 13 specialized models orchestrated
- 8 GB validated runtime footprint
- Zero required cloud calls for the validated local architecture
- Linux support available

Every metric must be traceable to the existing score and architecture material. Detailed pages must preserve model, hardware, trial, and benchmark qualifiers. Marketing shorthand must never convert a conditional result into a universal claim.

### 6.4 Capability families

Capabilities are grouped into four families to communicate breadth without becoming an unstructured catalog.

#### Metacognitive and agentic AI

- Autonomous cognitive systems
- Agent orchestration
- Persistent memory
- Self-evaluation and metacognition
- Multi-agent workflows
- AI automation

#### Custom AI runtimes

- Local and private inference
- Edge AI
- Linux deployment and support
- Model orchestration
- Hardware-aware optimization
- GPU and NPU integration

#### Applications and digital products

- Professional websites
- Web applications and platforms
- Android applications
- Dashboards and operator interfaces
- APIs and integrations
- Workflow automation

#### Custom computers and integrations

- Purpose-built computers
- Linux system configuration
- Hardware integration
- GPU/NPU-focused systems
- Complete deployment and system tuning
- Software-to-hardware integration

The capability section includes a simple information flow:

`Intelligence → Runtime → Application → Machine`

This communicates that Omega can own the whole system while still accepting projects that need only one layer.

### 6.5 Omega 3.0 proof preview

The homepage frames Omega 3.0 as a working proof of multidisciplinary capability.

It should state clearly:

> Omega 3.0 is not the only thing the company sells. It is the working system that demonstrates our ability to solve cognition, runtime, interface, operating-system, and hardware constraints together.

The homepage shows:

- A restrained architecture visualization
- The strongest validated metrics
- Direct links to architecture, benchmarks, repositories, screenshots, and the technical proof page
- A reserved media slot that remains absent until a real video is available; no placeholder video is shown publicly

When the LongMemEval-S score appears, it must read `86.4% headline LongMemEval-S (mistral-large)` rather than an unqualified `86.4%`. Local-model evidence must separately state `up to 78.0% with a local 4B model` and include the existing trial context on the proof page.

Model tables, full benchmark histories, long demos, memory graphs, and detailed architecture layers move to `/omega-3/`.

### 6.6 Engagement process

The process is:

1. **Discover** — define goals, constraints, users, data, environment, hardware, and success criteria.
2. **Architect** — design intelligence, runtime, application, infrastructure, and deployment.
3. **Build** — deliver focused milestones, working demonstrations, testing, and transparent progress.
4. **Deploy** — launch, document, train, optimize, and support.

The section invites visitors to bring Omega the difficult problem even when they do not know the technical solution.

### 6.7 Company and founders

Company positioning:

> Research-minded. Deployment-ready.

The company section explains that Omega takes on work that does not fit an off-the-shelf product and combines autonomous AI research with software, Linux, hardware, and product development.

The founder list names:

- Noah Lee — Co-founder
- Mitchell Ray — Co-founder
- Larone Williamson — Co-founder

No unverified titles, biographies, credentials, partnerships, client logos, or client outcomes are invented. Founder portraits may be added later when real approved assets are available. Until then, use a restrained typographic treatment.

### 6.8 Project inquiry

Heading:

> What are you trying to build?

The form requests:

- Name
- Email
- Company or organization, optional
- General project category
- Project, goal, or problem description

Project category values are:

- Metacognitive or agentic AI
- Custom AI runtime, local AI, or edge AI
- Website, web application, or Android application
- Custom computer, Linux, or hardware integration
- Unsure or another type of project

Direct email links remain available for Noah Lee and Mitchell Ray.

### 6.9 Footer

The footer contains company identity, concise navigation, privacy, terms, direct contact, copyright, and location.

Remove:

- GitHub Sponsor button and 600-pixel Sponsor card
- The large pricing and patent disclaimer wall
- Duplicate panel navigation

Required legal and benchmark qualifiers move to the relevant proof content and legal pages.

## 7. Inquiry Data Flow and Error Handling

Netlify Forms is the approved submission mechanism.

### Static detection

Because the visible form is React-rendered, the corresponding form definition must exist in initial deploy HTML with matching field names and `data-netlify="true"`. The form includes:

- A stable form name
- `form-name` in the submitted payload
- A honeypot field
- No file uploads in the initial release

### Submission flow

1. The visitor completes the visible React form.
2. Client validation checks required fields and email format.
3. The form submits URL-encoded data to the Netlify endpoint.
4. The UI enters a submitting state and prevents duplicate submission.
5. A success state is shown only after a successful HTTP response.
6. Netlify stores the verified submission and sends configured email notifications.

### Failure behavior

- Preserve every field value on failure.
- Display a specific inline error with a retry action.
- Keep both direct email addresses visible as a fallback.
- Do not display an apology-only or ambiguous message.
- Do not claim an inquiry was delivered when only an email client was opened.
- Log no sensitive form contents to the browser console.

### Spam and privacy

- Use Netlify spam filtering and a honeypot.
- Do not request sensitive personal, financial, medical, classified, or regulated information through the initial form.
- Update the privacy policy to disclose form submission processing and retention.

## 8. Motion and Interaction

- Use one controlled hero/proof visualization.
- Use subtle reveal motion only where it clarifies hierarchy.
- Remove constant floating headline motion, shimmer on every card, dramatic hover lifts, scan lines, and rotating gradient borders.
- All content and controls remain usable with JavaScript motion disabled.
- Respect `prefers-reduced-motion` and provide a static equivalent.
- Hover styles never carry essential information.
- All controls have visible keyboard focus.

## 9. SEO and Sharing

Each public page must include:

- Unique title and description
- Canonical URL
- Open Graph title, description, image, type, and URL
- Twitter card metadata
- Favicon and web manifest as appropriate
- One primary `h1`
- Semantic landmarks and heading hierarchy

The homepage includes Organization JSON-LD using only verified company facts. The sitemap lists real page URLs and excludes fragment-only entries. `robots.txt` references the production sitemap.

## 10. Accessibility

- Meet WCAG 2.2 AA color contrast for text and controls.
- Associate every form label with its control.
- Provide descriptive link and button names.
- Ensure mobile navigation is keyboard and screen-reader operable.
- Avoid horizontal page overflow at supported viewport widths.
- Provide text alternatives for architecture diagrams and images.
- Make accordions and disclosures accessible with correct state attributes.
- Keep legal links visible and keyboard reachable.

## 11. Performance

### Required improvements

- Remove the full-screen Three.js neural constellation from the company homepage.
- Remove GSAP where CSS or no animation provides the same value.
- Code-split Omega 3.0 proof interactions from the homepage.
- Convert large PNG assets to appropriately sized WebP or AVIF variants.
- Lazy-load below-the-fold media.
- Remove unused Radix packages and other dependencies after component inventory.
- Remove React Router if the approved multi-page build makes it unnecessary.

### Targets

- No individual marketing image above 500 KB unless a documented visual requirement justifies it.
- No horizontal overflow at 320, 375, 390, 768, 1024, or 1440 pixel widths.
- Initial homepage JavaScript target below 200 KB gzip.
- Lighthouse targets of at least 90 for Performance, Accessibility, Best Practices, and SEO on the production preview, with any exception documented before launch.
- Stable layout with no intentionally delayed content that shifts primary controls.

## 12. Hosting and Deployment

### Approved platform

- Domain registration and DNS management remain in Squarespace.
- Website hosting, form handling, SSL, and deploy previews move to Netlify.
- The GitHub repository remains the source of truth.
- Netlify builds the production site from `main` with `npm run build` and publishes `dist`.
- The canonical production origin is `https://omega2ai.com`; `https://www.omega2ai.com` redirects permanently to the apex domain.

### Cutover

1. Create and verify the Netlify project on its preview domain.
2. Configure build command and output directory.
3. Enable Netlify form detection and configure notifications to `noahlee@omega2ai.com` and `mitchellray@omega2ai.com`.
4. Test desktop, mobile, legal routes, form delivery, and redirects on the preview deployment.
5. Add the production domain to Netlify.
6. Update only the required web-hosting A/CNAME records in Squarespace.
7. Preserve existing MX, SPF, DKIM, DMARC, and other email-related records.
8. Verify apex and `www` behavior, SSL, redirects, canonical URLs, and form delivery.
9. Retire the GitHub Pages deployment only after the Netlify production domain is confirmed.

This sequence keeps the existing site live until the replacement is validated.

## 13. Testing and Verification

### Automated checks

- TypeScript build
- ESLint 9 flat configuration
- Production Vite build
- Unit and component tests for navigation, disclosure controls, proof data, and form states
- Browser tests for critical buyer journeys

### Browser coverage

Verify at minimum:

- Homepage loads at the top with hero and primary action visible.
- All header links reach the correct content or page.
- `Start a project` reaches the inquiry form.
- `See Omega 3.0 proof` reaches `/omega-3/`.
- Form validation, submission, duplicate prevention, success, and failure states work.
- Failed submissions retain visitor input.
- Privacy and terms routes load directly.
- Mobile menu exposes every primary destination.
- No tested viewport has horizontal page overflow.
- Keyboard users can traverse the full site with visible focus.
- Reduced-motion mode removes nonessential motion.

### Launch checks

- Verify Netlify notification delivery with a real non-sensitive test inquiry.
- Confirm custom-domain SSL and apex/`www` redirects.
- Confirm Squarespace email DNS records remain intact.
- Run Lighthouse on the deployed production preview.
- Inspect browser console for errors and deprecated runtime warnings.
- Validate sitemap, robots, canonical, Open Graph, and structured data output.
- Run `npm audit` and resolve or document production advisories before launch.

## 14. Reuse Plan

Reuse and rewrite existing material rather than discarding the technical work.

### Reuse on the homepage

- Strongest validated metrics
- Concise company description
- Four service themes
- Four-stage engagement process
- Founder names and direct contact information

### Reuse on `/omega-3/`

- Architecture overview and deep dive
- Autonomous behavior demonstration
- Memory graph
- Model runtime details
- Benchmarks and score sources
- Agent layer
- Image generation evidence
- Portability information updated for current Linux support
- Repository and project links

### Remove or replace

- Five-panel navigation system
- Panel banner and panel dock
- Full-screen particle constellation
- Always-running shimmer and floating effects
- GitHub Sponsor embeds
- Obsolete sitemap fragments
- Mailto-only form submission behavior

## 15. Non-Goals for Initial Redesign

- Customer accounts or authentication
- A content management system
- E-commerce or self-service purchasing
- Public client work or invented case studies
- A public video placeholder before real videos exist
- A blog or publishing platform
- Rebuilding Omega 3.0 itself
- Adding unrelated backend services beyond reliable form handling

## 16. Acceptance Criteria

The redesign is ready for production when:

- A new visitor can identify Omega as a custom AI and technology engineering company within ten seconds.
- Metacognitive autonomous AI is the lead expertise without making the company appear to sell only Omega 3.0.
- The four capability families are visible and understandable.
- Omega 3.0 is presented as working evidence with accurate qualifiers.
- All calls to action reach functioning destinations.
- The project inquiry form confirms real delivery and handles failure accurately.
- The site is responsive without horizontal overflow.
- Legal links are visible and crawlable.
- Accessibility, build, lint, browser, metadata, and production-preview checks pass.
- The Squarespace-managed domain serves the verified Netlify deployment without disrupting domain email.
