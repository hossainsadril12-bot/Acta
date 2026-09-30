# Acta Next.js Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-dev (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Organise the project folder, then scaffold a Next.js + TypeScript + Tailwind v4 app where every token comes from `design-system/acta/tokens.css` and every visible string comes from `content/site.json`, proven by a hero smoke page.

**Architecture:** A single Next.js App Router app at the project root, running on Node. `content/site.json` is validated by a zod schema at build time and passed into server components as typed props. Tailwind v4 `@theme inline` maps utility names onto the existing semantic CSS variables in `tokens.css`, so dark mode and every theme change stay in that one file. Server code lives in route handlers (`src/app/api/*`).

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4 (`@tailwindcss/postcss`), zod 4, Vitest 4 + Testing Library + jsdom, Playwright, ESLint (`eslint-config-next`), npm, Node 26.

**Spec:** `docs/spine/specs/2026-09-30-nextjs-setup-design.md`

## Global Constraints

- Every visible string, link, price and list lives in `content/site.json`. No copy is hardcoded in `src/`. (CLAUDE.md strict rule.)
- Lists are arrays. Optional fields may be absent, and empty arrays must render without errors.
- No raw hex colours in `src/`. Colours come only from `design-system/acta/tokens.css` via Tailwind utilities or `var(--token)`.
- `design-system/acta/tokens.css` stays the single token source. It is never copied into `src/`.
- Dark mode is handled only by the token blocks in tokens.css (`prefers-color-scheme` and `data-theme`). Do not use Tailwind's `dark:` variant.
- Fonts: Inter + Roboto Mono via `next/font/google`, exposed as `--font-inter` and `--font-roboto-mono`.
- Zero em dashes (`—`) or en dashes (`–`) in any visible string.
- Package manager: npm. The working directory for every command is `D:\Ao acta` (the POSIX path is `/d/Ao acta`). Paths contain spaces, so always quote them.
- Commits are deferred: the user will commit when the website is complete. Skip every "Commit" step and the git init in Task 1 (use mv, not git mv).

## File Structure (seams)

| File | Responsibility | Seam (interface callers rely on) |
|---|---|---|
| `content/site.json` | All page copy and links | JSON shape defined by `siteSchema` |
| `src/content/schema.ts` | Content contract | `siteSchema` (zod), `type SiteContent = z.infer<typeof siteSchema>` |
| `src/content/index.ts` | Load and validate content | `parseSiteContent(input: unknown): SiteContent`, `site: SiteContent` |
| `src/app/globals.css` | Tailwind + token bridge | Utility names: `bg-bg`, `text-text`, `text-text-sub`, `text-text-soft`, `bg-primary`, `text-text-on-primary`, `text-primary`, `border-border`, `bg-card`, `rounded-pill`, `rounded-lg`, `shadow-card`, `text-display`, `text-lead`, `text-ui`, `text-small`, `text-eyebrow`, `leading-display`, `tracking-display`, `tracking-eyebrow`, `font-sans`, `font-mono` |
| `src/app/layout.tsx` | Fonts, `<html lang>`, metadata from content | Default export `RootLayout` |
| `src/app/page.tsx` | Composes sections from `site` | Default export `Page` |
| `src/components/ui/Button.tsx` | Pill link-button | `Button({ href, children, variant?: "primary" \| "ghost" })` |
| `src/components/sections/Hero.tsx` | Hero rendered from data | `Hero({ hero }: { hero: SiteContent["hero"] })` |
| `src/app/api/signup/route.ts` | Email signup stub | `POST(req: Request): Promise<Response>` returning `{ ok: true }` (200) or `{ ok: false, error: "invalid_json" \| "invalid_email" }` (400) |

---

### Task 0 (controller, before BUILD): pin the stack in `.spine/config.md`

The controller does this, not a subagent. Gate C hashes this file.

- [ ] **Step 1: Rewrite `.spine/config.md`**

