# Omega AI Founder and Selected Systems Expansion

**Status:** Approved design
**Date:** 2026-08-09  
**Project:** `omega-site`

## 1. Purpose

Expand the Omega AI company site so prospective clients can see both who will perform the work and what that person has already built.

The homepage will present Noah Lee as Omega AI's primary public-facing technical lead and hands-on creator. It will also add a selected-systems portfolio that proves Omega's breadth beyond Omega 3.0 without presenting private or completed client work.

This design extends, rather than replaces, the approved Cognitive Engineering Lab direction in the original company-site redesign.

## 2. Goals

- Make it clear that clients work directly with Noah Lee from architecture through delivery.
- Establish Noah's credibility with a concise, verified technical profile rather than a pasted résumé.
- Demonstrate breadth through working or inspectable systems built by Noah.
- Feature Omega Browser Agent as evidence of local-first autonomous browser engineering.
- Feature DevCard AI as evidence of a live, full-stack SaaS product.
- Preserve Omega 3.0 as the flagship proof of metacognitive systems engineering.
- Keep Mitchell Ray and Larone Williamson visibly credited as co-founders.
- Add LinkedIn and GitHub as prominent identity and verification paths.

## 3. Verified Source Boundaries

Public copy may draw from:

- Noah Lee's supplied 2026 professional résumé.
- Noah's confirmation that he creates the company's technical systems and will perform the client work.
- The public Omega 3.0 repository and its `browser_agent_extension` implementation.
- The live DevCard AI application at `https://www.omega-dev.uk/`.
- Existing public Omega repositories already linked from the site.

The following claims were checked before this design was written:

- Omega Browser Agent is a Manifest V3 Edge extension with a side-panel chat interface, autonomous task planning, streaming steps, browser actions, OCR/visual context, isolated workspace tabs, action confirmations, and local or cloud inference backends.
- Its configured local default identifies a 4B model, while Omega Portable/Ollama and LM Studio are supported local paths and OpenRouter is the optional cloud path.
- The current browser-agent test runner discovered 21 unit and integration test files and all 21 passed on the inspected checkout.
- The extension source is public, but its Edge Add-ons Store documentation still says the store release is coming soon.
- DevCard AI's public page is live and served by Vercel. Its protected dashboard redirects signed-out visitors to Clerk authentication.
- DevCard AI publicly presents GitHub and résumé import, AI-assisted portfolio generation, ten visual themes, customization, and HTML, README, and React/Next.js export paths.

The site must not claim that Omega Browser Agent is already distributed through the Edge store. It must not present unit or integration tests as proof of a public store release or completed end-to-end production certification.

## 4. Homepage Information Architecture

The new homepage order will be:

1. Hero
2. Proof rail
3. Capabilities
4. Omega 3.0 proof
5. Selected systems
6. How we work
7. Company and founder profile
8. Project inquiry

The numbered section labels will update to:

- Hero — `01`
- Capabilities — `02`
- Omega 3.0 — `03`
- Selected systems — `04`
- How we work — `05`
- Company — `06`
- Project inquiry — `07`

## 5. Selected Systems Section

### 5.1 Role on the page

The section will show that Omega 3.0 is part of a wider body of original engineering. It will not resemble a generic project-card grid or imply client endorsements.

Eyebrow:

> Selected systems

Heading direction:

> Different problems. Working systems.

Supporting copy will state that these systems were created by Noah Lee and span autonomous agents, local inference, memory infrastructure, and production software.

### 5.2 Featured system: Omega Browser Agent

Status label:

> Working source · Edge MV3

Approved message direction:

> A chat-style autonomous browser agent built to operate with a local 4B model. It plans tasks, navigates, clicks, types, reads page structure and screenshots, and can expand to cloud models when greater capability is needed.

Evidence labels may include:

- Local-first 4B inference
- Optional OpenRouter cloud models
- Autonomous planning and execution
- Navigate, click, type, scroll, and extract
- Screenshots and OCR
- Isolated multi-tab workspace
- Action confirmation controls

Primary link:

