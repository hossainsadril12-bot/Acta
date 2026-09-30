# Acta landing page: project organisation and Next.js setup

Date: 2026-09-30. Status: approved by the user on 2026-09-30.

## Goal

Tidy the project folder, then scaffold the landing page as a Next.js app. The Acta design system (`design-system/acta/`) drives every visual, and `content/site.json` drives every visible string, per the CLAUDE.md strict rule. This spec covers setup and foundations only. The page sections get their own plan after this.

## Decisions (confirmed by the user)

| Topic | Choice |
|---|---|
| Framework | Next.js (App Router, React Server Components), running on Node.js |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS v4, with `@theme` mapped onto `design-system/acta/tokens.css` |
| Structure | Single Next.js app. Backend code lives in Next route handlers, and a database is added later inside the same app if needed |
| Tests | Vitest (content schema, components) + Playwright (responsive, dark mode, reduced motion, accessibility smoke) |
| Package manager | npm (it is the only one installed) |

## Assumptions (not asked; change any before approval)

- **Icons:** `@phosphor-icons/react`, at regular weight. The preview's hand-drawn icons (hash, calendar, search, check, sparkle) get Phosphor equivalents. The Acta logo mark stays our own SVG.
- **Content validation:** `zod` validates `content/site.json` at build time, so a missing or misspelled field fails the build instead of breaking the page.
- **Fonts:** Inter and Roboto Mono load via `next/font/google` (self-hosted at build time). The Google Fonts `@import` moves out of `tokens.css` and into `preview.html`, so the token file carries tokens only.
- **Motion:** `motion` (`motion/react`) for scroll reveals and the scripted mock demos. There is no GSAP, and every animation has a reduced-motion final state.
- **Git:** initialise a repository with a `main` branch, and do the work on a feature branch.
- **Open brand decisions stay open as content fields:** the film URL, the signup destination, and the nav/footer labels. The logo violet (#622DDE vs #723AC5) stays as shipped until the user decides.

## Folder organisation

Only the files marked "move" change location. Every path reference in CLAUDE.md and MASTER.md is updated in the same step.

```
D:\Ao acta\
  CLAUDE.md                      project rules (paths updated)
  README.md                      new: how to run, where things live
  docs/
    brand/
      acta-brand-identity.docx   move from "Acta - Brand Identity and Landing Page Copy (1).docx"
    references/
      design-1-nick.md           move from "Design 1.md"
      design-2-apple.md          move from "Design 2.md"
      nick-analysis/             move from nick-analysis/
    spine/specs/                 design docs (this file)
  design-system/acta/            unchanged location: MASTER.md, tokens.css, design-a11y.md, preview.html, pages/
  content/
    site.json                    every visible string, link, price and list
  public/brand/
    logo-color.svg               copy of "Logo 1.svg" (the originals move to docs/brand/)
    logo-white.svg               copy of "logo 2.svg"
  src/
    app/
      layout.tsx                 fonts, theme, metadata from content
      page.tsx                   composes sections from content
      globals.css                Tailwind + @import of design-system tokens + @theme map
      api/signup/route.ts        POST stub: validates the email, returns 200, no storage yet
    content/
      schema.ts                  zod schema for site.json and the exported types
      index.ts                   loads, validates and exports the content
    components/
      layout/                    Ledger (container + rails), HatchBand, CornerMark, Nav, Footer
      ui/                        Button, Pill, Eyebrow, Card, ChatRow, TypingDots, MicroTag, Segmented, Field
      mocks/                     SummaryMock, TaskMock, SearchMock, ComposeMock, AppShowcase
      sections/                  Hero, Journey, FeatureGrid, Pricing, ClosingCta
    lib/                         small helpers (cn, reduced-motion hook)
  tests/
    unit/                        Vitest: content schema, component rendering from data
    e2e/                         Playwright: 390 / 768 / 1440 px, light and dark, reduced motion
```

## Design system wiring

- **One source for tokens:** `design-system/acta/tokens.css`. `globals.css` imports it and maps the semantic tokens into Tailwind v4 `@theme` (for example `--color-card` becomes `bg-card`, and `--radius-lg` becomes `rounded-lg`). Components use only these utilities or `var(--token)`. No raw hex values appear in `src/`.
- **Dark mode:** handled by the existing token blocks (`prefers-color-scheme` plus `data-theme`). Tailwind's `dark:` variant is not used, so all theme logic stays in tokens.css.
- **Components follow MASTER.md §7 and `docs/references/nick-analysis/design.md` 1:1.** Only the brand tokens change.
- **Page overrides:** if the landing page needs anything MASTER.md does not cover, it goes in `design-system/acta/pages/landing.md` first, then into code.

## Content model

- `content/site.json` holds: meta, nav, hero, journey beats[], features[] (each with an eyebrow, headline, body and a `mock` of type `summary | task | search | compose` plus its data), pricing tiers[] (each with features[]), the closing CTA, footer, and links.
- Every list is an array. Optional fields (a UI callout, an eyebrow) may be missing without breaking the layout.
- The initial values are the CLAUDE.md landing copy, word for word.
- Done check: changing one string in site.json and reloading changes the page, with no code edit. A unit test covers this.

## Scope

**In scope for this setup:**
- Move and rename the files.
- git init.
- Scaffold Next.js with TypeScript, Tailwind v4, Vitest, Playwright, ESLint and the zod content loader.
- Wire the fonts and tokens, and create site.json.
- Build a smoke page that renders the hero from content, proving the chain works.

**Next plan (out of scope here):**
- All landing sections and the mock components.
- The motion demos.
- The pricing layout.
- The signup storage and database.
- Deployment (Vercel or other).
- The Apple analysis (declined by the user).

## Risks

- Tailwind v4 has to import a CSS file from outside `src/` (`design-system/`). If PostCSS resolution fails, a build step copies tokens.css into `src/styles/`, and the design-system copy stays the source.
- Moving the docx and the reference files breaks relative links in MASTER.md. They are updated in the same task, and a grep check confirms that no old paths remain.