```markdown
# .spine/config.md — pinned cross-cutting context (asserted before task one)
- Stack:            Next.js 16 (App Router, RSC) + React 19 + TypeScript strict, on Node 26. Tailwind CSS 4 via @tailwindcss/postcss. zod 4 for content validation. npm. Single app at the project root; server code in src/app/api route handlers.
- Test runner:      Vitest 4 (jsdom + Testing Library) for tests/unit, Playwright (chromium) for tests/e2e.
- DB / project / env: None yet. No database, no deploy target. The signup route validates and returns without storing.
- Auth context:     None.
- Conventions:      Tokens only from design-system/acta/tokens.css (via Tailwind @theme inline or var(--token)), no raw hex in src/. All copy from content/site.json validated by src/content/schema.ts. Components follow design-system/acta/MASTER.md and docs/references/nick-analysis/design.md 1:1. Folders: src/app, src/components/{layout,ui,mocks,sections}, src/content, src/lib, tests/{unit,e2e}.
- Boot assertion:   `npm run build` fails loudly when content/site.json does not match the schema (parseSiteContent throws at module load).
```

- [ ] **Step 2: Re-record the assertion hash** (after Task 2 lands, run `npm run build` with a deliberately broken site.json to see it fail, then restore it). Until then, record the hash so BUILD can start:

```bash
cd "/d/Ao acta" && sh "$CLAUDE_PLUGIN_ROOT/hooks/config-hash.sh" .spine/config.md > .spine/config-asserted
```

---

### Task 1: Git init and folder organisation

**Files:**
- Create: `.gitignore`, `README.md`
- Move: `Acta - Brand Identity and Landing Page Copy (1).docx` to `docs/brand/acta-brand-identity.docx`; `Design 1.md` to `docs/references/design-1-nick.md`; `Design 2.md` to `docs/references/design-2-apple.md`; `nick-analysis/` to `docs/references/nick-analysis/`; `Logo 1.svg` to `docs/brand/logo-color.svg`; `logo 2.svg` to `docs/brand/logo-white.svg`
- Create (copies): `public/brand/logo-color.svg`, `public/brand/logo-white.svg`
- Delete: `design-system/acta/.spine/` (a stray hook scaffold; the real one is `.spine/` at the root)
- Modify: `CLAUDE.md`, `design-system/acta/MASTER.md`, `docs/references/nick-analysis/design.md:86`, `design-system/acta/tokens.css:5` (remove the Google Fonts `@import`)

**Interfaces:**
- Consumes: nothing
- Produces: the paths above. Later tasks import `design-system/acta/tokens.css` and read `public/brand/logo-*.svg`.

- [ ] **Step 1: Init git on `main` and commit the current state as-is**

```bash
cd "/d/Ao acta" && git init -b main
```

Write `.gitignore`:

```gitignore
node_modules/
.next/
out/
next-env.d.ts
*.tsbuildinfo
test-results/
playwright-report/
.env*
!.env.example
```

```bash
git add -A && git commit -m "chore: import brand, references and design system

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
git switch -c feat/nextjs-setup
echo "feat/nextjs-setup" > .spine/frame-approved
```

- [ ] **Step 2: Move the files with git**

```bash
cd "/d/Ao acta"
mkdir -p docs/brand docs/references public/brand
git mv "Acta - Brand Identity and Landing Page Copy (1).docx" docs/brand/acta-brand-identity.docx
git mv "Design 1.md" docs/references/design-1-nick.md
git mv "Design 2.md" docs/references/design-2-apple.md
git mv nick-analysis docs/references/nick-analysis
git mv "Logo 1.svg" docs/brand/logo-color.svg
git mv "logo 2.svg" docs/brand/logo-white.svg
cp docs/brand/logo-color.svg public/brand/logo-color.svg
cp docs/brand/logo-white.svg public/brand/logo-white.svg
git rm -r -q design-system/acta/.spine
```

- [ ] **Step 3: Update the path references**

In `CLAUDE.md`:
- line 3: `Acta - Brand Identity and Landing Page Copy (1).docx` becomes `docs/brand/acta-brand-identity.docx`
- lines 43–44: `Logo 1.svg` becomes `docs/brand/logo-color.svg (served copy: public/brand/logo-color.svg)`, and `logo 2.svg` becomes `docs/brand/logo-white.svg (served copy: public/brand/logo-white.svg)`
- line 94: `Design 1.md` becomes `docs/references/design-1-nick.md`, and `Design 2.md` becomes `docs/references/design-2-apple.md`. Add a sentence: "The authoritative getnick.ai analysis is `docs/references/nick-analysis/design.md`; follow it 1:1 for components and layout."
- Add a section after "Design system":

