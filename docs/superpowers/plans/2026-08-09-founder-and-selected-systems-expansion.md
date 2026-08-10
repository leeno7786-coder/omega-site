# Founder and Selected Systems Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a verified selected-systems portfolio and a prominent Noah Lee technical-founder profile to the Omega AI homepage.

**Architecture:** Keep all public claims in the existing typed content module, render them through two focused React components, and integrate those components into the current static Vite homepage. Extend the existing CSS visual system and static Organization JSON-LD without adding routes, dependencies, client-work claims, or unapproved media.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Vitest, Testing Library, Playwright, Axe, static HTML JSON-LD, CSS.

## Global Constraints

- Canonical production origin remains `https://omega2ai.com`.
- Preserve Omega 3.0 as the flagship proof; do not reduce it to a generic portfolio card.
- Use only the approved résumé facts, user confirmations, live DevCard AI page, and inspected public repositories.
- Do not claim Omega Browser Agent is already distributed through the Edge Add-ons Store.
- Present DevCard AI as a live SaaS product and link to `https://www.omega-dev.uk/`; do not imply its private source is public.
- Do not add Noah's phone number, detailed home location, downloadable résumé, completed client work, testimonials, revenue claims, or partner claims.
- Keep Mitchell Ray and Larone Williamson visibly credited as co-founders without invented responsibilities or titles.
- Use the existing obsidian, graphite, ice-blue, teal, grid, border, and monospaced-label visual system.
- Do not add a new route, CMS, runtime dependency, placeholder video, founder portrait, or product screenshot.
- Maintain WCAG 2.2 AA behavior, visible focus, reduced-motion support, and zero horizontal overflow at 320, 375, 390, 768, 1024, and 1440 pixels.
- Keep homepage JavaScript below the existing 204800-byte gzip budget and marketing images below the existing 512000-byte limit.

---

## File Structure

- `src/types/site.ts` — add the stable `FounderProfile`, `CoFounder`, `SelectedSystem`, and supporting link/tier types.
- `src/content/siteContent.ts` — own every approved founder, social-link, selected-system, status, evidence, and destination value.
- `src/content/siteContent.test.ts` — lock public ordering, links, status wording, founder hierarchy, and privacy boundaries.
- `src/sections/company/SelectedSystems.tsx` — render featured and supporting systems from typed content.
- `src/sections/company/SelectedSystems.test.tsx` — verify content hierarchy, truthful statuses, external destinations, and link safety.
- `src/sections/company/FounderProfile.tsx` — render Noah's primary technical profile and the compact co-founder credit.
- `src/sections/company/FounderProfile.test.tsx` — verify role, credentials, identity links, co-founders, and omitted private data.
- `src/sections/company/CompanyOverview.tsx` — compose the existing company principles with `FounderProfile`.
- `src/sections/company/CompanyOverview.test.tsx` — verify the updated company hierarchy.
- `src/pages/Home.tsx` — insert selected systems after the Omega 3.0 proof.
- `src/pages/Home.test.tsx` — lock section order and visible numbering.
- `src/sections/company/EngagementProcess.tsx` — renumber How we work to `05`.
- `src/sections/company/CompanyOverview.tsx` — renumber Company to `06`.
- `src/sections/company/ProjectInquiryForm.tsx` — renumber Project inquiry to `07`.
- `index.html` — enrich the Organization founder JSON-LD with Noah's Person identity and `sameAs` links.
- `src/content/identityMetadata.test.ts` — parse the static JSON-LD and verify all three founders plus Noah's public identity.
- `src/index.css` — style the new system dossiers, supporting-system rail, founder profile, and responsive layouts; remove unused equal-founder-card styles.
- `tests/e2e/company-site.spec.ts` — verify the expanded buyer journey and public destinations.
- `tests/e2e/accessibility.spec.ts` — verify responsive dossier layout in addition to existing overflow and accessibility checks.

---

### Task 1: Add typed founder and selected-system content

**Files:**
- Modify: `src/types/site.ts`
- Modify: `src/content/siteContent.ts`
- Modify: `src/content/siteContent.test.ts`

**Interfaces:**
- Consumes: existing `siteContent.ts` typed-content pattern.
- Produces: `FOUNDER_PROFILE: FounderProfile`, `COFOUNDERS: readonly CoFounder[]`, and `SELECTED_SYSTEMS: readonly SelectedSystem[]`.

- [ ] **Step 1: Write the failing content-contract test**

Replace the relevant imports and add these assertions in `src/content/siteContent.test.ts`:

```ts
import {
  CAPABILITIES,
  COFOUNDERS,
  FOUNDER_PROFILE,
  HOME_PROOF_METRICS,
  PROCESS_STEPS,
  PROJECT_CATEGORIES,
  SELECTED_SYSTEMS,
  SITE_NAV,
} from './siteContent';

it('keeps the approved founder hierarchy and selected systems', () => {
  expect(FOUNDER_PROFILE).toMatchObject({
    id: 'noah-lee',
    name: 'Noah Lee',
    role: 'Founder & Principal Engineer',
  });
  expect(FOUNDER_PROFILE.links).toEqual([
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/noah-lee-omegaai/' },
    { label: 'GitHub', href: 'https://github.com/leeno7786-coder' },
  ]);
  expect(COFOUNDERS.map((founder) => founder.name)).toEqual([
    'Mitchell Ray',
    'Larone Williamson',
  ]);
  expect(SELECTED_SYSTEMS.map((system) => system.id)).toEqual([
    'omega-browser-agent',
    'devcard-ai',
    'omega-runtime',
    'omega-memory-mcp',
    'nanoagent',
  ]);
  expect(SELECTED_SYSTEMS.filter((system) => system.tier === 'featured')).toHaveLength(2);
  expect(SELECTED_SYSTEMS.find((system) => system.id === 'devcard-ai')).toMatchObject({
    status: 'Live SaaS product',
    href: 'https://www.omega-dev.uk/',
    linkLabel: 'Open live app',
  });
  expect(SELECTED_SYSTEMS.find((system) => system.id === 'omega-browser-agent')).toMatchObject({
    status: 'Working source · Edge MV3',
    href: 'https://github.com/leeno7786-coder/Omega3.0/tree/main/browser_agent_extension',
    linkLabel: 'View source',
  });
  expect(JSON.stringify({ FOUNDER_PROFILE, SELECTED_SYSTEMS })).not.toMatch(
    /337-396-5510|downloads?\/.*resume|completed client/i,
  );
});
```

