# Omega AI LLC Company Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Omega 3.0-centric panel site with a professional, responsive company website that leads with metacognitive autonomous AI, communicates Omega's full engineering range, presents Omega 3.0 as evidence, and captures real project inquiries.

**Architecture:** Keep React 19, TypeScript, Vite, and Tailwind, but change the app from a hash-driven panel interface to a small Vite multi-page site. The homepage and `/omega-3/` use separate HTML/React entry points and shared typed content; legal links remain in initial HTML. Netlify hosts the built `dist` output, processes the inquiry form, and receives the Squarespace-managed `omega2ai.com` domain after preview verification.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Tailwind CSS 3, Vitest, Testing Library, Playwright, axe-core, Netlify Forms.

## Global Constraints

- Canonical production origin: `https://omega2ai.com`; permanently redirect `https://www.omega2ai.com` to the apex domain.
- Public URLs: `/`, `/omega-3/`, `/privacy/`, `/terms/`.
- Netlify builds `main` with `npm run build` and publishes `dist`.
- Squarespace remains the domain registrar and DNS manager; preserve all MX, SPF, DKIM, DMARC, and other email records during cutover.
- Keep React 19, TypeScript, Vite, and Tailwind; do not introduce a CMS, authentication, commerce, blog, or unrelated backend.
- Lead with metacognitive autonomous AI; establish broader custom AI, web, Android, Linux, custom-computer, and integration capability immediately afterward.
- Present Omega 3.0 as flagship proof, not the company's only offering.
- Use only verified company facts, metrics, founder names, repositories, screenshots, and existing technical evidence; do not invent client work, credentials, titles, or testimonials.
- State `86.4% headline LongMemEval-S (mistral-large)` with that qualifier; state local-model results separately with their trial context.
- Visual tokens begin with Obsidian `#071019`, Graphite `#0A1621`, Deep panel `#0C1B25`, Ice `#DFFBFF`, Signal teal `#5EEAD4`, Signal blue `#7DD3FC`, Muted steel `#8098A8`, and Structural border `#193A4B`.
- Meet WCAG 2.2 AA and respect `prefers-reduced-motion`.
- No horizontal overflow at 320, 375, 390, 768, 1024, or 1440 CSS pixels.
- Initial homepage JavaScript target: below 200 KB gzip.
- Marketing image limit: 500 KB per image unless the final verification report documents an exception.
- Lighthouse production-preview targets: at least 90 in Performance, Accessibility, Best Practices, and SEO.
- A form success state is allowed only after a successful HTTP response; failures preserve the complete visitor draft and expose retry plus direct-email fallback.

---

## File Structure

### New application files

- `omega-3/index.html` — static metadata, React mount point, and crawlable legal links for the proof page.
- `src/omega-main.tsx` — Omega 3.0 React entry point.
- `src/pages/OmegaProofPage.tsx` — proof-page composition.
- `src/content/siteContent.ts` — company copy, navigation, capabilities, process, founders, proof metrics, categories, and contact addresses.
- `src/content/siteContent.test.ts` — content contract and claim-qualifier tests.
- `src/types/site.ts` — shared content and form types.
- `src/components/layout/SiteHeader.tsx` — desktop and mobile navigation.
- `src/components/layout/SiteHeader.test.tsx` — navigation and mobile-menu tests.
- `src/components/visual/CognitiveOrbit.tsx` — the single lightweight signature visualization.
- `src/sections/company/Hero.tsx` — homepage thesis and calls to action.
- `src/sections/company/ProofRail.tsx` — compact verified evidence rail.
- `src/sections/company/Capabilities.tsx` — four capability families and stack flow.
- `src/sections/company/OmegaProofPreview.tsx` — concise Omega 3.0 proof preview.
- `src/sections/company/EngagementProcess.tsx` — Discover, Architect, Build, Deploy.
- `src/sections/company/CompanyOverview.tsx` — company principles and founders.
- `src/sections/company/ProjectInquiryForm.tsx` — accessible Netlify-backed inquiry form.
- `src/sections/company/*.test.tsx` — focused section behavior tests.
- `src/lib/netlifyForms.ts` — payload encoding and submission adapter.
- `src/lib/netlifyForms.test.ts` — success and failure contract tests.
- `src/test/setup.ts` — Testing Library matchers and cleanup.
- `eslint.config.js` — ESLint 9 flat configuration.
- `vitest.config.ts` — unit/component test configuration.
- `playwright.config.ts` — end-to-end configuration and local web server.
- `tests/e2e/company-site.spec.ts` — cross-page buyer-journey tests.
- `tests/e2e/accessibility.spec.ts` — axe, keyboard, reduced-motion, and overflow checks.
- `scripts/generate-assets.mjs` — deterministic social-card and retained proof-image optimization.
- `scripts/check-build-output.mjs` — route, asset, and homepage bundle-budget verification.
- `scripts/check-build-output.test.mjs` — Node test for build-check parsing helpers.
- `netlify.toml` — build, redirects, and security headers.
- `public/favicon.svg` — Omega identity favicon.
- `public/og-source.svg` — 1200 × 630 source artwork for social sharing.
- `public/og-image.png` — optimized generated social image.
- `docs/deployment/netlify-squarespace-cutover.md` — exact preview, form, DNS, and rollback checklist.

### Existing files to modify

- `package.json`, `package-lock.json` — scripts, testing dependencies, and dependency cleanup.
- `vite.config.ts` — remove the inspector plugin and add multi-page build inputs.
- `tailwind.config.js` — scan the second HTML entry and adopt approved tokens.
- `index.html` — homepage metadata, hidden Netlify form, root, and static legal footer.
- `src/main.tsx`, `src/App.tsx`, `src/pages/Home.tsx` — simple homepage entry and composition.
- `src/index.css`, `src/App.css` — approved token system, layout utilities, focus, motion, and responsive rules.
- `public/privacy/index.html`, `public/terms/index.html` — matching legal-page design and accurate links.
- `public/privacy.html` — legacy file removed after a permanent `/privacy.html` to `/privacy/` redirect is configured.
- `public/robots.txt`, `public/sitemap.xml` — real routes and production origin.

### Existing files retained as proof sources

- `src/sections/ArchitectureOverview.tsx`
- `src/sections/ArchitectureDeepDive.tsx`
- `src/sections/AgentLayer.tsx`
- `src/sections/AutonomousDemo.tsx`
- `src/sections/Benchmarks.tsx`
- `src/sections/ImageGeneration.tsx`
- `src/sections/MemoryGraph.tsx`
- `src/sections/ModelRuntime.tsx`
- `src/sections/Portability.tsx`
- `src/data/projectsData.ts`
- `omega-v1-scores-for-website/scores.json`
- `omega-v1-scores-for-website/SOURCE_STATE_OF_PLAY.md`