```markdown
## Stack and folders

Next.js 16 (App Router) + TypeScript + Tailwind v4 on Node. Run `npm run dev`. Tests: `npm test` (Vitest) and `npm run test:e2e` (Playwright).

- `content/site.json`: every visible string, link, price and list (schema: `src/content/schema.ts`)
- `src/app`: layout, page, `globals.css` (Tailwind + token bridge), `api/` route handlers
- `src/components/{layout,ui,mocks,sections}`: components, rendered only from content props
- `design-system/acta/`: MASTER.md spec, tokens.css (the only token source), preview.html
- `docs/brand`, `docs/references`, `docs/spine`: brand doc, reference analyses, specs and plans
```

In `design-system/acta/MASTER.md`:
- line 7: `../../Acta - Brand Identity and Landing Page Copy (1).docx` becomes `../../docs/brand/acta-brand-identity.docx`
- line 8 and line 31: `nick-analysis/design.md` becomes `docs/references/nick-analysis/design.md` (line 8 relative form: `../../docs/references/nick-analysis/design.md`)
- line 22: `Design 2.md` becomes `docs/references/design-2-apple.md`
- lines 199 and 404: `Logo 1.svg` becomes `logo-color.svg`, and `logo 2.svg` becomes `logo-white.svg` (served from `public/brand/`)

In `docs/references/nick-analysis/design.md` line 86: `../Design 1.md` becomes `../design-1-nick.md`.

In `design-system/acta/tokens.css`, delete line 5 (the `@import url('https://fonts.googleapis.com/...')`; `preview.html` already links the fonts itself). Replace the two font lines with:

```css
  --font-sans: var(--font-inter, 'Inter'), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --font-mono: var(--font-roboto-mono, 'Roboto Mono'), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

- [ ] **Step 4: Write `README.md`**

```markdown
# Acta landing page

From conversation to execution. Marketing site for Acta, built with Next.js, TypeScript and Tailwind v4.

## Run

    npm install
    npm run dev        # http://localhost:3000
    npm test           # unit tests (Vitest)
    npm run test:e2e   # browser tests (Playwright)

## Where things live

- Edit copy, links and prices in `content/site.json`. Nothing visible is hardcoded.
- The design system is `design-system/acta/MASTER.md`, and `tokens.css` is the only place colours, type and spacing are defined.
- Brand source: `docs/brand/acta-brand-identity.docx`. Reference analysis: `docs/references/nick-analysis/design.md`.
- Project rules: `CLAUDE.md`.
```

- [ ] **Step 5: Verify that no old paths remain**

```bash
cd "/d/Ao acta" && grep -rn --include=*.md --include=*.css --include=*.html -e "Design 1.md" -e "Design 2.md" -e "Logo 1.svg" -e "logo 2.svg" -e "Copy (1).docx" -e "fonts.googleapis.com/css2" CLAUDE.md README.md design-system docs | grep -v "preview.html" ; echo "exit=$?"
```

Expected: no matches except the dated history note in `nick-analysis/design.md` (none expected), and `exit=1` from grep.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: organise brand, references and design system folders

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Tooling base and the content model

**Files:**
- Create: `package.json`, `tsconfig.json`, `vitest.config.ts`, `tests/unit/setup.ts`, `content/site.json`, `src/content/schema.ts`, `src/content/index.ts`
- Test: `tests/unit/content.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `siteSchema`, `type SiteContent`, `parseSiteContent(input: unknown): SiteContent`, `site: SiteContent`; the npm scripts `test`, `typecheck`

- [ ] **Step 1: Create `package.json` and install**

```json
{
  "name": "acta-landing",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

```bash
cd "/d/Ao acta"
npm install next@16 react@19 react-dom@19 zod@4
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss@4 @tailwindcss/postcss eslint eslint-config-next@16 vitest@4 @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test
```

(`motion` and `@phosphor-icons/react` are installed in the sections plan, which is the first plan that uses them.)

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", "tests/**/*.ts", "tests/**/*.tsx", "*.ts", ".next/types/**/*.ts"],
  "exclude": ["node_modules", ".agents", ".claude", "docs", "design-system"]
}
```

- [ ] **Step 3: Create `vitest.config.ts` and `tests/unit/setup.ts`**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/unit/setup.ts"],
  },
});
```

```ts
// tests/unit/setup.ts
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());
```

- [ ] **Step 4: Write the failing content test**

```ts
// tests/unit/content.test.ts
import { describe, expect, it } from "vitest";
import raw from "../../content/site.json";
import { parseSiteContent, site } from "@/content";

const clone = () => structuredClone(raw) as Record<string, any>;