Remove the legacy `FOUNDERS` import and founder-name assertion from the existing `keeps the approved company hierarchy` test; the new test above owns the exact founder hierarchy through this assertion:

```ts
expect(COFOUNDERS.map((founder) => founder.name)).toEqual([
  'Mitchell Ray',
  'Larone Williamson',
]);
```

- [ ] **Step 2: Run the content test and verify the new exports are missing**

Run: `npm test -- src/content/siteContent.test.ts`

Expected: FAIL because `COFOUNDERS`, `FOUNDER_PROFILE`, and `SELECTED_SYSTEMS` are not exported.

- [ ] **Step 3: Add the exact public-content types**

Add these definitions to `src/types/site.ts` without removing the existing `Founder` interface yet:

```ts
export interface ProfileLink {
  label: 'LinkedIn' | 'GitHub';
  href: string;
}

export interface FounderProfile {
  id: 'noah-lee';
  name: 'Noah Lee';
  role: 'Founder & Principal Engineer';
  initials: 'NL';
  lead: string;
  biography: string;
  credentials: readonly string[];
  links: readonly ProfileLink[];
}

export interface CoFounder {
  name: 'Mitchell Ray' | 'Larone Williamson';
  role: 'Co-founder';
  initials: 'MR' | 'LW';
}

export type SelectedSystemId =
  | 'omega-browser-agent'
  | 'devcard-ai'
  | 'omega-runtime'
  | 'omega-memory-mcp'
  | 'nanoagent';

export interface SelectedSystem {
  id: SelectedSystemId;
  title: string;
  tier: 'featured' | 'supporting';
  status: string;
  summary: string;
  evidence: readonly string[];
  href: string;
  linkLabel: 'View source' | 'Open live app';
}
```

- [ ] **Step 4: Add the exact approved content**

Import the new types in `src/content/siteContent.ts`, then add:

```ts
export const FOUNDER_PROFILE = {
  id: 'noah-lee',
  name: 'Noah Lee',
  role: 'Founder & Principal Engineer',
  initials: 'NL',
  lead: 'Clients work directly with Noah from technical direction and architecture through implementation, testing, deployment, and support.',
  biography:
    "Noah architects and builds private, local-first AI systems across cognitive control, persistent memory, model orchestration, APIs, product interfaces, Linux deployment, and hardware-aware inference. He created Omega 2.5 and Omega 3.0 and leads the hands-on engineering behind Omega's runtime, agent, memory, browser automation, and full-stack product work.",
  credentials: [
    'End-to-end engineering: intelligence → runtime → application → machine',
    'Creator of Omega 2.5 and Omega 3.0',
    'Co-inventor and co-filer of U.S. Provisional Patent Application No. 63/965,475',
    "Bachelor of Science in Cybersecurity in progress; President's List honoree in 2026",
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/noah-lee-omegaai/' },
    { label: 'GitHub', href: 'https://github.com/leeno7786-coder' },
  ],
} as const satisfies FounderProfile;

export const COFOUNDERS = [
  { name: 'Mitchell Ray', role: 'Co-founder', initials: 'MR' },
  { name: 'Larone Williamson', role: 'Co-founder', initials: 'LW' },
] as const satisfies readonly CoFounder[];

export const SELECTED_SYSTEMS = [
  {
    id: 'omega-browser-agent',
    title: 'Omega Browser Agent',
    tier: 'featured',
    status: 'Working source · Edge MV3',
    summary:
      'A chat-style autonomous browser agent built to operate with a local 4B model. It plans tasks, navigates, clicks, types, reads page structure and screenshots, and can expand to cloud models when greater capability is needed.',
    evidence: [
      'Local-first 4B inference',
      'Optional OpenRouter cloud models',
      'Autonomous planning and execution',
      'Navigation, interaction, extraction, screenshots, and OCR',
      'Isolated multi-tab workspace',
      'Action confirmation controls',
    ],
    href: 'https://github.com/leeno7786-coder/Omega3.0/tree/main/browser_agent_extension',
    linkLabel: 'View source',
  },
  {
    id: 'devcard-ai',
    title: 'DevCard AI',
    tier: 'featured',
    status: 'Live SaaS product',
    summary:
      'A full-stack AI application that turns GitHub profiles and résumés into customizable developer portfolios, then exports the result as portable web code and profile assets.',
    evidence: [
      'Live Vercel deployment',
      'Next.js application',
      'Clerk authentication',
      'Stripe subscription and webhook flow',
      'AI-assisted profile generation',
      'Ten visual themes',
      'HTML, README, and React/Next.js exports',
    ],
    href: 'https://www.omega-dev.uk/',
    linkLabel: 'Open live app',
  },
  {
    id: 'omega-runtime',
    title: 'Omega Runtime',
    tier: 'supporting',
    status: 'Portable AI infrastructure',
    summary:
      'Hardware-aware inference infrastructure spanning model discovery, streaming APIs, process supervision, packaged runtimes, and CPU/GPU/NPU execution paths.',
    evidence: ['Python', 'FastAPI', 'PowerShell', 'ONNX and GGUF'],
    href: 'https://github.com/leeno7786-coder/Omega-NPU-Runtime',
    linkLabel: 'View source',
  },
  {
    id: 'omega-memory-mcp',
    title: 'Omega Memory MCP',
    tier: 'supporting',
    status: 'Persistent memory infrastructure',
    summary:
      'Cross-platform persistent-memory infrastructure with typed MCP access, verified recall, graph projections, embeddings, packaging, and acceptance tests.',
    evidence: ['Python', 'MCP', 'ONNX', 'Verified recall'],
    href: 'https://github.com/leeno7786-coder/omega-memory-mcp',
    linkLabel: 'View source',
  },
  {
    id: 'nanoagent',
    title: 'NanoAgent',
    tier: 'supporting',
    status: 'Local-model coding agent',
    summary:
      'A local-model coding agent with a chat/TUI workflow, MCP connectivity, concurrent sub-agents, workspace sandboxing, validation, and npm packaging.',
    evidence: ['TypeScript', 'React TUI', 'Bun', 'MCP'],
    href: 'https://github.com/leeno7786-coder/nanoagent',
    linkLabel: 'View source',
  },
] as const satisfies readonly SelectedSystem[];
```

