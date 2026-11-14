# Dependency security remediation — 2026-11-14

Base: `366d757eb01fb0be32c3b52e15459696f18ce1ce` (`origin/main`, independently
confirmed against GitHub). Worktree: `E:\omega-site-dependency-tail-20261114`;
local branch: `fix/dependabot-last-eight-20261114`.

Authenticated GitHub REST and GraphQL checks confirmed exactly **8 open alerts**,
all development scope, and **0 open pull requests** before remediation.

| Alert | Severity | Advisory | Locked before → after |
| --- | --- | --- | --- |
| #44 | Medium | [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) | minimatch 10.2.5 → 11.0.1 |
| #27 | High | [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) | sharp 0.35.3 → 0.35.5 |
| #26 | High | [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | source-map-js 1.2.1 → 1.2.2 |
| #25 | Medium | [GHSA-q2hr-2g5m-vwhr](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr) | brace-expansion 1.1.16 → 1.1.22 (patch ≥1.1.21) |
| #24 | Medium | [GHSA-q2hr-2g5m-vwhr](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr) | brace-expansion 5.0.8 → 5.0.13 (patch ≥5.0.12) |
| #9 | High | [GHSA-rgj7-g3m4-5g8c](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c) | sharp 0.35.3 → 0.35.5 (patch ≥0.35.4) |
| #8 | High | [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh) | js-yaml 4.3.0 → 4.3.2 |
| #4 | High | [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj) | js-yaml 4.3.0 → 4.3.2 (patch ≥4.3.1) |

## Dependency paths and automation findings

- Direct development dependency `sharp` serves `scripts/generate-assets.mjs`.
  Its minimum is now `^0.35.5`; matching platform packages and libvips packages
  advance to 0.35.5 and 1.3.4 respectively.
- `eslint@9.39.5` → `@eslint/eslintrc@3.3.6` → `js-yaml` (`^4.3.0`).
  ESLint, eslintrc and `@eslint/config-array@0.21.2` use `minimatch@3.1.5`
  → `brace-expansion` (`^1.1.7`). This unaffected minimatch major stays unchanged.
- `typescript-eslint@8.65.0` → `@typescript-eslint/typescript-estree@8.65.0`
  → minimatch (`^10.2.2`) → brace-expansion 5.x.
- `postcss@8.5.23` → `source-map-js` (`^1.2.1`), and `jsdom@29.1.1`
  → `css-tree@3.2.1` → `source-map-js` (`^1.2.1`); the shared copy is patched.

GitHub automatic security fixes are **enabled and unpaused**. GraphQL reports
`update_not_possible` (incompatible dependency requirements) for #4, #8, #24
and #25. Their current parent ranges actually permit the patched versions;
the reported automation failures do not justify forcing major upgrades.
#9, #26, #27 and #44 expose neither an update error nor a PR. No Dependabot
configuration is tracked. A concrete blocker for #44 is that even the latest
published estree 8.72.2 still requires minimatch 10; the advisory requires ≥11.0.1.
The API does not establish any further scheduler/job cause.

## Compatibility and additional audit fixes

The only override is `@typescript-eslint/typescript-estree@8.65.0` →
`minimatch@11.0.1`. Inspection of the published parent found one consumed API:
`minimatch(path, pattern, { dot: true })`. Version 11 retains that API,
CommonJS loading and the same Node engine range; removed APIs such as `makeRe`
are unused by this parent. A temporary verification passed 204 version 10/11
matching comparisons, plus actual estree project-service parsing of three
allowed files (including a dotfile and brace pattern) and rejection of one
nonmatching file. Reassess/remove this exact-version override when upgrading
TypeScript ESLint. ESLint's minimatch 3 is not overridden.

Live baseline `npm audit` reported **13 vulnerable package entries: 7 moderate,
6 high**, including inherited findings and additional advisories absent from
the eight-alert GitHub snapshot. Semver-compatible lockfile updates also patch
PostCSS's `nanoid` 3.3.16 → 3.3.20
([advisory](https://github.com/advisories/GHSA-2v37-7h3g-55p8)) and React Hooks
ESLint's `zod` 4.4.3 → 4.6.7
([advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)).
Package counts and GitHub advisory counts measure different things.

## Verification status

Verified on Windows with Node **24.19.0** and npm **12.2.0** against the final
minimized lockfile:

| Command | Result |
| --- | --- |
| `npm.cmd ci` | Exit 0; 339 packages installed, 340 audited; 0 vulnerabilities |
| `npm.cmd run check` | Exit 0; lint, bridge TS, 28 test files / 148 tests, `tsc -b`, Vite build and output checks passed |
| `npm.cmd audit` | Exit 0; 0 vulnerabilities |
| `npm.cmd audit --omit=dev` | Exit 0; 0 vulnerabilities |
| `git diff --check` | Exit 0 |

Commands used a local npm cache and explicit fetch timeouts/retries. Homepage
JavaScript was **74,926 gzip bytes**, below the unchanged 204,800-byte budget.
Production lock entries and npm scripts were independently checked unchanged.

Additional verification passed: `npm.cmd ls` for all remediated packages;
all five existing Sharp PNG/WebP/SVG asset pipelines executed successfully to
memory without changing tracked images. Fontconfig emitted unwritable-cache
diagnostics during SVG rendering, but conversion and dimension assertions passed.

Initial sandbox npm/GitHub requests were network-blocked; network-enabled
execution succeeded using a worktree-local npm cache. npm 12's install-script
policy blocked esbuild's postinstall; that policy was not changed, and the full
build nevertheless passed. Linux/CI and end-to-end browser tests were not run.

Residual baseline alerts in the local dependency graph: **none identified**.
Nothing is dismissed, suppressed or hidden. GitHub still reflects the unmodified
remote default branch; its remaining alert count can only be confirmed after
merged updates are analyzed. This work is local only: no push, merge or deploy;
production dependencies, OAuth/Netlify/source behavior and CI thresholds are
unchanged.