These sources may be refactored for the proof page, but their claims must remain traceable to the score and architecture source material.

---

### Task 1: Restore the Quality Toolchain

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`
- Create: `eslint.config.js`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/smoke.test.ts`

**Interfaces:**
- Consumes: existing npm scripts and TypeScript configuration.
- Produces: `npm run lint`, `npm test`, `npm run test:watch`, `npm run test:e2e`, and `npm run check` commands used by every later task.

- [ ] **Step 1: Record the current lint failure**

Run:

```bash
npm run lint
```

Expected: FAIL because ESLint 9 cannot find `eslint.config.js`.

- [ ] **Step 2: Install the test dependencies and remove the production inspector**

Run:

```bash
npm uninstall kimi-plugin-inspect-react
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test @axe-core/playwright sharp
```

Expected: `package.json` and `package-lock.json` update without installing a second React version.

- [ ] **Step 3: Add exact quality scripts**

Modify `package.json` scripts to:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "check:build": "node scripts/check-build-output.mjs",
  "check": "npm run lint && npm test && npm run build && npm run check:build",
  "preview": "vite preview"
}
```

- [ ] **Step 4: Create the ESLint 9 flat config**

Create `eslint.config.js`:

```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage', '.superpowers'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['*.config.{js,ts}', 'scripts/**/*.{js,mjs}', 'tests/**/*.ts'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
);
```

- [ ] **Step 5: Create Vitest and Playwright configuration**

Create `vitest.config.ts`:

```ts
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => cleanup());
```

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 6: Add and run the smoke test**

Create `src/test/smoke.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

describe('test harness', () => {
  it('executes TypeScript tests', () => {
    expect(['home', 'omega-3']).toHaveLength(2);
  });
});
```

Run:

```bash
npm run lint
npm test
```

Expected: both commands PASS.

- [ ] **Step 7: Remove the inspector from Vite and commit**

Delete the `kimi-plugin-inspect-react` import and remove `inspectAttr()` from `plugins` in `vite.config.ts`.

Run:

```bash
npm run build
git add package.json package-lock.json vite.config.ts eslint.config.js vitest.config.ts playwright.config.ts src/test/setup.ts src/test/smoke.test.ts
git commit -m "chore: restore site quality toolchain"
```

Expected: build passes and the commit contains only quality-tooling changes.

---

### Task 2: Create the Typed Content Model and Multi-Page Skeleton

**Files:**
- Create: `src/types/site.ts`
- Create: `src/content/siteContent.ts`
- Create: `src/content/siteContent.test.ts`
- Create: `src/pages/OmegaProofPage.tsx`
- Create: `src/omega-main.tsx`
- Create: `omega-3/index.html`
- Modify: `vite.config.ts`
- Modify: `tailwind.config.js`
- Modify: `src/App.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/main.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `Capability`, `ProofMetric`, `ProcessStep`, `Founder`, `ProjectCategory`, `ProjectInquiryPayload`, `SITE_NAV`, `CAPABILITIES`, `HOME_PROOF_METRICS`, `PROCESS_STEPS`, `FOUNDERS`, and `PROJECT_CATEGORIES`.
- Later tasks import these exact names; do not duplicate copy in JSX.

- [ ] **Step 1: Write the failing content-contract test**

Create `src/content/siteContent.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  CAPABILITIES,
  FOUNDERS,
  HOME_PROOF_METRICS,
  PROCESS_STEPS,
  PROJECT_CATEGORIES,
  SITE_NAV,
} from './siteContent';

describe('site content contract', () => {
  it('keeps the approved company hierarchy', () => {
    expect(CAPABILITIES.map((item) => item.id)).toEqual([
      'metacognitive-ai',
      'custom-runtimes',
      'digital-products',
      'computers-integrations',
    ]);
    expect(HOME_PROOF_METRICS.map((item) => item.value)).toEqual([
      '13',
      '8 GB',
      '0',
      'Linux',
    ]);
    expect(PROCESS_STEPS).toHaveLength(4);
    expect(FOUNDERS.map((founder) => founder.name)).toEqual([
      'Noah Lee',
      'Mitchell Ray',
      'Larone Williamson',
    ]);
  });

  it('exposes real destinations and inquiry categories', () => {
    expect(SITE_NAV.some((item) => item.href === '/omega-3/')).toBe(true);
    expect(PROJECT_CATEGORIES).toContain('Unsure or another type of project');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/content/siteContent.test.ts
```

Expected: FAIL because `siteContent.ts` does not exist.

- [ ] **Step 3: Define shared types**

Create `src/types/site.ts` with these exported interfaces:

```ts
export interface NavigationItem {
  label: string;
  href: string;
}

export interface Capability {
  id: 'metacognitive-ai' | 'custom-runtimes' | 'digital-products' | 'computers-integrations';
  title: string;
  description: string;
  tags: readonly string[];
}

export interface ProofMetric {
  value: string;
  label: string;
  qualifier: string;
}

export interface ProcessStep {
  id: 'discover' | 'architect' | 'build' | 'deploy';
  title: string;
  description: string;
}

export interface Founder {
  name: 'Noah Lee' | 'Mitchell Ray' | 'Larone Williamson';
  role: 'Co-founder';
  initials: 'NL' | 'MR' | 'LW';
}

export type ProjectCategory =
  | 'Metacognitive or agentic AI'
  | 'Custom AI runtime, local AI, or edge AI'
  | 'Website, web application, or Android application'
  | 'Custom computer, Linux, or hardware integration'
  | 'Unsure or another type of project';

export interface ProjectInquiryPayload {
  name: string;
  email: string;
  company: string;
  category: ProjectCategory | '';
  description: string;
  'bot-field': string;
}
```

- [ ] **Step 4: Populate the approved content constants**

Create `src/content/siteContent.ts`. Use the exact approved hero copy, four capability groups, four proof values, four process steps, three founders, five categories, and these contacts:

```ts
export const CONTACT_EMAILS = [
  'noahlee@omega2ai.com',
  'mitchellray@omega2ai.com',
] as const;

export const SITE_NAV = [
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Omega 3.0', href: '/omega-3/' },
  { label: 'How we work', href: '/#process' },
  { label: 'Company', href: '/#company' },
] as const satisfies readonly NavigationItem[];
```

The exported content arrays must satisfy the types from `src/types/site.ts` and the test order.

- [ ] **Step 5: Add the second Vite page**

Create `src/omega-main.tsx`:

```tsx
import { createRoot } from 'react-dom/client';
import './index.css';
import OmegaProofPage from './pages/OmegaProofPage';

createRoot(document.getElementById('root')!).render(<OmegaProofPage />);
```