- [ ] **Step 5: Run the focused and full unit suites**

Run: `npm test -- src/content/siteContent.test.ts`

Expected: PASS.

Run: `npm test`

Expected: all existing tests PASS because the legacy `FOUNDERS` export remains available until Task 3.

- [ ] **Step 6: Commit the typed content**

```bash
git add src/types/site.ts src/content/siteContent.ts src/content/siteContent.test.ts
git commit -m "feat: add founder and selected systems content"
```

---

### Task 2: Build the selected-systems component

**Files:**
- Create: `src/sections/company/SelectedSystems.tsx`
- Create: `src/sections/company/SelectedSystems.test.tsx`

**Interfaces:**
- Consumes: `SELECTED_SYSTEMS: readonly SelectedSystem[]` from Task 1.
- Produces: `SelectedSystems({ systems? }: { systems?: readonly SelectedSystem[] })` and stable `data-featured-system` selectors for responsive tests.

- [ ] **Step 1: Write the failing component test**

Create `src/sections/company/SelectedSystems.test.tsx`:

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SelectedSystems from './SelectedSystems';

describe('SelectedSystems', () => {
  it('leads with two verified featured systems', () => {
    render(<SelectedSystems />);
    const region = screen.getByRole('region', { name: 'Different problems. Working systems.' });
    expect(within(region).getByRole('heading', { name: 'Different problems. Working systems.' })).toBeVisible();
    expect(within(region).getByRole('heading', { name: 'Omega Browser Agent' })).toBeVisible();
    expect(within(region).getByText('Working source · Edge MV3')).toBeVisible();
    expect(within(region).getByText(/local 4B model/i)).toBeVisible();
    expect(within(region).getByRole('heading', { name: 'DevCard AI' })).toBeVisible();
    expect(within(region).getByText('Live SaaS product')).toBeVisible();
  });

  it('links to every approved public destination safely', () => {
    render(<SelectedSystems />);
    expect(screen.getByRole('link', { name: 'View source: Omega Browser Agent' })).toHaveAttribute(
      'href',
      'https://github.com/leeno7786-coder/Omega3.0/tree/main/browser_agent_extension',
    );
    expect(screen.getByRole('link', { name: 'Open live app: DevCard AI' })).toHaveAttribute(
      'href',
      'https://www.omega-dev.uk/',
    );
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    }
    expect(screen.getByRole('heading', { name: 'Omega Runtime' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Omega Memory MCP' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'NanoAgent' })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test and verify the component is missing**

Run: `npm test -- src/sections/company/SelectedSystems.test.tsx`

Expected: FAIL because `SelectedSystems.tsx` does not exist.

- [ ] **Step 3: Implement the component**

Create `src/sections/company/SelectedSystems.tsx`:

```tsx
import { SELECTED_SYSTEMS } from '../../content/siteContent';
import type { SelectedSystem } from '../../types/site';

interface SelectedSystemsProps {
  systems?: readonly SelectedSystem[];
}

function SystemAction({ system }: { system: SelectedSystem }) {
  return (
    <a
      aria-label={`${system.linkLabel}: ${system.title}`}
      className="system-dossier__action"
      href={system.href}
      target="_blank"
      rel="noreferrer"
    >
      {system.linkLabel}<span aria-hidden="true">↗</span>
    </a>
  );
}

export default function SelectedSystems({ systems = SELECTED_SYSTEMS }: SelectedSystemsProps) {
  const featured = systems.filter((system) => system.tier === 'featured');
  const supporting = systems.filter((system) => system.tier === 'supporting');

  return (
    <section className="selected-systems" id="selected-systems" aria-labelledby="selected-systems-title">
      <div className="content-shell selected-systems__inner">
        <div className="selected-systems__intro">
          <p className="eyebrow"><span aria-hidden="true">04</span>Selected systems</p>
          <div>
            <h2 id="selected-systems-title">Different problems. Working systems.</h2>
            <p>Created by Noah Lee, these systems span autonomous agents, local inference, persistent memory, and production software.</p>
          </div>
        </div>

        <div className="selected-systems__featured">
          {featured.map((system) => (
            <article
              className={`system-dossier system-dossier--${system.id}`}
              data-featured-system={system.id}
              key={system.id}
            >
              <div className="system-dossier__topline">
                <span>{system.status}</span>
                <span>{system.id === 'omega-browser-agent' ? 'Local → cloud' : 'Live product'}</span>
              </div>
              <h3>{system.title}</h3>
              <p>{system.summary}</p>
              <ul aria-label={`${system.title} evidence`}>
                {system.evidence.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <SystemAction system={system} />
            </article>
          ))}
        </div>

        <div className="supporting-systems" aria-label="Supporting systems">
          {supporting.map((system, index) => (
            <article className="supporting-system" key={system.id}>
              <div className="supporting-system__index">0{index + 1}</div>
              <p className="supporting-system__status">{system.status}</p>
              <h3>{system.title}</h3>
              <p>{system.summary}</p>
              <ul aria-label={`${system.title} technologies`}>
                {system.evidence.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <SystemAction system={system} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the component and full unit suites**

Run: `npm test -- src/sections/company/SelectedSystems.test.tsx`

Expected: 2 tests PASS.

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 5: Commit the selected-systems component**

```bash
git add src/sections/company/SelectedSystems.tsx src/sections/company/SelectedSystems.test.tsx
git commit -m "feat: add selected systems showcase"
```

---

### Task 3: Replace the equal founder cards with Noah's technical profile

**Files:**
- Create: `src/sections/company/FounderProfile.tsx`
- Create: `src/sections/company/FounderProfile.test.tsx`
- Modify: `src/sections/company/CompanyOverview.tsx`
- Modify: `src/sections/company/CompanyOverview.test.tsx`
- Modify: `src/content/siteContent.ts`
- Modify: `src/content/siteContent.test.ts`
- Modify: `src/types/site.ts`

**Interfaces:**
- Consumes: `FOUNDER_PROFILE: FounderProfile` and `COFOUNDERS: readonly CoFounder[]` from Task 1.
- Produces: `FounderProfileSection({ profile?, cofounders? })` rendered inside `CompanyOverview` with the stable `#noah-lee` identity anchor.

- [ ] **Step 1: Write the failing founder-profile test**

Create `src/sections/company/FounderProfile.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FounderProfileSection from './FounderProfile';

describe('FounderProfileSection', () => {
  it('presents Noah as the hands-on technical lead with verified proof', () => {
    render(<FounderProfileSection />);
    expect(screen.getByRole('heading', { name: 'Noah Lee' })).toBeVisible();
    expect(screen.getByText('Founder & Principal Engineer')).toBeVisible();
    expect(screen.getByText(/clients work directly with Noah/i)).toBeVisible();
    expect(screen.getByText(/U.S. Provisional Patent Application No. 63\/965,475/i)).toBeVisible();
    expect(screen.getByRole('link', { name: 'Noah Lee on LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/noah-lee-omegaai/',
    );
    expect(screen.getByRole('link', { name: 'Noah Lee on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/leeno7786-coder',
    );
  });

  it('preserves co-founder credit and omits private résumé details', () => {
    render(<FounderProfileSection />);
    expect(screen.getByText('Mitchell Ray')).toBeVisible();
    expect(screen.getByText('Larone Williamson')).toBeVisible();
    expect(screen.getAllByText('Co-founder')).toHaveLength(2);
    expect(screen.queryByText(/337-396-5510|DeRidder, Louisiana/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument();
  });
});
```

Replace the existing assertions in `CompanyOverview.test.tsx` with:

```tsx
expect(screen.getByText('Research-minded. Deployment-ready.')).toBeVisible();
expect(screen.getByRole('heading', { name: 'Noah Lee' })).toBeVisible();
expect(screen.getByText('Founder & Principal Engineer')).toBeVisible();
expect(screen.getByText('Mitchell Ray')).toBeVisible();
expect(screen.getByText('Larone Williamson')).toBeVisible();
expect(screen.getAllByText('Co-founder')).toHaveLength(2);
expect(screen.queryByText(/CEO|CTO|operations lead/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the focused tests and verify the new component is missing**

Run: `npm test -- src/sections/company/FounderProfile.test.tsx src/sections/company/CompanyOverview.test.tsx`

Expected: FAIL because `FounderProfile.tsx` does not exist and the current overview still renders three equal cards.

- [ ] **Step 3: Implement the focused founder component**

Create `src/sections/company/FounderProfile.tsx`:

```tsx
import { COFOUNDERS, FOUNDER_PROFILE } from '../../content/siteContent';
import type { CoFounder, FounderProfile } from '../../types/site';

interface FounderProfileProps {
  profile?: FounderProfile;
  cofounders?: readonly CoFounder[];
}

export default function FounderProfileSection({
  profile = FOUNDER_PROFILE,
  cofounders = COFOUNDERS,
}: FounderProfileProps) {
  return (
    <div className="founder-profile" id={profile.id} aria-labelledby="founder-profile-name">
      <div className="founder-profile__identity">
        <span className="founder-profile__monogram" aria-hidden="true">{profile.initials}</span>
        <p>The engineer behind the systems</p>
        <h3 id="founder-profile-name">{profile.name}</h3>
        <strong>{profile.role}</strong>
        <nav className="founder-profile__links" aria-label="Noah Lee profiles">
          {profile.links.map((link) => (
            <a
              aria-label={`${profile.name} on ${link.label}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.label}
            >
              {link.label}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="founder-profile__story">
        <p className="founder-profile__lead">{profile.lead}</p>
        <p>{profile.biography}</p>
        <ul aria-label="Noah Lee credentials">
          {profile.credentials.map((credential) => <li key={credential}>{credential}</li>)}
        </ul>
      </div>

      <aside className="cofounder-credit" aria-label="Omega AI LLC co-founders">
        <p>Co-founders</p>
        <ul>
          {cofounders.map((founder) => (
            <li key={founder.name}>
              <span aria-hidden="true">{founder.initials}</span>
              <div><strong>{founder.name}</strong><small>{founder.role}</small></div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
```

- [ ] **Step 4: Compose the profile into CompanyOverview**

In `src/sections/company/CompanyOverview.tsx`, remove the `Founder` import and `founders` prop, import `FounderProfileSection`, and replace the complete `.founder-list` block with:

```tsx
<FounderProfileSection />
```

Leave the Company section label at `05` until Task 4 renumbers the integrated page.

- [ ] **Step 5: Remove the legacy equal-founder content**

Delete `FOUNDERS` from `src/content/siteContent.ts`, remove its import and assertion from `src/content/siteContent.test.ts`, and delete the old `Founder` interface from `src/types/site.ts`. The remaining founder contracts must be exactly:

```ts
export interface FounderProfile {
  id: 'noah-lee';
  name: 'Noah Lee';
  role: 'Founder & Principal Engineer';
  initials: 'NL';
  lead: string;
  biography: string;
  credentials: readonly string[];
  links: readonly ProfileLink[];
}

export interface CoFounder {
  name: 'Mitchell Ray' | 'Larone Williamson';
  role: 'Co-founder';
  initials: 'MR' | 'LW';
}
```

- [ ] **Step 6: Run the focused and full unit suites**

Run: `npm test -- src/sections/company/FounderProfile.test.tsx src/sections/company/CompanyOverview.test.tsx src/content/siteContent.test.ts`

Expected: all focused tests PASS.

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 7: Commit the founder hierarchy**

```bash
git add src/types/site.ts src/content/siteContent.ts src/content/siteContent.test.ts src/sections/company/FounderProfile.tsx src/sections/company/FounderProfile.test.tsx src/sections/company/CompanyOverview.tsx src/sections/company/CompanyOverview.test.tsx
git commit -m "feat: add technical founder profile"
```

---

### Task 4: Integrate the portfolio and renumber the homepage narrative

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/pages/Home.test.tsx`
- Modify: `src/sections/company/EngagementProcess.tsx`
- Modify: `src/sections/company/CompanyOverview.tsx`
- Modify: `src/sections/company/ProjectInquiryForm.tsx`
- Modify: `tests/e2e/company-site.spec.ts`

**Interfaces:**
- Consumes: `SelectedSystems` from Task 2 and the founder-enabled `CompanyOverview` from Task 3.
- Produces: final homepage order and visible section labels `01` through `07`.

- [ ] **Step 1: Write the failing homepage-order test**

Create `src/pages/Home.test.tsx`:

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './Home';

describe('Home', () => {
  it('places selected systems after flagship proof and before the process', () => {
    const { container } = render(<Home />);
    const proof = container.querySelector('#proof');
    const systems = container.querySelector('#selected-systems');
    const process = container.querySelector('#process');
    expect(proof).not.toBeNull();
    expect(systems).not.toBeNull();
    expect(process).not.toBeNull();
    expect(proof?.compareDocumentPosition(systems as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(systems?.compareDocumentPosition(process as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('shows the expanded section numbering', () => {
    render(<Home />);
    expect(within(document.querySelector('#selected-systems') as HTMLElement).getByText('04')).toBeVisible();
    expect(within(document.querySelector('#process') as HTMLElement).getByText('05')).toBeVisible();
    expect(within(document.querySelector('#company') as HTMLElement).getByText('06')).toBeVisible();
    expect(within(document.querySelector('#project-inquiry') as HTMLElement).getByText('07')).toBeVisible();
  });
});
```

Add this test to `tests/e2e/company-site.spec.ts`:

```ts
test('visitor can inspect Noah and the selected systems', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Omega Browser Agent' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'DevCard AI' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Noah Lee' })).toBeVisible();
  await expect(page.getByText('Founder & Principal Engineer')).toBeVisible();
  await expect(page.getByRole('link', { name: 'View source: Omega Browser Agent' })).toHaveAttribute(
    'href',
    'https://github.com/leeno7786-coder/Omega3.0/tree/main/browser_agent_extension',
  );
  await expect(page.getByRole('link', { name: 'Open live app: DevCard AI' })).toHaveAttribute(
    'href',
    'https://www.omega-dev.uk/',
  );
});
```

- [ ] **Step 2: Run the unit test and verify the integration is missing**

Run: `npm test -- src/pages/Home.test.tsx`

Expected: FAIL because `#selected-systems` is not mounted and the downstream labels are still `04`, `05`, and `06`.

- [ ] **Step 3: Insert SelectedSystems into Home**

Add the import and component in `src/pages/Home.tsx`:

```tsx
import SelectedSystems from '../sections/company/SelectedSystems';

<OmegaProofPreview />
<SelectedSystems />
<EngagementProcess />
```

- [ ] **Step 4: Renumber downstream section labels**

Make these exact text changes:

```tsx
// EngagementProcess.tsx
<span aria-hidden="true">05</span>

// CompanyOverview.tsx
<span aria-hidden="true">06</span>

// ProjectInquiryForm.tsx
<span aria-hidden="true">07</span>
```

- [ ] **Step 5: Run unit and buyer-journey tests**

Run: `npm test -- src/pages/Home.test.tsx`

Expected: 2 tests PASS.

Run: `npm run test:e2e -- tests/e2e/company-site.spec.ts`

Expected: every company-site Playwright test PASS, including the new selected-systems and founder-profile journey.

- [ ] **Step 6: Commit homepage integration**

```bash
git add src/pages/Home.tsx src/pages/Home.test.tsx src/sections/company/EngagementProcess.tsx src/sections/company/CompanyOverview.tsx src/sections/company/ProjectInquiryForm.tsx tests/e2e/company-site.spec.ts
git commit -m "feat: integrate selected systems into homepage"
```

---

### Task 5: Enrich founder identity structured data

**Files:**
- Create: `src/content/identityMetadata.test.ts`
- Modify: `index.html`

**Interfaces:**
- Consumes: approved Noah role and public profile URLs.
- Produces: a static Organization entity at `#organization` and Noah Person entity at `#noah-lee` while preserving all founders.

- [ ] **Step 1: Write the failing JSON-LD test**

Create `src/content/identityMetadata.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

interface FounderSchema {
  '@id'?: string;
  name: string;
  jobTitle?: string;
  sameAs?: string[];
}

interface OrganizationSchema {
  '@id'?: string;
  '@type': string;
  founder: FounderSchema[];
}

describe('homepage identity metadata', () => {
  it('connects Noah Lee to Omega AI and his public profiles', () => {
    const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const schema = JSON.parse(match?.[1] ?? '{}') as OrganizationSchema;
    expect(schema).toMatchObject({
      '@type': 'Organization',
      '@id': 'https://omega2ai.com/#organization',
    });
    expect(schema.founder.map((founder) => founder.name)).toEqual([
      'Noah Lee',
      'Mitchell Ray',
      'Larone Williamson',
    ]);
    expect(schema.founder.find((founder) => founder.name === 'Noah Lee')).toMatchObject({
      '@id': 'https://omega2ai.com/#noah-lee',
      jobTitle: 'Founder & Principal Engineer',
      sameAs: [
        'https://www.linkedin.com/in/noah-lee-omegaai/',
        'https://github.com/leeno7786-coder',
      ],
    });
  });
});
```

- [ ] **Step 2: Run the test and verify the identity details are absent**

Run: `npm test -- src/content/identityMetadata.test.ts`

Expected: FAIL because the current Organization has no `@id`, job title, or `sameAs` links.

- [ ] **Step 3: Replace the homepage JSON-LD object**

Use this exact object inside the existing `application/ld+json` script in `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://omega2ai.com/#organization",
  "name": "Omega AI LLC",
  "url": "https://omega2ai.com/",
  "email": "noahlee@omega2ai.com",
  "founder": [
    {
      "@type": "Person",
      "@id": "https://omega2ai.com/#noah-lee",
      "name": "Noah Lee",
      "jobTitle": "Founder & Principal Engineer",
      "url": "https://omega2ai.com/#noah-lee",
      "sameAs": [
        "https://www.linkedin.com/in/noah-lee-omegaai/",
        "https://github.com/leeno7786-coder"
      ],
      "worksFor": { "@id": "https://omega2ai.com/#organization" }
    },
    { "@type": "Person", "name": "Mitchell Ray" },
    { "@type": "Person", "name": "Larone Williamson" }
  ]
}
```

- [ ] **Step 4: Run metadata, unit, and build checks**

Run: `npm test -- src/content/identityMetadata.test.ts`

Expected: PASS.

Run: `npm run build && npm run check:build`

Expected: build succeeds and output checks report a homepage JavaScript size below 204800 gzip bytes.

- [ ] **Step 5: Commit structured identity**

```bash
git add index.html src/content/identityMetadata.test.ts
git commit -m "feat: connect founder identity metadata"
```

---

### Task 6: Apply the technical dossier and founder visual system

**Files:**
- Modify: `src/index.css`
- Modify: `tests/e2e/accessibility.spec.ts`

**Interfaces:**
- Consumes: `.selected-systems`, `.system-dossier`, `.supporting-system`, `.founder-profile`, and `.cofounder-credit` markup from Tasks 2 and 3.
- Produces: two-column featured dossiers on wide screens, stacked dossiers on mobile, and a readable founder profile without horizontal overflow.

- [ ] **Step 1: Write the failing responsive-layout test**

Add this test to `tests/e2e/accessibility.spec.ts`:

```ts
test('featured systems share a row on desktop and stack on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const browserAgent = page.locator('[data-featured-system="omega-browser-agent"]');
  const devcard = page.locator('[data-featured-system="devcard-ai"]');
  const desktopBrowserBox = await browserAgent.boundingBox();
  const desktopDevcardBox = await devcard.boundingBox();
  expect(desktopBrowserBox).not.toBeNull();
  expect(desktopDevcardBox).not.toBeNull();
  expect(Math.abs((desktopBrowserBox?.y ?? 0) - (desktopDevcardBox?.y ?? 0))).toBeLessThan(4);
  expect(desktopBrowserBox?.x).not.toBe(desktopDevcardBox?.x);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const mobileBrowserBox = await browserAgent.boundingBox();
  const mobileDevcardBox = await devcard.boundingBox();
  expect(mobileBrowserBox).not.toBeNull();
  expect(mobileDevcardBox).not.toBeNull();
  expect(Math.abs((mobileBrowserBox?.x ?? 0) - (mobileDevcardBox?.x ?? 0))).toBeLessThan(4);
  expect((mobileDevcardBox?.y ?? 0)).toBeGreaterThan((mobileBrowserBox?.y ?? 0));
});
```

- [ ] **Step 2: Run the responsive test and verify the unstyled articles stack on desktop**

Run: `npm run test:e2e -- tests/e2e/accessibility.spec.ts -g "featured systems"`

Expected: FAIL because the featured articles do not yet share a desktop grid row.

- [ ] **Step 3: Add the selected-systems styles**

Add this block before the existing `.process-section` styles in `src/index.css`:

```css
.selected-systems {
  border-top: 1px solid var(--border);
  background: var(--obsidian);
}

.selected-systems__inner {
  padding-block: clamp(100px, 13vw, 176px);
}

.selected-systems__intro {
  display: grid;
  grid-template-columns: minmax(180px, 0.42fr) minmax(0, 1fr);
  gap: clamp(48px, 9vw, 140px);
  align-items: start;
}

.selected-systems__intro h2 {
  max-width: 14ch;
  margin: 0;
  color: var(--ice);
  font-size: clamp(2.7rem, 5.4vw, 5.8rem);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 0.96;
}

.selected-systems__intro > div > p {
  max-width: 62ch;
  margin: 28px 0 0;
  color: #8fa5b0;
  line-height: 1.75;
}

.selected-systems__featured {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  margin-top: 72px;
  border-top: 1px solid var(--border-bright);
  border-left: 1px solid var(--border-bright);
}

.system-dossier {
  display: flex;
  min-height: 560px;
  flex-direction: column;
  padding: clamp(28px, 4vw, 54px);
  border-right: 1px solid var(--border-bright);
  border-bottom: 1px solid var(--border-bright);
  background:
    linear-gradient(135deg, rgba(94, 234, 212, 0.055), transparent 42%),
    var(--graphite);
}

.system-dossier--devcard-ai {
  background:
    linear-gradient(135deg, rgba(125, 211, 252, 0.06), transparent 46%),
    #09141e;
}

.system-dossier__topline {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: var(--teal);
  font-family: 'Geist Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.system-dossier__topline span:last-child {
  color: #5d7581;
}

.system-dossier h3 {
  max-width: 10ch;
  margin: auto 0 0;
  color: var(--ice);
  font-size: clamp(2.25rem, 4vw, 4.7rem);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 0.96;
}

.system-dossier > p {
  max-width: 58ch;
  margin: 28px 0 0;
  color: #91a7b2;
  line-height: 1.72;
}

.system-dossier ul,
.supporting-system ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 30px 0 0;
  padding: 0;
  list-style: none;
}

.system-dossier li,
.supporting-system li {
  padding: 7px 9px;
  border: 1px solid var(--border);
  color: #78909b;
  font-family: 'Geist Mono', monospace;
  font-size: 0.56rem;
}

.system-dossier__action {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 9px;
  margin-top: 34px;
  color: var(--ice);
  font-family: 'Geist Mono', monospace;
  font-size: 0.68rem;
  text-decoration-color: var(--teal);
  text-underline-offset: 6px;
}

.supporting-systems {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-left: 1px solid var(--border);
}

.supporting-system {
  display: flex;
  min-height: 390px;
  flex-direction: column;
  padding: 30px;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.supporting-system__index,
.supporting-system__status {
  margin: 0;
  color: var(--teal);
  font-family: 'Geist Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.supporting-system__status {
  margin-top: 50px;
  color: #607984;
}

.supporting-system h3 {
  margin: 14px 0 0;
  color: var(--ice);
  font-size: 1.35rem;
  font-weight: 520;
  letter-spacing: -0.035em;
}

.supporting-system > p:not(.supporting-system__status) {
  margin: 20px 0 0;
  color: #8198a3;
  font-size: 0.78rem;
  line-height: 1.65;
}

.supporting-system .system-dossier__action {
  margin-top: auto;
  padding-top: 28px;
}
```

- [ ] **Step 4: Replace the old founder-card styles**

Remove `, .founder-list ul` from the existing `.company-principles, .founder-list ul` reset so it targets only `.company-principles`. Delete the remaining base `.founder-list` selectors from `.founder-list` through `.founder-list small`, plus the `.founder-list` declarations inside the existing 980px and 800px media blocks. Then add:

```css
.founder-profile {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
  margin-top: 86px;
  border-top: 1px solid var(--border-bright);
  border-left: 1px solid var(--border-bright);
}

.founder-profile__identity,
.founder-profile__story,
.cofounder-credit {
  border-right: 1px solid var(--border-bright);
  border-bottom: 1px solid var(--border-bright);
}

.founder-profile__identity {
  padding: clamp(28px, 4vw, 52px);
  background: rgba(7, 16, 25, 0.56);
}

.founder-profile__monogram {
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  border: 1px solid var(--teal);
  border-radius: 50%;
  color: var(--teal);
  font-family: 'Geist Mono', monospace;
  font-size: 0.78rem;
}

.founder-profile__identity > p {
  margin: 72px 0 0;
  color: #607984;
  font-family: 'Geist Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.founder-profile h3 {
  margin: 16px 0 0;
  color: var(--ice);
  font-size: clamp(2.2rem, 4vw, 4.6rem);
  font-weight: 500;
  letter-spacing: -0.06em;
  line-height: 0.95;
}

.founder-profile__identity > strong {
  display: block;
  margin-top: 18px;
  color: var(--teal);
  font-family: 'Geist Mono', monospace;
  font-size: 0.67rem;
  font-weight: 500;
}

.founder-profile__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;
  margin-top: 40px;
}

.founder-profile__links a {
  color: var(--ice);
  font-family: 'Geist Mono', monospace;
  font-size: 0.65rem;
  text-decoration-color: var(--teal);
  text-underline-offset: 6px;
}

.founder-profile__story {
  padding: clamp(30px, 5vw, 66px);
}

.founder-profile__story > p {
  max-width: 70ch;
  margin: 24px 0 0;
  color: #8da3ae;
  line-height: 1.75;
}

.founder-profile__story > .founder-profile__lead {
  max-width: 48ch;
  margin-top: 0;
  color: var(--ice);
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  letter-spacing: -0.03em;
  line-height: 1.3;
}

.founder-profile__story ul,
.cofounder-credit ul {
  margin: 42px 0 0;
  padding: 0;
  list-style: none;
}

.founder-profile__story li {
  padding: 15px 0 15px 22px;
  border-top: 1px solid var(--border);
  color: #8ca2ad;
  font-size: 0.76rem;
  line-height: 1.5;
}

.founder-profile__story li::before {
  float: left;
  margin-left: -22px;
  color: var(--teal);
  content: '↳';
}

.cofounder-credit {
  grid-column: 1 / -1;
  padding: 24px clamp(28px, 4vw, 52px);
  background: rgba(7, 16, 25, 0.34);
}

.cofounder-credit > p {
  margin: 0;
  color: #607984;
  font-family: 'Geist Mono', monospace;
  font-size: 0.56rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.cofounder-credit ul {
  display: flex;
  gap: 38px;
  margin-top: 18px;
}

.cofounder-credit li {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cofounder-credit li > span {
  color: var(--teal);
  font-family: 'Geist Mono', monospace;
  font-size: 0.58rem;
}

.cofounder-credit strong,
.cofounder-credit small {
  display: block;
}

.cofounder-credit strong {
  color: var(--ice);
  font-size: 0.76rem;
  font-weight: 540;
}

.cofounder-credit small {
  margin-top: 3px;
  color: #607984;
  font-family: 'Geist Mono', monospace;
  font-size: 0.52rem;
}
```

- [ ] **Step 5: Add exact responsive rules**

Inside the existing `@media (max-width: 980px)` block, add:

```css
.selected-systems__intro {
  grid-template-columns: 1fr;
  gap: 38px;
}

.selected-systems__featured {
  grid-template-columns: 1fr 1fr;
}

.supporting-systems {
  grid-template-columns: 1fr;
}

.supporting-system {
  min-height: auto;
}

.founder-profile {
  grid-template-columns: 1fr;
}
```

Inside the existing `@media (max-width: 800px)` block, add:

```css
.selected-systems__featured {
  grid-template-columns: 1fr;
  margin-top: 52px;
}

.system-dossier {
  min-height: 500px;
  padding: 30px 22px;
}

.system-dossier__topline {
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
}

.cofounder-credit ul {
  align-items: flex-start;
  flex-direction: column;
  gap: 18px;
}
```

Inside the existing `@media (max-width: 520px)` block, add:

```css
.system-dossier {
  min-height: auto;
}

.founder-profile__identity,
.founder-profile__story,
.cofounder-credit {
  padding-inline: 20px;
}
```

- [ ] **Step 6: Run responsive, overflow, accessibility, and unit tests**

Run: `npm run test:e2e -- tests/e2e/accessibility.spec.ts`

Expected: the responsive dossier test, all six overflow widths, both Axe scans, keyboard focus, and reduced-motion tests PASS.

Run: `npm test`

Expected: all unit and component tests PASS.

- [ ] **Step 7: Commit the visual expansion**

```bash
git add src/index.css tests/e2e/accessibility.spec.ts
git commit -m "style: add technical portfolio and founder layouts"
```

---

### Task 7: Run complete production verification

**Files:**
- Verify: entire repository

**Interfaces:**
- Consumes: the complete homepage expansion from Tasks 1–6.
- Produces: fresh evidence that lint, unit tests, production output, accessibility, buyer journeys, and external destinations are healthy.

- [ ] **Step 1: Run the complete repository check**

Run: `npm run check`

Expected: ESLint passes, Vitest passes, TypeScript and Vite build succeed, all required routes and metadata exist, no image exceeds 512000 bytes, and homepage JavaScript remains below 204800 gzip bytes.

- [ ] **Step 2: Run the complete Playwright suite**

Run: `npm run test:e2e`

Expected: every company-site, form, legal-route, mobile-navigation, overflow, Axe, keyboard-focus, reduced-motion, and responsive-portfolio test PASS.

- [ ] **Step 3: Verify every new public destination**

Run in PowerShell:

```powershell
$urls = @(
  'https://www.linkedin.com/in/noah-lee-omegaai/',
  'https://github.com/leeno7786-coder',
  'https://github.com/leeno7786-coder/Omega3.0/tree/main/browser_agent_extension',
  'https://www.omega-dev.uk/',
  'https://github.com/leeno7786-coder/Omega-NPU-Runtime',
  'https://github.com/leeno7786-coder/omega-memory-mcp',
  'https://github.com/leeno7786-coder/nanoagent'
)
foreach ($url in $urls) {
  $status = curl.exe -L -sS -o NUL -w '%{http_code}' --max-time 30 $url
  Write-Output "$status $url"
}
```

Expected: each destination returns a successful `2xx` response. LinkedIn may return an anti-automation status to command-line requests; in that case verify the exact approved profile URL manually in a normal browser while leaving the link unchanged.

- [ ] **Step 4: Inspect the final repository state**

Run:

```bash
git diff --check
git status --short
git log --oneline -8
```

Expected: `git diff --check` produces no output, the working tree is clean, and the log shows the specification, plan, and six focused implementation commits.