describe("content/site.json", () => {
  it("parses against the schema", () => {
    expect(site.hero.headline).toBe("From conversation to execution.");
    expect(site.features.items).toHaveLength(4);
    expect(site.pricing.tiers.map((t) => t.name)).toEqual(["Starter", "Pro", "Enterprise"]);
  });

  it("rejects content missing a required field", () => {
    const bad = clone();
    delete bad.hero.headline;
    expect(() => parseSiteContent(bad)).toThrow(/content\/site\.json is invalid/);
  });

  it("accepts missing optional fields", () => {
    const c = clone();
    delete c.hero.eyebrow;
    delete c.hero.secondaryCta;
    delete c.hero.microcopy;
    delete c.features.items[0].mock;
    expect(() => parseSiteContent(c)).not.toThrow();
  });

  it("accepts empty lists and lists of any length", () => {
    const c = clone();
    c.features.items = [];
    c.journey.beats = [];
    c.pricing.tiers[0].features.push("A fifth bullet");
    const parsed = parseSiteContent(c);
    expect(parsed.features.items).toEqual([]);
    expect(parsed.pricing.tiers[0].features).toHaveLength(4);
  });

  it("contains no em or en dashes in any string", () => {
    expect(JSON.stringify(raw)).not.toMatch(/[\u2013\u2014]/);
  });
});
```

- [ ] **Step 5: Run it and watch it fail**

Run: `npm test -- tests/unit/content.test.ts`
Expected: FAIL. The imports `../../content/site.json` and `@/content` cannot be resolved.

- [ ] **Step 6: Write `src/content/schema.ts`**

```ts
import { z } from "zod";

const link = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const mock = z.object({
  type: z.enum(["summary", "task", "search", "compose"]),
  uiElement: z.string().min(1).optional(),
  srSummary: z.string().min(1),
});

export const siteSchema = z.object({
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    lang: z.string().min(2),
  }),
  brand: z.object({
    name: z.string().min(1),
    logoLight: z.string().min(1),
    logoDark: z.string().min(1),
    logoAlt: z.string().min(1),
  }),
  nav: z.object({
    items: z.array(link),
    cta: link.optional(),
  }),
  hero: z.object({
    eyebrow: z.string().min(1).optional(),
    headline: z.string().min(1),
    body: z.string().min(1),
    primaryCta: link,
    secondaryCta: link.optional(),
    microcopy: z.string().min(1).optional(),
  }),
  journey: z.object({
    headline: z.string().min(1).optional(),
    beats: z.array(
      z.object({ number: z.string().min(1), title: z.string().min(1), body: z.string().min(1) }),
    ),
  }),
  features: z.object({
    headline: z.string().min(1).optional(),
    items: z.array(
      z.object({
        id: z.string().min(1),
        eyebrow: z.string().min(1).optional(),
        headline: z.string().min(1),
        body: z.string().min(1),
        mock: mock.optional(),
      }),
    ),
  }),
  pricing: z.object({
    headline: z.string().min(1).optional(),
    tiers: z.array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        price: z.string().min(1),
        period: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        features: z.array(z.string().min(1)),
        cta: link,
        highlighted: z.boolean().default(false),
      }),
    ),
  }),
  closing: z.object({
    headline: z.string().min(1),
    body: z.string().min(1).optional(),
    form: z.object({
      action: z.string().min(1),
      label: z.string().min(1),
      placeholder: z.string().min(1),
      submit: z.string().min(1),
      success: z.string().min(1),
      error: z.string().min(1),
    }),
  }),
  footer: z.object({
    links: z.array(link),
    legal: z.string().min(1),
  }),
});

export type SiteContent = z.infer<typeof siteSchema>;
```

- [ ] **Step 7: Write `src/content/index.ts`**

```ts
import { z } from "zod";
import raw from "../../content/site.json";
import { siteSchema, type SiteContent } from "./schema";

export type { SiteContent } from "./schema";