Create an initial `src/pages/OmegaProofPage.tsx`:

```tsx
export default function OmegaProofPage() {
  return (
    <main id="main-content">
      <h1>Omega 3.0 technical proof</h1>
      <p>A working metacognitive architecture built by Omega AI LLC.</p>
    </main>
  );
}
```

Create `omega-3/index.html` with a unique title, description, canonical URL, root element, crawlable Privacy and Terms anchors after the root, and `/src/omega-main.tsx` as the module entry.

- [ ] **Step 6: Configure the multi-page build and Tailwind scan**

Update `vite.config.ts` build input:

```ts
build: {
  manifest: true,
  rollupOptions: {
    input: {
      home: path.resolve(__dirname, 'index.html'),
      omega3: path.resolve(__dirname, 'omega-3/index.html'),
    },
  },
},
```

Update `tailwind.config.js` content:

```js
content: ['./index.html', './omega-3/index.html', './src/**/*.{js,ts,jsx,tsx}'],
```

Remove `react-router`:

```bash
npm uninstall react-router
```

- [ ] **Step 7: Simplify homepage composition and verify**

Make `src/App.tsx` render `Home`. Make `src/pages/Home.tsx` render a temporary semantic `<main id="main-content"><h1>We build AI systems that think beyond the prompt.</h1></main>` without the panel system.

Run:

```bash
npm test -- src/content/siteContent.test.ts
npm run build
```

Expected: content test PASS; build produces `dist/index.html` and `dist/omega-3/index.html`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vite.config.ts tailwind.config.js index.html omega-3 src/types src/content src/App.tsx src/main.tsx src/pages/Home.tsx src/pages/OmegaProofPage.tsx src/omega-main.tsx
git commit -m "feat: add company content model and page structure"
```

---

### Task 3: Build the Header, Hero, Signature Visual, and Proof Rail

**Files:**
- Create: `src/components/layout/SiteHeader.tsx`
- Create: `src/components/layout/SiteHeader.test.tsx`
- Create: `src/components/visual/CognitiveOrbit.tsx`
- Create: `src/sections/company/Hero.tsx`
- Create: `src/sections/company/Hero.test.tsx`
- Create: `src/sections/company/ProofRail.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/index.css`

**Interfaces:**
- `SiteHeader({ currentPage }: { currentPage: 'home' | 'omega-3' })`.
- `Hero()` reads no props and exposes `#project-inquiry` and `/omega-3/` destinations.
- `ProofRail({ metrics = HOME_PROOF_METRICS }: { metrics?: readonly ProofMetric[] })`.

- [ ] **Step 1: Write failing header and hero tests**

Create `src/components/layout/SiteHeader.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SiteHeader from './SiteHeader';

describe('SiteHeader', () => {
  it('exposes every destination through the mobile menu', async () => {
    render(<SiteHeader currentPage="home" />);
    await userEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(screen.getByRole('link', { name: 'Capabilities' })).toHaveAttribute('href', '/#capabilities');
    expect(screen.getByRole('link', { name: 'Omega 3.0' })).toHaveAttribute('href', '/omega-3/');
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/#project-inquiry');
  });
});
```

Create `src/sections/company/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('leads with metacognitive AI and broadens the company offering', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /think beyond the prompt/i })).toBeVisible();
    expect(screen.getByText(/custom runtimes, applications, Linux systems, and hardware/i)).toBeVisible();
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '#project-inquiry');
    expect(screen.getByRole('link', { name: 'See Omega 3.0 proof' })).toHaveAttribute('href', '/omega-3/');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- src/components/layout/SiteHeader.test.tsx src/sections/company/Hero.test.tsx
```

Expected: FAIL because both components are missing.

- [ ] **Step 3: Implement accessible navigation**

Implement a semantic header with a skip link, brand link, desktop nav, mobile toggle, `aria-expanded`, `aria-controls="site-navigation"`, Escape-to-close behavior, and a real `Start a project` anchor. Close the menu when any navigation link is activated.

Keep `<main id="main-content" tabIndex={-1}>` as the skip-link target so activating the link moves keyboard focus as well as scroll position.

The mobile menu must be a vertical disclosure, never a horizontally scrolling control.

- [ ] **Step 4: Implement the approved hero and signature visual**

`Hero.tsx` must render the approved eyebrow, headline, supporting paragraph, primary and secondary anchors, and `CognitiveOrbit` with `aria-hidden="true"`.

`CognitiveOrbit.tsx` must use CSS/SVG only: two quiet orbit rings, four fixed nodes, and no animation when reduced motion is requested. Do not import Three.js or GSAP.

- [ ] **Step 5: Implement the proof rail**

Render the four `HOME_PROOF_METRICS` with `<dl>`, `<dt>`, and `<dd>`. Include the lead label `Proven in our flagship architecture` and expose metric qualifiers to assistive technology.

- [ ] **Step 6: Compose the opening and style it**

Render `SiteHeader`, `Hero`, and `ProofRail` at the top of `Home.tsx`. Add the approved color variables, typography, focus ring, content width, and responsive opening layout to `src/index.css`.

Run:

```bash
npm test -- src/components/layout/SiteHeader.test.tsx src/sections/company/Hero.test.tsx
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout src/components/visual src/sections/company/Hero.tsx src/sections/company/Hero.test.tsx src/sections/company/ProofRail.tsx src/pages/Home.tsx src/index.css
git commit -m "feat: build company homepage opening"
```

---

### Task 4: Build Capabilities and the Omega 3.0 Proof Preview

**Files:**
- Create: `src/sections/company/Capabilities.tsx`
- Create: `src/sections/company/Capabilities.test.tsx`
- Create: `src/sections/company/OmegaProofPreview.tsx`
- Create: `src/sections/company/OmegaProofPreview.test.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/index.css`

**Interfaces:**
- `Capabilities({ items = CAPABILITIES }: { items?: readonly Capability[] })` renders `#capabilities`.
- `OmegaProofPreview()` renders `#proof` and links to `/omega-3/`.

- [ ] **Step 1: Write failing section tests**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Capabilities from './Capabilities';

