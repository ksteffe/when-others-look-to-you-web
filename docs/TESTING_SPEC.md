# Testing specification

Living document: adjust phases as we learn; check boxes when done.

## Goals

- Catch regressions in **pure logic** (content helpers, metadata, API route) quickly and cheaply.
- Protect **user-critical flows** (newsletter submit, navigation smoke) without testing every pixel.
- Keep CI **fast**: unit tests seconds; full E2E optional or on main only.

## Non-goals (initially)

- Visual regression / screenshot testing for every section.
- 100% line coverage across React sections.

## Stack (recommended)

| Layer        | Tool                         | Notes                                      |
|-------------|------------------------------|--------------------------------------------|
| Unit / DOM  | **Vitest** + **React Testing Library** | Aligns with Next.js ecosystem; fast watch mode. |
| Assertions  | `@testing-library/jest-dom`  | Optional matchers for RTL.                 |
| E2E | **Playwright**               | Smoke paths only; CI runs after production build. |

**Scripts:**

- `npm run test` — Vitest once.
- `npm run test:watch` — Vitest watch.
- `npm run test:e2e` — Playwright smoke (`e2e/smoke.spec.ts`).

---

## Phase 0 — Tooling bootstrap

**Done when:**

- [x] `vitest`, `@vitejs/plugin-react`, `jsdom` (or Vitest’s environment), `@testing-library/react`, `@testing-library/jest-dom`, `@types/node` aligned — installed as devDependencies.
- [x] `vitest.config.ts` (or `vitest.config.mts`) with path alias `@/` → project root (match `tsconfig`).
- [x] `npm run test` runs successfully (`lib/cn.test.ts` smoke test + `@/` alias check).
- [x] CI: `.github/workflows/ci.yml` runs **lint**, **test**, and **production build** on push/PR to `main`/`master`.

---

## Phase 1 — `lib/` (highest ROI)

**Scope:** Pure functions; no browser.

| Module / symbol | Cases to cover |
|-----------------|----------------|
| `content.ts` — `getPatternBySlug` | Known slug returns pattern; unknown → `undefined`. |
| `getAllPatterns` | Length matches `patterns`; stable order (same as source array). |
| `getPatternsByCategory` | Each `PatternGroupId` returns only members of that group; empty category if none. |
| `getRelatedPatterns` | Order matches `detail.relatedPatterns`; entries include `linkText`. |
| `resolveRelatedPatterns` | Unknown slug throws (or document behavior if changed). |
| `getPatternsGrouped` | Groups appear in `patternGroupOrder`; every pattern appears exactly once. |
| `formatIdeaDefinitionSentence` | Concatenates block segments correctly. |
| `metadata.ts` — `buildPageMetadata` | Canonical path, `title`/`description`, OG/Twitter; overrides `openGraphTitle` / `openGraphDescription` when provided. |
| `buildPatternMetadata` | Description fallback: `seo.description` → `summary` → card `description`. |
| `buildPatternJsonLd` | `@type`, `name`, `description`, `author`, `keywords`, `url` shape; stable with one fixture pattern object. |
| `buildHomeMetadata` | Absolute title behavior vs template (assert shape). |
| `cn.ts` | Skip unless logic grows beyond `twMerge`. |

**Done when:**

- [x] Above cases implemented and green (`lib/content.test.ts`, `lib/metadata.test.ts`; `lib/cn.test.ts` from Phase 0).
- [x] No snapshot of entire `content.ts` dump — uses **`attention-finds-a-focus`** and minimal `IdeaDefinitionBlock` / overrides only.

---

## Phase 2 — `app/api/subscribe/route.ts`

**Scope:** HTTP boundary; mock outbound calls.

| Case | Expected |
|------|----------|
| Invalid / missing email | 4xx + JSON error body. |
| Valid email + mocked upstream success | 2xx path; body shape documented. |
| Upstream failure | Handled; no uncaught throw. |
| Missing env (e.g. API key) | Documented status / message for operators. |

**Done when:**

- [x] Tests call exported `POST` with `Request` + JSON body (`app/api/subscribe/route.test.ts`).
- [x] Real network never hit in tests (`fetch` stubbed via `vi.stubGlobal`).

---

## Phase 3 — App routes (light integration)

**Scope:** Deterministic outputs; avoid spinning full `next dev` where possible.

| File | Cases |
|------|--------|
| `app/sitemap.ts` | Contains `/`, `/idea`, `/patterns`, each `/patterns/:slug` from `getAllPatterns()`; URL host from env or default. |
| `app/robots.ts` | Rules match product intent (allow all vs disallow paths). |
| `app/patterns/[slug]/page.tsx` | `generateStaticParams` slug list equals `getAllPatterns().map(slug)` (or equivalent). |

**Done when:**

- [x] Default exports tested in **`app/sitemap.test.ts`**, **`app/robots.test.ts`**; **`generateStaticParams`** in **`app/patterns/[slug]/page.test.ts`**.

---

## Phase 4 — Components (targeted)

**Scope:** Interactive and branching UI only.

| Component | Cases |
|-----------|--------|
| `NewsletterForm` | Submit triggers `fetch` POST with JSON body; loading disables inputs; success / error messages with mocked `fetch`. |
| `Button` | With `href` renders link; without `href` renders `<button>`. |

**Done when:**

- [x] RTL tests run in `jsdom`; no real API calls.

---

## Phase 5 — E2E smoke (optional)

**Scope:** Playwright; **smoke only**.

| Path | Check |
|------|--------|
| `/` | 200; visible main landmark / hero. |
| `/patterns` | 200; list or heading present. |
| One `/patterns/[slug]` | 200; title visible. |
| `/idea` | 200; definition block or JSON-LD present (pick one assertion). |

**Done when:**

- [x] `playwright.config.ts` targets local `baseURL` (`http://127.0.0.1:3000`).
- [x] CI runs E2E only if `npm run build && npm run start` acceptable for pipeline duration—or manual gate.

---

## Review checklist (before merging each phase)

- Tests are **deterministic** (no wall-clock flakiness).
- **Mocks** documented (what is stubbed and why).
- **Fixtures** minimal — don’t copy entire `content.ts` into tests.
- **`npm run test`** passes locally and in CI.

---

## Execution order (run through)

1. Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 (optional).
2. After each phase: quick review (this doc + PR), then merge before expanding scope.

---

## Open decisions (fill in during review)

- CI provider: GitHub
- Minimum Node version: 20
- E2E in CI: yes / no / main-only: Yes