export function parseSiteContent(input: unknown): SiteContent {
  const result = siteSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`content/site.json is invalid:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const site: SiteContent = parseSiteContent(raw);
```

- [ ] **Step 8: Write `content/site.json`** (the copy is word for word from CLAUDE.md; the nav, footer and tier CTA labels are editable defaults, since those are open decisions)

```json
{
  "meta": {
    "title": "Acta: From conversation to execution",
    "description": "Acta turns team chat into organized tasks and instant summaries. Completely in the background.",
    "lang": "en"
  },
  "brand": {
    "name": "Acta",
    "logoLight": "/brand/logo-color.svg",
    "logoDark": "/brand/logo-white.svg",
    "logoAlt": "Acta"
  },
  "nav": {
    "items": [
      { "label": "How it works", "href": "#journey" },
      { "label": "Features", "href": "#features" },
      { "label": "Pricing", "href": "#pricing" }
    ],
    "cta": { "label": "Try Acta free", "href": "#signup" }
  },
  "hero": {
    "eyebrow": "ACTA INTELLIGENCE",
    "headline": "From conversation to execution.",
    "body": "Acta turns team chat into organized tasks and instant summaries. Completely in the background.",
    "primaryCta": { "label": "Try Acta free", "href": "#signup" },
    "secondaryCta": { "label": "Watch the film →", "href": "#film" },
    "microcopy": "Free for teams. Ready in seconds."
  },
  "journey": {
    "beats": [
      { "number": "01", "title": "Talk", "body": "Chat like you always do. Share ideas, discuss updates, make commitments." },
      { "number": "02", "title": "Distill", "body": "Acta listens silently. Missed messages become bullets. Commitments become tasks." },
      { "number": "03", "title": "Deliver", "body": "Deadlines sync to calendars. Questions find instant answers. Work just happens." }
    ]
  },
  "features": {
    "items": [
      {
        "id": "catch-up",
        "eyebrow": "CATCH UP",
        "headline": "Fifty messages. Three bullets.",
        "body": "Step away for hours. Return to complete clarity. Acta synthesizes missed threads into the decisions that matter.",
        "mock": {
          "type": "summary",
          "uiElement": "3 key updates while you were away",
          "srSummary": "Acta summarises a missed channel into three updates: a decision, a blocker and a next step."
        }
      },
      {
        "id": "auto-sync",
        "eyebrow": "AUTO-SYNC",
        "headline": "Said in chat. Set in calendar.",
        "body": "Type \"I'll have this done by Tuesday.\" Acta catches the deadline, assigns the owner, and schedules the task automatically.",
        "mock": {
          "type": "task",
          "uiElement": "Task detected → Added to Sprint Calendar for Tuesday, 5:00 PM",
          "srSummary": "Acta detects a deadline in a chat message and adds the task to the sprint calendar for Tuesday at 5:00 PM."
        }
      },
      {
        "id": "recall",
        "eyebrow": "RECALL",
        "headline": "Ask naturally. Find instantly.",
        "body": "No file names to remember. Just ask what Sarah decided last week. Acta brings up the exact message and file in one tap.",
        "mock": {
          "type": "search",
          "uiElement": "Ask anything: decisions, dates, or files…",
          "srSummary": "A plain-language question returns the exact message and the linked file."
        }
      },
      {
        "id": "compose",
        "eyebrow": "COMPOSE",
        "headline": "Rough thoughts. Polished updates.",
        "body": "Transform messy meeting scribbles into executive summaries or global team translations. Right inside the composer.",
        "mock": {
          "type": "compose",
          "uiElement": "Format into executive summary",
          "srSummary": "Rough bullets in the composer become a polished executive update, with translations."
        }
      }
    ]
  },
  "pricing": {
    "tiers": [
      {
        "id": "starter",
        "name": "Starter",
        "price": "$0",
        "period": "/ month",
        "description": "Essential chat and collaboration.",
        "features": ["Essential chat and collaboration", "50 AI thread summaries / month", "Basic calendar commitment sync"],
        "cta": { "label": "Try Acta free", "href": "#signup" },
        "highlighted": false
      },
      {
        "id": "pro",
        "name": "Pro",
        "price": "$16",
        "period": "/ user / month",
        "features": ["Unlimited AI thread summaries", "Full natural language semantic search", "Integrated drafting assistant", "Unlimited shared calendar integrations"],
        "cta": { "label": "Choose Pro", "href": "#signup" },
        "highlighted": true
      },
      {
        "id": "enterprise",
        "name": "Enterprise",
        "price": "Custom pricing",
        "features": ["Dedicated private LLM instances (zero data training)", "SSO and advanced compliance (SOC2, HIPAA)", "Enterprise workflow and PM connectors (Jira, Linear)"],
        "cta": { "label": "Contact sales", "href": "#contact" },
        "highlighted": false
      }
    ]
  },
  "closing": {
    "headline": "Work that moves itself.",
    "body": "Join modern teams spending less time managing and more time making.",
    "form": {
      "action": "/api/signup",
      "label": "Work email",
      "placeholder": "you@company.com",
      "submit": "Get started free",
      "success": "You're on the list. Check your inbox.",
      "error": "Enter a valid work email."
    }
  },
  "footer": {
    "links": [
      { "label": "Features", "href": "#features" },
      { "label": "Pricing", "href": "#pricing" }
    ],
    "legal": "© 2026 Acta"
  }
}
```

- [ ] **Step 9: Run the tests and the typecheck**

Run: `npm test -- tests/unit/content.test.ts && npm run typecheck`
Expected: 5 tests PASS, and tsc exits 0.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: add typed content model and site.json

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Next.js app, token bridge, fonts and hero smoke page

**Files:**
- Create: `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `playwright.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/ui/Button.tsx`, `src/components/sections/Hero.tsx`
- Test: `tests/unit/hero.test.tsx`, `tests/unit/no-raw-hex.test.ts`, `tests/e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: `site`, `type SiteContent` from `@/content` (Task 2); `design-system/acta/tokens.css` (Task 1)
- Produces: `Button({ href: string; children: React.ReactNode; variant?: "primary" | "ghost" })`, `Hero({ hero }: { hero: SiteContent["hero"] })`, and the Tailwind utility names listed in the File Structure table

- [ ] **Step 1: Write the failing unit tests**

```tsx
// tests/unit/hero.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";
import { site, type SiteContent } from "@/content";

describe("Hero", () => {
  it("renders every hero field from content", () => {
    render(<Hero hero={site.hero} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(site.hero.headline);
    expect(screen.getByText(site.hero.body)).toBeInTheDocument();
    expect(screen.getByText(site.hero.eyebrow!)).toBeInTheDocument();
    expect(screen.getByText(site.hero.microcopy!)).toBeInTheDocument();
    const primary = screen.getByRole("link", { name: site.hero.primaryCta.label });
    expect(primary).toHaveAttribute("href", site.hero.primaryCta.href);
    expect(screen.getByRole("link", { name: site.hero.secondaryCta!.label })).toHaveAttribute(
      "href",
      site.hero.secondaryCta!.href,
    );
  });

  it("updates when only the content changes", () => {
    const edited: SiteContent["hero"] = { ...site.hero, headline: "Edited headline." };
    render(<Hero hero={edited} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Edited headline.");
  });

  it("renders without the optional fields", () => {
    const minimal: SiteContent["hero"] = {
      headline: site.hero.headline,
      body: site.hero.body,
      primaryCta: site.hero.primaryCta,
    };
    render(<Hero hero={minimal} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
```

```ts
// tests/unit/no-raw-hex.test.ts
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

describe("design tokens", () => {
  it("src/ contains no raw hex colours", () => {
    const offenders = files("src")
      .filter((f) => /\.(tsx?|css)$/.test(f))
      .filter((f) => /#[0-9a-fA-F]{3,8}\b/.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 2: Run them and watch them fail**

Run: `npm test -- tests/unit/hero.test.tsx tests/unit/no-raw-hex.test.ts`
Expected: the hero test fails (`@/components/sections/Hero` is not found). no-raw-hex fails with ENOENT only if `src/` is missing (it exists from Task 2, so it passes).

- [ ] **Step 3: Write the config files**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = { reactStrictMode: true };

export default nextConfig;
```

```js
// postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };
```

```js
// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**", "node_modules/**", ".agents/**", ".claude/**", "docs/**",
    "design-system/**", "playwright-report/**", "test-results/**", "next-env.d.ts",
  ]),
]);
```

```ts
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: "http://localhost:3100" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npm run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
```

- [ ] **Step 4: Write `src/app/globals.css` (the token bridge)**

```css
@import "tailwindcss";
@import "../../design-system/acta/tokens.css";

/* Tailwind utilities point at the semantic tokens in design-system/acta/tokens.css.
   `inline` makes each utility emit var(--token) directly, so light/dark values
   always come from tokens.css. The default Tailwind palette and scales are
   cleared so no off-system colour or size can be used. */
@theme inline {
  --color-*: initial;
  --font-*: initial;
  --text-*: initial;
  --radius-*: initial;
  --shadow-*: initial;
  --spacing: 4px;

  --color-bg: var(--color-bg);
  --color-bg-tint: var(--color-bg-tint);
  --color-bg-subtle: var(--color-bg-subtle);
  --color-text: var(--color-text);
  --color-text-sub: var(--color-text-sub);
  --color-text-soft: var(--color-text-soft);
  --color-text-on-primary: var(--color-text-on-primary);
  --color-primary: var(--color-primary);
  --color-primary-hover: var(--color-primary-hover);
  --color-primary-active: var(--color-primary-active);
  --color-primary-tint: var(--color-primary-tint);
  --color-accent: var(--color-accent);
  --color-border: var(--color-border);
  --color-border-strong: var(--color-border-strong);
  --color-rail: var(--color-rail);
  --color-focus: var(--color-focus);
  --color-card: var(--color-card);
  --color-card-border: var(--color-card-border);
  --color-card-sub: var(--color-card-sub);
  --color-bubble: var(--color-bubble);
  --color-on-bubble: var(--color-on-bubble);
  --color-tag-decision: var(--color-tag-decision);
  --color-tag-blocker: var(--color-tag-blocker);
  --color-tag-next: var(--color-tag-next);
  --color-ai-glow: var(--color-ai-glow);
  --color-success: var(--color-success);
  --color-error: var(--color-error);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);

  --text-display: var(--text-display);
  --text-h2: var(--text-h2);
  --text-h3: var(--text-h3);
  --text-lead: var(--text-lead);
  --text-body: var(--text-body);
  --text-ui: var(--text-ui);
  --text-small: var(--text-small);
  --text-eyebrow: var(--text-eyebrow);
  --text-micro: var(--text-micro);
  --text-price: var(--text-price);

  --leading-display: var(--leading-display);
  --leading-heading: var(--leading-heading);
  --leading-body: var(--leading-body);
  --leading-ui: var(--leading-ui);

  --tracking-display: var(--tracking-display);
  --tracking-heading: var(--tracking-heading);
  --tracking-eyebrow: var(--tracking-eyebrow);

  --radius-none: var(--radius-none);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-pill: var(--radius-pill);

  --shadow-card: var(--shadow-card);
  --shadow-ai-glow: var(--shadow-ai-glow);
  --shadow-popover: var(--shadow-popover);
}

@layer base {
  html {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  body {
    font-size: var(--text-body);
    line-height: var(--leading-body);
  }
}
```

If `next build` reports a circular or unresolved variable in the `@theme inline` block, stop and report it; do not work around it by pasting hex values.

- [ ] **Step 5: Write `src/app/layout.tsx` and `src/app/page.tsx`**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { site } from "@/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono", display: "swap" });

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.meta.lang} className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// src/app/page.tsx
import { site } from "@/content";
import { Hero } from "@/components/sections/Hero";

