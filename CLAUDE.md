# Acta — Landing Page Project

Source of truth: `docs/brand/acta-brand-identity.docx`. If this file and the docx disagree, the docx wins; update this file to match.

## STRICT RULE — Content must be editable

All copy, prices, links, and UI-mock text must be changeable without touching layout or component code.

- **Never hardcode copy in markup or components.** Every visible string (headlines, eyebrows, body, CTAs, micro-copy, UI callouts, pricing tiers, plan features, nav, footer, alt text, meta title and description) lives in one content source, e.g. `content/site.json` (or `.ts`/`.md` if the stack needs it).
- Components render from that data. Adding, removing, or reordering a feature, beat, pricing tier, or plan bullet must be a content-only edit, with no code change.
- **Lists are arrays**, never fixed counts. A tier with 5 bullets instead of 4 must still render.
- **Brand tokens are also data:** colors, fonts, and logo paths live as CSS custom properties or tokens in one place. Never scatter raw hex values through components.
- Links and CTA targets (signup URL, film URL, form action) are content fields, never inline.
- Layouts must tolerate content changes: longer or shorter headlines, missing optional fields (for example, no UI callout), and an empty list must not break the layout.
- A change is not done until you've checked that editing the content file alone updates the page.

## Brand

- **Name:** Acta
- **Value proposition:** From conversation to execution.
- **Category:** AI-powered team workspace (a virtual project manager inside team chat).
- **Narrative:** Unlike passive messaging tools, Acta works continuously in the background. It organizes conversations, schedules commitments, and synthesizes information with no manual management.
- **Voice:** Apple-style minimalism. Short, rhythmic paired sentences ("Fifty messages. Three bullets."). Calm and confident, no hype. Keep coming back to Acta working on its own.

## Color system (monochrome Electric Violet / Iris)

| Token | Hex | Use |
|---|---|---|
| `--acta-primary` | `#723AC5` | Primary brand, CTAs |
| `--acta-accent` | `#B78AF7` | Glowing UI borders, active tags, hover |
| `--acta-surface-tint` | `#F4EFFF` | Light-mode cards, chips, search tags |
| `--acta-base` | `#120B20` | Dark-mode background, sidebar, frames |
| `--acta-elevated` | `#1D1432` | Floating chat containers, AI preview cards |

Visual rules: monolithic geometric minimalism (references: Astruct, Shift.). High-contrast negative space and single-tone geometry. The mark must stay legible at 16px (favicon).

## Typography

The fonts embedded in the docx are **Inter** (UI and body) and **Roboto Mono** (eyebrows, labels, UI-mock metadata).

## Logo

- `docs/brand/logo-color.svg` (served copy `public/brand/logo-color.svg`): color version for light backgrounds (violet mark `#622DDE`, wordmark `#333333`).
- `docs/brand/logo-white.svg` (served copy `public/brand/logo-white.svg`): all-white version for dark backgrounds.
- Mark: two slanted parallelograms forming an abstract "A", followed by the lowercase wordmark "acta".

## Four locked core features

1. **Instant Thread Summaries:** turns missed conversations into a 3-bullet briefing covering decisions, blockers, and next steps.
2. **Auto-Action Items:** detects commitments in chat ("I'll have the marketing report done by Tuesday") and schedules tracked tasks on shared calendars.
3. **Smart Natural Language Search:** semantic search in plain questions across workspace history ("What did Sarah say about the logo color last week?"). Returns the exact messages and linked files.
4. **Drafting Assistant:** in-composer help that turns bullets into executive briefs, formats release notes, and translates for distributed teams.

## Landing page copy (initial content for `content/site.json`)

### Hero
- Eyebrow: ACTA INTELLIGENCE
- Headline: From conversation to execution.
- Paragraph: Acta turns team chat into organized tasks and instant summaries. Completely in the background.
- Primary CTA: Try Acta free
- Secondary CTA: Watch the film →
- Micro-copy: Free for teams. Ready in seconds.

### User journey — three beats
- 01. Talk: Chat like you always do. Share ideas, discuss updates, make commitments.
- 02. Distill: Acta listens silently. Missed messages become bullets. Commitments become tasks.
- 03. Deliver: Deadlines sync to calendars. Questions find instant answers. Work just happens.

### Feature showcase
| Eyebrow | Headline | Body | UI element |
|---|---|---|---|
| CATCH UP | Fifty messages. Three bullets. | Step away for hours. Return to complete clarity. Acta synthesizes missed threads into the decisions that matter. | Callout: "3 key updates while you were away" |
| AUTO-SYNC | Said in chat. Set in calendar. | Type "I'll have this done by Tuesday." Acta catches the deadline, assigns the owner, and schedules the task automatically. | Callout: "Task detected → Added to Sprint Calendar for Tuesday, 5:00 PM" |
| RECALL | Ask naturally. Find instantly. | No file names to remember. Just ask what Sarah decided last week. Acta brings up the exact message and file in one tap. | Search placeholder: "Ask anything: decisions, dates, or files…" |
| COMPOSE | Rough thoughts. Polished updates. | Transform messy meeting scribbles into executive summaries or global team translations. Right inside the composer. | Action tag: "Format into executive summary" |

### Pricing
- **Starter: $0 / month.** Essential chat and collaboration. 50 AI thread summaries / month. Basic calendar commitment sync.
  - Internal note (not page copy): top-of-funnel acquisition for students and small teams.
- **Pro: $16 / user / month.** Unlimited AI thread summaries. Full natural language semantic search. Integrated drafting assistant. Unlimited shared calendar integrations.
- **Enterprise: custom pricing.** Dedicated private LLM instances (zero data training). SSO and advanced compliance (SOC2, HIPAA). Enterprise workflow and PM connectors (Jira, Linear).

### Closing CTA
- Headline: Work that moves itself.
- Sub-copy: Join modern teams spending less time managing and more time making.
- Action: work email input → "Get started free"

## Design system

`design-system/acta/MASTER.md` is the design system (tokens, components, content model, rules). Read it before building any UI. Page overrides go in `design-system/acta/pages/`. The contrast proof is `design-system/acta/design-a11y.md`.

## Stack and folders

Next.js 16 (App Router) + TypeScript + Tailwind v4 on Node. Run `npm run dev`. Tests: `npm test` (Vitest) and `npm run test:e2e` (Playwright).

- `content/site.json`: every visible string, link, price and list (schema: `src/content/schema.ts`)
- `src/app`: layout, page, `globals.css` (Tailwind + token bridge), `api/` route handlers
- `src/components/{layout,ui,mocks,sections}`: components, rendered only from content props
- `design-system/acta/`: MASTER.md spec, tokens.css (the only token source), preview.html
- `docs/brand`, `docs/references`, `docs/spine`: brand doc, reference analyses, specs and plans

## Reference files (not Acta's brand)

`docs/references/design-1-nick.md` (getnick.ai) and `docs/references/design-2-apple.md` (Apple iPad Pro) are extracted design systems from other sites. The authoritative getnick.ai analysis is `docs/references/nick-analysis/design.md`: follow it 1:1 for components and layout, changing only the brand tokens. Use them only as references for layout rhythm, type scale, and motion. Never take their colors, fonts, or brand. Their quality bar does apply: WCAG 2.2 AA, visible keyboard focus, and states defined for every interactive component.

## Open decisions (confirm before assuming)

- Logo violet `#622DDE` vs. palette primary `#723AC5`: which is canonical?
- Target for "Watch the film →" (no film exists yet; use a placeholder field).
- Signup and email form destination (keep it as a content field).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