describe('Capabilities', () => {
  it('shows the four approved capability families and complete-system flow', () => {
    render(<Capabilities />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { name: 'Metacognitive & agentic AI' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Custom AI runtimes' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Applications & digital products' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Custom computers & integrations' })).toBeVisible();
    expect(screen.getByText('Intelligence → Runtime → Application → Machine')).toBeVisible();
  });
});
```

Create `OmegaProofPreview.test.tsx` with assertions for `One system. Multiple disciplines proven.`, the qualified `86.4% headline LongMemEval-S (mistral-large)` claim, Linux support, and the `/omega-3/` link.

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- src/sections/company/Capabilities.test.tsx src/sections/company/OmegaProofPreview.test.tsx
```

Expected: FAIL because the components are missing.

- [ ] **Step 3: Implement capability cards and stack flow**

Use semantic articles and list the approved tags from content data. Use one two-column grid on desktop and one column on mobile. The flow line must wrap vertically on narrow screens without causing overflow.

- [ ] **Step 4: Implement the concise proof preview**

Render one architecture motif, four qualified proof items, and evidence links for Architecture, Benchmarks, Repositories, and Screenshots. Do not render a Video control until a real video URL exists in content data.

- [ ] **Step 5: Compose, verify, and commit**

```bash
npm test -- src/sections/company/Capabilities.test.tsx src/sections/company/OmegaProofPreview.test.tsx
npm run lint
npm run build
git add src/sections/company/Capabilities.tsx src/sections/company/Capabilities.test.tsx src/sections/company/OmegaProofPreview.tsx src/sections/company/OmegaProofPreview.test.tsx src/pages/Home.tsx src/index.css
git commit -m "feat: present company capabilities and proof"
```

Expected: tests, lint, and build PASS.

---

### Task 5: Build the Engagement Process and Company Credibility Sections

**Files:**
- Create: `src/sections/company/EngagementProcess.tsx`
- Create: `src/sections/company/EngagementProcess.test.tsx`
- Create: `src/sections/company/CompanyOverview.tsx`
- Create: `src/sections/company/CompanyOverview.test.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/index.css`

**Interfaces:**
- `EngagementProcess({ steps = PROCESS_STEPS }: { steps?: readonly ProcessStep[] })` renders `#process`.
- `CompanyOverview({ founders = FOUNDERS }: { founders?: readonly Founder[] })` renders `#company`.

- [ ] **Step 1: Write failing content-integrity tests**

Create tests that assert:

```tsx
expect(screen.getAllByRole('listitem')).toHaveLength(4);
expect(screen.getByRole('heading', { name: 'Bring us the difficult problem.' })).toBeVisible();
expect(screen.getByText('Research-minded. Deployment-ready.')).toBeVisible();
expect(screen.getByText('Noah Lee')).toBeVisible();
expect(screen.getByText('Mitchell Ray')).toBeVisible();
expect(screen.getByText('Larone Williamson')).toBeVisible();
expect(screen.queryByText(/CEO|CTO|operations|engineering lead/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- src/sections/company/EngagementProcess.test.tsx src/sections/company/CompanyOverview.test.tsx
```

Expected: FAIL because the components are missing.

- [ ] **Step 3: Implement process and company sections**

Render the process as an ordered list with Discover, Architect, Build, and Deploy. Render company principles as a list and founders with verified `Co-founder` roles only. Use initials, not stock images.

- [ ] **Step 4: Compose, verify, and commit**

```bash
npm test -- src/sections/company/EngagementProcess.test.tsx src/sections/company/CompanyOverview.test.tsx
npm run lint
npm run build
git add src/sections/company/EngagementProcess.tsx src/sections/company/EngagementProcess.test.tsx src/sections/company/CompanyOverview.tsx src/sections/company/CompanyOverview.test.tsx src/pages/Home.tsx src/index.css
git commit -m "feat: add company process and credibility"
```

Expected: PASS.

---

### Task 6: Implement Reliable Netlify Lead Delivery

**Files:**
- Create: `src/lib/netlifyForms.ts`
- Create: `src/lib/netlifyForms.test.ts`
- Create: `src/sections/company/ProjectInquiryForm.tsx`
- Create: `src/sections/company/ProjectInquiryForm.test.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `index.html`
- Modify: `src/index.css`

**Interfaces:**
- `encodeProjectInquiry(payload: ProjectInquiryPayload): URLSearchParams`.
- `submitProjectInquiry(payload: ProjectInquiryPayload, fetcher?: typeof fetch): Promise<void>`.
- `ProjectInquiryForm({ submit = submitProjectInquiry }: { submit?: typeof submitProjectInquiry })` renders `#project-inquiry`.

- [ ] **Step 1: Write failing adapter tests**

Create `src/lib/netlifyForms.test.ts`:

```ts
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
    expect(body.get('email')).toBe('ada@example.com');
    expect(body.get('description')).toContain('private autonomous');
  });

  it('throws when delivery is not confirmed', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('', { status: 500 }));
    await expect(submitProjectInquiry(payload, fetcher)).rejects.toThrow('Inquiry delivery failed');
  });
});
```

- [ ] **Step 2: Run adapter tests to verify they fail**

```bash
npm test -- src/lib/netlifyForms.test.ts
```

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the adapter**

Create `src/lib/netlifyForms.ts`:

```ts
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
```

- [ ] **Step 4: Write failing form-component tests**

Test all of these behaviors with Testing Library and a mocked `submit` prop:

- labels are associated with controls;
- required validation blocks an empty submit;
- the button reads `Sending…` while pending;
- one click results in one submission while pending;
- confirmed success shows `Project inquiry received` and clears fields;
- rejected submission shows `We could not deliver your inquiry. Your information is still here—retry or email us directly.`;
- rejected submission preserves every entered value;
- both direct email links remain visible.

- [ ] **Step 5: Implement the form and static Netlify detector**

Implement controlled form state using the exact `ProjectInquiryPayload` keys. Include an off-screen honeypot input with `tabIndex={-1}` and `autoComplete="off"`.

Use the exact visible labels `Name`, `Work email`, `Company (optional)`, `Project category`, and `Project description`; name the submit button `Send project inquiry`. This gives the browser suite and assistive technology a stable public interface.

Add this static detector to `index.html` before the React root:

```html
<form name="project-inquiry" data-netlify="true" netlify-honeypot="bot-field" hidden>
  <input name="name" />
  <input name="email" type="email" />
  <input name="company" />
  <select name="category"><option>Unsure or another type of project</option></select>
  <textarea name="description"></textarea>
  <input name="bot-field" />
</form>
```

The visible React form must include `<input type="hidden" name="form-name" value="project-inquiry" />`.

- [ ] **Step 6: Verify and commit**

```bash
npm test -- src/lib/netlifyForms.test.ts src/sections/company/ProjectInquiryForm.test.tsx
npm run lint
npm run build
git add src/lib/netlifyForms.ts src/lib/netlifyForms.test.ts src/sections/company/ProjectInquiryForm.tsx src/sections/company/ProjectInquiryForm.test.tsx src/pages/Home.tsx src/index.css index.html
git commit -m "feat: add reliable project inquiry delivery"
```

Expected: PASS; `dist/index.html` contains `data-netlify="true"` and every field name.

---

### Task 7: Build the Dedicated Omega 3.0 Proof Page

**Files:**
- Create: `src/pages/OmegaProofPage.test.tsx`
- Create: `src/components/proof/ProofDisclosure.tsx`
- Create: `src/components/proof/ProofDisclosure.test.tsx`
- Modify: `src/pages/OmegaProofPage.tsx`
- Modify: existing proof-source sections listed in File Structure as needed
- Modify: `src/index.css`
- Modify: `omega-3/index.html`

**Interfaces:**
- `ProofDisclosure({ id, title, summary, children, defaultOpen = false })` renders an accessible `<details>` section.
- `OmegaProofPage()` composes architecture, behavior, benchmarks, runtime, memory, agent layer, image evidence, portability, and repositories.

- [ ] **Step 1: Write failing proof-page tests**

Create tests that assert one `h1`, a link back to the company site, the qualified headline and local-model results, Linux support, Architecture, Autonomous behavior, Benchmarks, Runtime, Memory, Agent layer, Image evidence, and Repositories headings.

Use this exact claim test:

```tsx
expect(screen.getByText('86.4% headline LongMemEval-S (mistral-large)')).toBeVisible();
expect(screen.getByText(/up to 78.0% with a local 4B model/i)).toBeVisible();
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- src/pages/OmegaProofPage.test.tsx src/components/proof/ProofDisclosure.test.tsx
```

Expected: FAIL because the approved proof structure is absent.

- [ ] **Step 3: Implement progressive proof disclosure**

Use a concise proof hero and summary metrics, then wrap dense technical sections in native `<details>` elements with visible summaries. Architecture and strongest evidence are open by default; long model tables and deep dives are closed by default.

Reuse factual content and images from existing sections, but remove panel-specific imports, duplicate top-level headings, GSAP initialization, and assumptions that every section appears on the same homepage.

- [ ] **Step 4: Update portability for current Linux support**

Remove `Linux coming soon` language from every proof source. State Linux support as available and describe Windows/Linux validation only at the level supported by the current source material.

- [ ] **Step 5: Verify deep links and build output**

```bash
npm test -- src/pages/OmegaProofPage.test.tsx src/components/proof/ProofDisclosure.test.tsx
npm run lint
npm run build
```

Expected: PASS; `dist/omega-3/index.html` references the Omega entry bundle and contains its unique canonical metadata.

- [ ] **Step 6: Commit**

```bash
git add omega-3 src/pages/OmegaProofPage.tsx src/pages/OmegaProofPage.test.tsx src/components/proof src/sections src/index.css
git commit -m "feat: create Omega 3 proof page"
```

---

### Task 8: Finish the Visual System, Responsive Behavior, and Dependency Cleanup

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.css`
- Modify: `tailwind.config.js`
- Modify: `package.json`
- Modify: `package-lock.json`
- Delete: `src/sections/NeuralConstellation.tsx`
- Delete: `src/sections/AnimatedOrbs.tsx`
- Delete: `src/sections/CursorGlow.tsx`
- Delete: `src/components/PanelContainer.tsx`
- Delete: `src/components/PanelDock.tsx`
- Delete: `src/components/PanelSwitcherNav.tsx`
- Delete: `src/config/panelsConfig.ts`
- Delete: superseded company sections that are no longer imported
- Optimize: `src/assets/*.png` and proof-page media retained by Task 7
- Create: `scripts/generate-assets.mjs`

**Interfaces:**
- Produces: shared CSS variables, `.content-shell`, `.section-space`, `.eyebrow`, `.focus-ring`, and reduced-motion behavior used by both pages.

- [ ] **Step 1: Add a failing mobile-overflow browser test**

Create the initial test in `tests/e2e/accessibility.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`home has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const sizes = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(sizes.page).toBe(sizes.viewport);
  });
}
```

- [ ] **Step 2: Run the test to expose current overflow**

```bash
npx playwright install chromium
npm run test:e2e -- tests/e2e/accessibility.spec.ts
```

Expected: at least one narrow viewport fails before final CSS and asset cleanup.

- [ ] **Step 3: Consolidate the approved visual tokens**

Replace duplicate legacy animation blocks and hard-coded legacy colors with the approved variables. Ensure body and decorative layers use `overflow-x: clip` only as a guard; fix the actual child widths so the overflow test passes without relying on hidden content.

- [ ] **Step 4: Remove obsolete UI and animation dependencies**

Run `rg` for imports before every deletion. Delete only files with no remaining approved-page imports. Remove unused direct dependencies after a package import inventory:

```bash
rg -n "from ['\"]([^./@]|@)" src
```

At minimum, remove `three`, `@types/three`, `gsap`, `react-router`, and unused Radix packages if no final source imports them. Keep only dependencies proven by `rg` and a successful build.

- [ ] **Step 5: Optimize retained images reproducibly**

Create `scripts/generate-assets.mjs`:

```js
import sharp from 'sharp';

const proofImages = [
  ['src/assets/ab_1024.png', 'src/assets/ab_1024.webp', 1024],
  ['src/assets/ab_1152.png', 'src/assets/ab_1152.webp', 1152],
  ['src/assets/ab_1280.png', 'src/assets/ab_1280.webp', 1280],
  ['src/assets/memory-graph.png', 'src/assets/memory-graph.webp', 1200],
];

await Promise.all(
  proofImages.map(([input, output, width]) =>
    sharp(input)
      .resize({ width: Number(width), withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(output),
  ),
);
```

Add `"generate:assets": "node scripts/generate-assets.mjs"` to `package.json`. Update proof imports to use the generated WebP files. Delete duplicate PNG and hashed copies only after `rg` confirms they are unreferenced.

Run:

```bash
npm run generate:assets
npm run build
```

Verify each final marketing asset with:

```powershell
Get-ChildItem -Recurse dist -Include *.png,*.jpg,*.jpeg,*.webp,*.avif | Where-Object Length -GT 512000
```

Expected: no output, or an explicitly documented proof-page exception in the deployment checklist.

- [ ] **Step 6: Verify responsive and reduced-motion behavior**

```bash
npm run test:e2e -- tests/e2e/accessibility.spec.ts
npm run lint
npm test
npm run build
```

Expected: PASS at every listed width.

- [ ] **Step 7: Commit**

```bash
git add -A src package.json package-lock.json tailwind.config.js scripts/generate-assets.mjs tests/e2e/accessibility.spec.ts
git commit -m "refactor: simplify site visuals and responsive layout"
```

---

### Task 9: Add Metadata, Legal Routes, Build Budgets, and Netlify Configuration

**Files:**
- Modify: `index.html`
- Modify: `omega-3/index.html`
- Modify: `public/privacy/index.html`
- Modify: `public/terms/index.html`
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`
- Delete: `public/CNAME`
- Delete: `CNAME`
- Delete: `public/privacy.html` after adding its permanent redirect
- Create: `public/favicon.svg`
- Create: `public/og-source.svg`
- Create: `public/og-image.png`
- Create: `scripts/check-build-output.mjs`
- Create: `scripts/check-build-output.test.mjs`
- Create: `netlify.toml`
- Create: `docs/deployment/netlify-squarespace-cutover.md`

**Interfaces:**
- `checkBuildOutput({ distDir, maxHomeGzipBytes }): Promise<BuildCheckResult>` returns route presence, missing metadata, oversized assets, and homepage gzip bytes.
- `npm run check:build` exits non-zero for missing routes, required metadata, or homepage JavaScript above `204800` gzip bytes.

- [ ] **Step 1: Write the failing build-output test**

Create `scripts/check-build-output.test.mjs`:

```js
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, test } from 'node:test';
import { checkBuildOutput } from './check-build-output.mjs';

const fixtures = [];

afterEach(async () => {
  await Promise.all(fixtures.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

async function createFixture({ homeHtml, homeJs = 'console.log("home")' } = {}) {
  const distDir = await mkdtemp(path.join(tmpdir(), 'omega-build-'));
  fixtures.push(distDir);
  await Promise.all([
    mkdir(path.join(distDir, '.vite'), { recursive: true }),
    mkdir(path.join(distDir, 'assets'), { recursive: true }),
    mkdir(path.join(distDir, 'omega-3'), { recursive: true }),
    mkdir(path.join(distDir, 'privacy'), { recursive: true }),
    mkdir(path.join(distDir, 'terms'), { recursive: true }),
  ]);

  const validHome = `<!doctype html><html><head>
    <meta name="description" content="Custom metacognitive AI and technology engineering." />
    <link rel="canonical" href="https://omega2ai.com/" />
    <meta property="og:title" content="Omega AI LLC" />
    <meta property="og:description" content="Custom metacognitive AI and technology engineering." />
    <meta property="og:image" content="https://omega2ai.com/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">{"@type":"Organization"}</script>
  </head><body></body></html>`;

  await Promise.all([
    writeFile(path.join(distDir, 'index.html'), homeHtml ?? validHome),
    writeFile(path.join(distDir, 'omega-3', 'index.html'), '<!doctype html><title>Omega 3.0</title>'),
    writeFile(path.join(distDir, 'privacy', 'index.html'), '<!doctype html><title>Privacy</title>'),
    writeFile(path.join(distDir, 'terms', 'index.html'), '<!doctype html><title>Terms</title>'),
    writeFile(path.join(distDir, 'sitemap.xml'), '<urlset><url><loc>https://omega2ai.com/</loc></url></urlset>'),
    writeFile(path.join(distDir, 'assets', 'home.js'), homeJs),
    writeFile(
      path.join(distDir, '.vite', 'manifest.json'),
      JSON.stringify({ 'index.html': { file: 'assets/home.js', isEntry: true } }),
    ),
  ]);
  return distDir;
}

test('accepts a complete build inside all budgets', async () => {
  const result = await checkBuildOutput({ distDir: await createFixture(), maxHomeGzipBytes: 204800 });
  assert.equal(result.ok, true, result.errors.join('\n'));
});

test('reports missing homepage metadata', async () => {
  const result = await checkBuildOutput({
    distDir: await createFixture({ homeHtml: '<!doctype html><title>Incomplete</title>' }),
    maxHomeGzipBytes: 204800,
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.missingMetadata.sort(), [
    'canonical',
    'description',
    'json-ld',
    'og:description',
    'og:image',
    'og:title',
    'twitter:card',
  ]);
});

test('reports a missing required route', async () => {
  const distDir = await createFixture();
  await rm(path.join(distDir, 'privacy'), { recursive: true, force: true });
  const result = await checkBuildOutput({ distDir, maxHomeGzipBytes: 204800 });
  assert.equal(result.ok, false);
  assert.equal(result.routePresence['privacy/index.html'], false);
  assert.match(result.errors.join('\n'), /missing route: privacy\/index\.html/i);
});

test('reports a homepage JavaScript bundle above the gzip budget', async () => {
  const result = await checkBuildOutput({
    distDir: await createFixture({ homeJs: randomBytes(400_000) }),
    maxHomeGzipBytes: 204800,
  });
  assert.equal(result.ok, false);
  assert.ok(result.homeJsGzipBytes > 204800);
  assert.match(result.errors.join('\n'), /homepage javascript/i);
});
```

Run:

```bash
node --test scripts/check-build-output.test.mjs
```

Expected: FAIL because `check-build-output.mjs` does not exist.

- [ ] **Step 2: Implement metadata and build checks**

Create `scripts/check-build-output.mjs`:

```js
import { gzipSync } from 'node:zlib';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_ROUTES = ['index.html', 'omega-3/index.html', 'privacy/index.html', 'terms/index.html'];
const METADATA = {
  description: /<meta[^>]+name=["']description["'][^>]*>/i,
  canonical: /<link[^>]+rel=["']canonical["'][^>]*>/i,
  'og:title': /<meta[^>]+property=["']og:title["'][^>]*>/i,
  'og:description': /<meta[^>]+property=["']og:description["'][^>]*>/i,
  'og:image': /<meta[^>]+property=["']og:image["'][^>]*>/i,
  'twitter:card': /<meta[^>]+name=["']twitter:card["'][^>]*>/i,
  'json-ld': /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i,
};
const IMAGE_PATTERN = /\.(?:avif|jpe?g|png|webp)$/i;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  }));
  return nested.flat();
}

function collectEntryFiles(manifest, key, collected = new Set()) {
  const entry = manifest[key];
  if (!entry || collected.has(key)) return collected;
  collected.add(key);
  for (const importedKey of entry.imports ?? []) collectEntryFiles(manifest, importedKey, collected);
  return collected;
}

export async function checkBuildOutput({ distDir = 'dist', maxHomeGzipBytes = 204800 } = {}) {
  const errors = [];
  const routePresence = {};
  let homeHtml = '';

  for (const route of REQUIRED_ROUTES) {
    try {
      const html = await readFile(path.join(distDir, route), 'utf8');
      routePresence[route] = true;
      if (route === 'index.html') homeHtml = html;
    } catch {
      routePresence[route] = false;
      errors.push(`Missing route: ${route}`);
    }
  }

  const missingMetadata = Object.entries(METADATA)
    .filter(([, pattern]) => !pattern.test(homeHtml))
    .map(([name]) => name);
  errors.push(...missingMetadata.map((name) => `Missing homepage metadata: ${name}`));

  let sitemapHashUrls = [];
  try {
    const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
    sitemapHashUrls = [...sitemap.matchAll(/<loc>([^<]*#[^<]*)<\/loc>/gi)].map((match) => match[1]);
    errors.push(...sitemapHashUrls.map((url) => `Sitemap URL contains a fragment: ${url}`));
  } catch {
    errors.push('Missing sitemap.xml');
  }

  let homeJsGzipBytes = 0;
  try {
    const manifest = JSON.parse(await readFile(path.join(distDir, '.vite', 'manifest.json'), 'utf8'));
    if (!manifest['index.html']) throw new Error('Homepage entry is missing');
    const keys = collectEntryFiles(manifest, 'index.html');
    for (const key of keys) {
      const file = manifest[key]?.file;
      if (file?.endsWith('.js')) {
        homeJsGzipBytes += gzipSync(await readFile(path.join(distDir, file))).byteLength;
      }
    }
    if (homeJsGzipBytes > maxHomeGzipBytes) {
      errors.push(`Homepage JavaScript is ${homeJsGzipBytes} gzip bytes; budget is ${maxHomeGzipBytes}.`);
    }
  } catch (error) {
    errors.push(`Could not inspect Vite manifest: ${error.message}`);
  }

  const oversizedImages = [];
  for (const file of await walk(distDir)) {
    if (!IMAGE_PATTERN.test(file)) continue;
    const bytes = (await stat(file)).size;
    if (bytes > 512000) oversizedImages.push({ file: path.relative(distDir, file), bytes });
  }
  errors.push(...oversizedImages.map(({ file, bytes }) => `Image ${file} is ${bytes} bytes; budget is 512000.`));

  return {
    ok: errors.length === 0,
    routePresence,
    missingMetadata,
    sitemapHashUrls,
    oversizedImages,
    homeJsGzipBytes,
    errors,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkBuildOutput();
  if (!result.ok) {
    console.error(result.errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Build checks passed; homepage JavaScript: ${result.homeJsGzipBytes} gzip bytes.`);
  }
}
```

The checker now verifies:

- `dist/index.html`
- `dist/omega-3/index.html`
- `dist/privacy/index.html`
- `dist/terms/index.html`
- canonical, description, `og:title`, `og:description`, `og:image`, `twitter:card`, and one JSON-LD script on the homepage
- no sitemap URL containing `#`
- homepage entry JavaScript gzip total at or below 204800 bytes
- every image at or below 512000 bytes

Use `node:fs/promises`, `node:path`, and `node:zlib`; do not add a runtime dependency.

- [ ] **Step 3: Add complete static metadata**

Homepage title:

```html
<title>Omega AI LLC — Metacognitive AI & Custom Technology Engineering</title>
```

Homepage canonical:

```html
<link rel="canonical" href="https://omega2ai.com/" />
```

Omega proof canonical:

```html
<link rel="canonical" href="https://omega2ai.com/omega-3/" />
```

Use this Organization JSON-LD on the homepage:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Omega AI LLC",
  "url": "https://omega2ai.com/",
  "email": "noahlee@omega2ai.com",
  "founder": [
    { "@type": "Person", "name": "Noah Lee" },
    { "@type": "Person", "name": "Mitchell Ray" },
    { "@type": "Person", "name": "Larone Williamson" }
  ]
}
</script>
```

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#090d10"/>
  <circle cx="32" cy="32" r="17" fill="none" stroke="#78f2d2" stroke-width="3"/>
  <circle cx="32" cy="32" r="5" fill="#f3f8f7"/>
  <circle cx="47" cy="24" r="3" fill="#78f2d2"/>
</svg>
```

Create the 1200 × 630 vector source at `public/og-source.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#090d10"/>
  <path d="M0 508H1200M0 430H1200M0 352H1200M0 274H1200M0 196H1200M0 118H1200" stroke="#172328"/>
  <circle cx="926" cy="315" r="154" fill="none" stroke="#2d665d" stroke-width="2"/>
  <circle cx="926" cy="315" r="88" fill="none" stroke="#78f2d2" stroke-width="3"/>
  <circle cx="926" cy="315" r="11" fill="#f3f8f7"/>
  <circle cx="1058" cy="237" r="8" fill="#78f2d2"/>
  <text x="92" y="176" fill="#78f2d2" font-family="monospace" font-size="23" letter-spacing="5">OMEGA AI LLC</text>
  <text x="92" y="280" fill="#f3f8f7" font-family="Arial, sans-serif" font-size="62" font-weight="600">Intelligence engineered</text>
  <text x="92" y="354" fill="#f3f8f7" font-family="Arial, sans-serif" font-size="62" font-weight="600">beyond the prompt.</text>
  <text x="92" y="430" fill="#a8b7b4" font-family="Arial, sans-serif" font-size="25">Metacognitive AI · custom runtimes · complete technology systems</text>
</svg>
```

Append this after the proof-image work in `scripts/generate-assets.mjs`, then run `npm run generate:assets` to create `public/og-image.png`:

```js
await sharp('public/og-source.svg')
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png');
```

Add favicon, Open Graph image, Twitter card, and real descriptions to both HTML entries. Use absolute `https://omega2ai.com/og-image.png` image URLs and keep every visible and structured claim aligned with the approved copy.

- [ ] **Step 4: Add crawlable legal footers and update legal pages**

Place visible Privacy and Terms anchors after each React root. Style them as the final footer, not as a strip behind the fixed header. Update legal pages to match colors, navigation, canonical URLs, and the Netlify form-processing disclosure.

- [ ] **Step 5: Add exact Netlify configuration**

Create `netlify.toml`:

```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/privacy.html"
to = "/privacy/"
status = 301
force = true

[[redirects]]
from = "https://www.omega2ai.com/*"
to = "https://omega2ai.com/:splat"
status = 301
force = true

[[headers]]
for = "/*"
[headers.values]
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

Do not add a catch-all SPA rewrite; both application routes are real build outputs.

- [ ] **Step 6: Write the deployment checklist**

The checklist must include Netlify repository connection, `main`, form detection, notifications to both company emails, preview tests, domain addition, exact DNS-record preservation, apex/`www` verification, SSL, rollback to prior Squarespace web records, and GitHub Pages retirement only after production verification.

- [ ] **Step 7: Verify and commit**

```bash
npm run build
node --test scripts/check-build-output.test.mjs
npm run check:build
git add -A index.html omega-3 public scripts netlify.toml docs/deployment CNAME
git commit -m "feat: prepare site metadata and Netlify deployment"
```

Expected: all build-output checks PASS.

---

### Task 10: Add Full Buyer-Journey, Accessibility, and Launch Verification

**Files:**
- Create or modify: `tests/e2e/company-site.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `docs/deployment/netlify-squarespace-cutover.md`

**Interfaces:**
- Consumes: final `/`, `/omega-3/`, `/privacy/`, `/terms/`, and form behavior.
- Produces: a repeatable pre-deploy verification suite and recorded launch commands.

- [ ] **Step 1: Write the buyer-journey tests**

Create `tests/e2e/company-site.spec.ts` with these exact journeys:

```ts
import { expect, test } from '@playwright/test';

test('visitor can understand the company and reach the inquiry form', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/think beyond the prompt/i);
  await page.getByRole('link', { name: 'Start a project' }).first().click();
  await expect(page.getByRole('heading', { name: 'What are you trying to build?' })).toBeInViewport();
});

test('technical visitor can open the proof page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'See Omega 3.0 proof' }).click();
  await expect(page).toHaveURL(/\/omega-3\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Omega 3.0 technical proof/i);
});

for (const legalPage of [
  { path: '/privacy/', heading: 'Privacy Policy' },
  { path: '/terms/', heading: 'Terms of Service' },
]) {
  test(`${legalPage.path} loads directly`, async ({ page }) => {
    const response = await page.goto(legalPage.path);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(legalPage.heading);
  });
}

test('mobile visitor can navigate without horizontal controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('link', { name: 'Capabilities' })).toBeVisible();
  await page.getByRole('link', { name: 'Capabilities' }).click();
  await expect(page).toHaveURL(/#capabilities$/);
  await expect(page.locator('#capabilities')).toBeInViewport();
});

test('confirmed form response shows success and clears the draft', async ({ page }) => {
  await page.route('**/', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 200, body: 'ok' });
      return;
    }
    await route.continue();
  });
  await page.goto('/');
  await page.getByLabel('Name').fill('Ada Lovelace');
  await page.getByLabel('Work email').fill('ada@example.com');
  await page.getByLabel('Company (optional)').fill('Analytical Engines');
  await page.getByLabel('Project category').selectOption({ label: 'Metacognitive or agentic AI' });
  await page.getByLabel('Project description').fill('Build a private autonomous research system.');
  await page.getByRole('button', { name: 'Send project inquiry' }).click();
  await expect(page.getByText('Project inquiry received')).toBeVisible();
  await expect(page.getByLabel('Name')).toHaveValue('');
});