- `View source` → `https://github.com/leeno7786-coder/Omega3.0/tree/main/browser_agent_extension`

The public page will not compare the extension directly with Claude or ChatGPT. The defensible differentiator is its local-first small-model architecture with optional cloud expansion.

### 5.3 Featured system: DevCard AI

Status label:

> Live SaaS product

Approved message direction:

> A full-stack AI application that turns GitHub profiles and résumés into customizable developer portfolios, then exports the result as portable web code and profile assets.

Evidence labels may include:

- Live Vercel deployment
- Next.js application
- Clerk authentication
- Stripe subscription and webhook flow
- AI-assisted profile generation
- Ten visual themes
- HTML, README, and React/Next.js exports

Primary link:

- `Open live app` → `https://www.omega-dev.uk/`

DevCard AI will link to the live application rather than imply that its private application repository is public.

### 5.4 Supporting systems

Three more compact technical entries will sit below the two featured systems:

#### Omega Runtime

Portable, hardware-aware inference infrastructure spanning model discovery, streaming APIs, process supervision, packaged runtimes, and CPU/GPU/NPU execution paths.

- `View source` → `https://github.com/leeno7786-coder/Omega-NPU-Runtime`

#### Omega Memory MCP

Cross-platform persistent-memory infrastructure with typed MCP access, verified recall, graph projections, embeddings, packaging, and acceptance tests.

- `View source` → `https://github.com/leeno7786-coder/omega-memory-mcp`

#### NanoAgent

A local-model coding agent with a chat/TUI workflow, MCP connectivity, concurrent sub-agents, workspace sandboxing, validation, and npm packaging.

- `View source` → `https://github.com/leeno7786-coder/nanoagent`

### 5.5 Visual treatment

- Use two large, asymmetric technical dossiers for Omega Browser Agent and DevCard AI.
- Give each featured system a visible status, short outcome-led description, compact evidence list, and one clear destination.
- Use a restrained three-column or stacked evidence rail for the supporting systems.
- Encode local, cloud-expandable, live, and source-available states with text labels rather than decorative iconography alone.
- Reuse the existing obsidian, graphite, teal, ice-blue, grid, border, and monospaced-label system.
- Avoid screenshots until real, approved product imagery is supplied or captured in a later media pass.

## 6. Founder Profile

### 6.1 Hierarchy

The existing company principles remain. The equal three-card founder presentation will be replaced by:

1. A prominent Noah Lee technical-founder profile.
2. A smaller co-founder credit row for Mitchell Ray and Larone Williamson.

This does not erase the other founders. It communicates that Noah is the primary public-facing engineer and the person responsible for creating and delivering the technical work.

### 6.2 Profile content

Eyebrow:

> The engineer behind the systems

Name and role:

> Noah Lee  
> Founder & Principal Engineer

Lead statement:

> Clients work directly with Noah from technical direction and architecture through implementation, testing, deployment, and support.

Biography direction:

> Noah architects and builds private, local-first AI systems across cognitive control, persistent memory, model orchestration, APIs, product interfaces, Linux deployment, and hardware-aware inference. He created Omega 2.5 and Omega 3.0 and leads the hands-on engineering behind Omega's runtime, agent, memory, browser automation, and full-stack product work.

Credibility lines:

- End-to-end engineering: intelligence → runtime → application → machine
- Creator of Omega 2.5 and Omega 3.0
- Co-inventor and co-filer of U.S. Provisional Patent Application No. 63/965,475
- Bachelor of Science in Cybersecurity in progress; President's List honoree in 2026

Credentials remain supporting evidence. The section will lead with demonstrated engineering and live systems rather than academic chronology or certification logos.

### 6.3 Profile links

- `LinkedIn` → `https://www.linkedin.com/in/noah-lee-omegaai/`
- `GitHub` → `https://github.com/leeno7786-coder`

Both links will use descriptive accessible names and a visible external-link affordance. They may open in a new tab only when paired with `rel="noreferrer"`.

### 6.4 Co-founder credit

The supporting row will read:

- Mitchell Ray — Co-founder
- Larone Williamson — Co-founder