export default function Page() {
  return (
    <main id="main">
      <Hero hero={site.hero} />
    </main>
  );
}
```

- [ ] **Step 6: Write `Button` and `Hero`**

```tsx
// src/components/ui/Button.tsx
type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

const base =
  "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-pill px-5 text-ui font-medium " +
  "transition-colors duration-(--dur-fast) ease-(--ease-out) active:translate-y-px " +
  "focus-visible:outline-none focus-visible:shadow-(--ring-focus)";

const variants = {
  primary: "bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-active",
  ghost: "text-text hover:bg-primary-tint",
} as const;

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}
```

```tsx
// src/components/sections/Hero.tsx
import type { SiteContent } from "@/content";
import { Button } from "@/components/ui/Button";

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto flex max-w-(--container) flex-col items-center px-(--gutter) pt-24 pb-16 text-center"
    >
      {hero.eyebrow && (
        <p className="mb-5 font-mono text-eyebrow uppercase tracking-eyebrow text-primary">{hero.eyebrow}</p>
      )}
      <h1
        id="hero-title"
        className="max-w-[16ch] text-display leading-display font-semibold tracking-display text-text"
      >
        {hero.headline}
      </h1>
      <p className="mt-6 max-w-[40ch] text-lead text-text-sub">{hero.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
        {hero.secondaryCta && (
          <Button href={hero.secondaryCta.href} variant="ghost">
            {hero.secondaryCta.label}
          </Button>
        )}
      </div>
      {hero.microcopy && <p className="mt-4 text-small text-text-soft">{hero.microcopy}</p>}
    </section>
  );
}
```

- [ ] **Step 7: Run the unit tests**

Run: `npm test`
Expected: all tests in `content`, `hero` and `no-raw-hex` PASS.

- [ ] **Step 8: Write the e2e smoke test**

```ts
// tests/e2e/smoke.spec.ts
import { expect, test } from "@playwright/test";
import site from "../../content/site.json" with { type: "json" };