test('failed form response keeps every visitor-entered value', async ({ page }) => {
  await page.route('**/', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 503, body: 'unavailable' });
      return;
    }
    await route.continue();
  });
  await page.goto('/');
  await page.getByLabel('Name').fill('Grace Hopper');
  await page.getByLabel('Work email').fill('grace@example.com');
  await page.getByLabel('Company (optional)').fill('Compiler Systems');
  await page.getByLabel('Project category').selectOption({ label: 'Custom AI runtime, local AI, or edge AI' });
  await page.getByLabel('Project description').fill('Keep this exact project draft after failure.');
  await page.getByRole('button', { name: 'Send project inquiry' }).click();
  await expect(page.getByText(/we could not deliver your inquiry/i)).toBeVisible();
  await expect(page.getByLabel('Name')).toHaveValue('Grace Hopper');
  await expect(page.getByLabel('Work email')).toHaveValue('grace@example.com');
  await expect(page.getByLabel('Company (optional)')).toHaveValue('Compiler Systems');
  await expect(page.getByLabel('Project category')).toHaveValue('Custom AI runtime, local AI, or edge AI');
  await expect(page.getByLabel('Project description')).toHaveValue('Keep this exact project draft after failure.');
});
```

- [ ] **Step 2: Add axe and keyboard tests**

Extend `tests/e2e/accessibility.spec.ts`:

```ts
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/', '/omega-3/']) {
  test(`${path} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('keyboard users receive a skip link and visible focus throughout the homepage', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await skipLink.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  const controls = page.locator(
    'header a[href]:visible, main a[href]:visible, main button:visible, main input:visible, main select:visible, main textarea:visible, footer a[href]:visible',
  );
  const count = await controls.count();
  expect(count).toBeGreaterThan(10);
  for (let index = 0; index < count; index += 1) {
    const control = controls.nth(index);
    await control.focus();
    await expect(control).toBeFocused();
    const indicator = await control.evaluate((element) => {
      const style = getComputedStyle(element);
      return `${style.outlineStyle} ${style.outlineWidth} ${style.boxShadow}`;
    });
    expect(indicator).not.toMatch(/^none 0px none$/);
  }
});

test('reduced motion stops the signature visualization', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const running = await page.locator('[data-cognitive-orbit]').evaluate((element) =>
    element.getAnimations().filter((animation) => animation.playState === 'running').length,
  );
  expect(running).toBe(0);
});
```

The disclosure buttons on `/omega-3/` and all form controls are included in the focusable-control selector; keep their DOM order logical and their focus styles visible.


- [ ] **Step 3: Run the full local verification suite**

```bash
npm run check
npm run test:e2e
npm audit --omit=dev
```

Expected: lint, unit tests, TypeScript build, Vite build, build budgets, Playwright journeys, axe checks, and production dependency audit all pass with zero high or critical advisories.

- [ ] **Step 4: Run the production-preview checklist**

After a Netlify preview exists, record results for:

- real non-sensitive form delivery and both email notifications;
- preview Lighthouse scores;
- custom 404 behavior;
- browser console errors;
- metadata and social-card previews;
- direct legal and proof routes;
- mobile widths and physical-device smoke test.

Do not change Squarespace DNS during this task unless the user separately authorizes the production cutover after reviewing the preview.

- [ ] **Step 5: Commit test and checklist results**

```bash
git add tests/e2e docs/deployment/netlify-squarespace-cutover.md
git commit -m "test: verify company site buyer journeys"
```

- [ ] **Step 6: Final branch verification**

```bash
git status --short
git log --oneline --decorate -12
```

Expected: clean working tree and one focused commit per completed task.

---

## Spec Coverage Map

- Company positioning and broad capabilities: Tasks 2–5.
- Approved visual direction and single signature motif: Tasks 3 and 8.
- Omega 3.0 as qualified proof: Tasks 4 and 7.
- Real inquiry delivery and failure behavior: Task 6.
- Multi-page architecture and crawlable legal links: Tasks 2 and 9.
- SEO, sharing, structured data, sitemap, and robots: Task 9.
- Accessibility and responsive behavior: Tasks 3, 8, and 10.
- Performance and asset budgets: Tasks 8 and 9.
- Squarespace DNS to Netlify hosting and rollback: Task 9.
- Automated and production-preview verification: Task 10.