No additional titles, biographies, or responsibility claims will be invented.

### 6.5 Privacy boundaries

The public site will not add:

- Noah's phone number
- A street-level or detailed home location
- A downloadable résumé
- Personal contact details beyond the existing company email
- Unverified customer, partner, revenue, or employment claims

## 7. Structured Data and Identity

The existing Organization JSON-LD will be extended without removing the other founders.

Noah's Person entity will include:

- Name
- `Founder & Principal Engineer` job title
- Relationship to Omega AI LLC
- LinkedIn and GitHub in `sameAs`
- A stable homepage fragment such as `https://omega2ai.com/#noah-lee`

The other co-founders may remain named Person entities without invented job titles or profile URLs.

## 8. Component and Content Boundaries

Implementation will keep content separate from presentation.

Expected content additions:

- `FOUNDER_PROFILE`
- `SELECTED_SYSTEMS`
- A typed `FounderProfile` model
- A typed `SelectedSystem` model supporting featured/supporting variants, status, optional public source, optional live URL, description, and evidence labels

Expected component changes:

- Add `SelectedSystems`
- Expand or compose `CompanyOverview` with a dedicated founder-profile block
- Preserve a compact co-founder list
- Insert `SelectedSystems` into the homepage after `OmegaProofPreview`
- Renumber downstream section labels

No new public route is required for this pass. A dedicated Omega Browser Agent page may be considered later when a store listing, video, or richer media is ready.

## 9. Responsive and Accessible Behavior

- The two featured dossiers sit side by side only when each remains comfortably readable.
- On narrow screens, featured systems stack with status, description, evidence, and action in that order.
- Supporting systems collapse from three columns to one without horizontal scrolling.
- The founder profile becomes a single-column reading sequence on mobile.
- Status meaning is always written in text and never communicated by color alone.
- All external destinations receive descriptive accessible names and visible focus states.
- Heading levels follow the existing semantic page hierarchy.
- Reduced-motion behavior remains static and complete.

## 10. Testing and Verification

Automated checks will cover:

- Selected-system ordering and approved public URLs
- Omega Browser Agent's local-first and optional-cloud wording
- DevCard AI's live-product status and live URL
- Noah's approved role, biography, LinkedIn, and GitHub links
- Preservation of Mitchell Ray and Larone Williamson as co-founders
- Absence of a public phone number or résumé download
- Updated section numbering
- External-link attributes and accessible names
- Organization and Person structured data
- Existing homepage buyer journeys
- TypeScript, lint, unit tests, and production build

Browser verification will cover:

- Desktop and mobile layout
- No horizontal overflow
- Keyboard navigation and focus visibility
- Live external destinations
- DevCard AI's public page
- Browser Agent and supporting repository links
- No regressions to Omega 3.0, inquiry, privacy, or terms paths

## 11. Non-Goals

- Publishing the full résumé
- Adding a founder portrait without an approved source asset
- Claiming completed client work
- Creating fictional case studies, testimonials, or partnerships
- Claiming the Browser Agent is already in the Edge Add-ons Store
- Publishing DevCard AI private source code
- Building a new CMS or portfolio-detail routing system
- Adding placeholder videos before real recordings exist

## 12. Acceptance Criteria

The expansion is ready when:

- A visitor can identify Noah Lee as the hands-on technical lead they will work with.
- Noah's profile communicates full-system engineering without reading like a résumé dump.
- LinkedIn and GitHub are prominent, accurate, and accessible.
- Omega Browser Agent is presented as a working, local-first autonomous browser system with optional cloud expansion and an inspectable source link.
- DevCard AI is presented as a live SaaS product with a functioning live-app link.
- Omega Runtime, Omega Memory MCP, and NanoAgent demonstrate additional engineering breadth.
- Omega 3.0 remains the flagship metacognitive proof rather than becoming one generic card among many.
- Mitchell Ray and Larone Williamson remain visibly credited as co-founders.
- Public claims stay within verified source boundaries.
- The page remains responsive, accessible, performant, and free of horizontal overflow.