for (const width of [390, 768, 1440]) {
  test(`hero renders from content at ${width}px without horizontal scroll`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.hero.headline);
    await expect(page.getByRole("link", { name: site.hero.primaryCta.label })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
}

test("light theme uses the brand tokens", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  expect(bg).toBe("rgb(255, 255, 255)");
  const cta = page.getByRole("link", { name: site.hero.primaryCta.label });
  await expect(cta).toHaveCSS("background-color", "rgb(114, 58, 197)");
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(font.toLowerCase()).toContain("inter");
});

test("dark theme follows the system preference through tokens.css", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  expect(bg).toBe("rgb(18, 11, 32)");
});

test("keyboard focus is visible on the primary CTA", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const cta = page.getByRole("link", { name: site.hero.primaryCta.label });
  await expect(cta).toBeFocused();
  const shadow = await cta.evaluate((el) => getComputedStyle(el).boxShadow);
  expect(shadow).not.toBe("none");
});
```

- [ ] **Step 9: Install the browser, then run lint, typecheck, build and e2e**

```bash
cd "/d/Ao acta" && npx playwright install chromium && npm run lint && npm run typecheck && npm run test:e2e
```

Expected: lint and typecheck exit 0, and 6 Playwright tests PASS. If the `inter` font check fails because next/font renames the family (for example `__Inter_abc123`), assert `toContain("inter")` case-insensitively as written, since the generated name still contains "Inter".

- [ ] **Step 10: Prove the content-only edit (manual check, CLAUDE.md requirement)**

Change `hero.headline` in `content/site.json` to `Edited from content.`, run `npm run build && npm run start -- -p 3100`, and confirm that the page shows the new headline. Revert the edit.

Then confirm the boot assertion: delete `"headline"` from `hero`, run `npm run build`, and confirm that it fails with `content/site.json is invalid`. Revert.

- [ ] **Step 11: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js app with token bridge and hero from content

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Signup route handler stub

**Files:**
- Create: `src/app/api/signup/route.ts`
- Test: `tests/unit/signup-route.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks (`closing.form.action` in site.json already points at `/api/signup`)
- Produces: `POST(req: Request): Promise<Response>`, with 200 `{ ok: true }`, 400 `{ ok: false, error: "invalid_json" }`, and 400 `{ ok: false, error: "invalid_email" }`

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/signup-route.test.ts
// @vitest-environment node
import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/signup/route";

const req = (body: string) =>
  new Request("http://localhost/api/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });

describe("POST /api/signup", () => {
  it("accepts a valid email", async () => {
    const res = await POST(req(JSON.stringify({ email: "maya@northwind.io" })));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("rejects an invalid email", async () => {
    const res = await POST(req(JSON.stringify({ email: "not-an-email" })));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_email" });
  });

  it("rejects a body that is not JSON", async () => {
    const res = await POST(req("{oops"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_json" });
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- tests/unit/signup-route.test.ts`
Expected: FAIL. `@/app/api/signup/route` cannot be resolved.

- [ ] **Step 3: Implement the route**

```ts
// src/app/api/signup/route.ts
import { z } from "zod";

const signupBody = z.object({ email: z.email() });

// Validates only. Storage is added when a database is chosen.
export async function POST(req: Request): Promise<Response> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!signupBody.safeParse(json).success) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  return Response.json({ ok: true }, { status: 200 });
}
```

- [ ] **Step 4: Run the full suite and the build**

Run: `npm test && npm run typecheck && npm run build`
Expected: all unit tests PASS, and the build succeeds with the route `/api/signup` listed as dynamic.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add signup route handler stub with validation

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

## Self-review

- **Spec coverage:**
  - Folder moves, git and path updates: Task 1.
  - Scaffold, TypeScript, Tailwind v4, Vitest, Playwright and ESLint: Tasks 2 and 3.
  - zod content model and site.json: Task 2.
  - Token bridge, fonts and dark mode: Task 3.
  - Hero smoke page and the content-only edit proof: Task 3.
  - Signup stub: Task 4.
  - config.md: Task 0.
  - Phosphor and motion are deferred to the sections plan (YAGNI; nothing here uses them).
- **Placeholders:** none. The open brand decisions are real editable values in site.json.
- **Type consistency:** `SiteContent["hero"]` is used in Hero and in its tests. `parseSiteContent` and `site` are exported from `src/content/index.ts` and imported as `@/content` everywhere.
