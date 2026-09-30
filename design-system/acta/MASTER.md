# Acta Design System — MASTER

Global source of truth for the Acta landing page. Page-specific overrides go in `pages/<page>.md` and win over this file.

- **Tokens:** `tokens.css` (every value below lives there; components use semantic tokens only)
- **Contrast proof:** `design-a11y.md` (18 pairs, all ≥ AA)
- **Brand + copy source:** `../../docs/brand/acta-brand-identity.docx`, summarised in `../../CLAUDE.md`
- **Structural reference:** `../../docs/references/nick-analysis/design.md` (getnick.ai). Layout grammar borrowed; colour, type, and brand are not.

---

## 0. Design intent (one sentence)

A quiet, ruled, white page where the only thing that glows is Acta's work: violet light marks everything the AI produced.

### What we take from each source

| Source | Taken | Rejected |
|---|---|---|
| Brand doc | Monochrome violet palette, Inter + Roboto Mono, Apple-style minimal copy, 4 locked features, "works in the background" narrative, 16px-scalable geometry | — |
| getnick.ai | Ruled "ledger" frame (rails, full-bleed rules, hatch bands, corner marks), intro-block then cell-grid section grammar, square page vs rounded product UI, live product mocks instead of illustration, pill marketing controls, featured pricing column filled with brand colour | Blue/green, duplet, sub-AA CTA contrast, 32–36px touch targets, missing focus rings, no eyebrows |
| Apple (docs/references/design-2-apple.md) | Large centred display type, generous vertical rhythm, one idea per viewport, film CTA pattern ("Watch the film →") | SF Pro, blue links |
| ui-ux-pro-max | Pricing-focused conversion rules, stagger reveal motion, reduced-motion handling, focus + 44px target rules, pre-delivery checklist | Its generic indigo/emerald palette and Plus Jakarta Sans (they conflict with the locked brand) |

---

## 1. Brand principles

1. **Violet means Acta did it.** `--color-ai-glow` (#B78AF7) glow borders, the sparkle mark, and violet highlights appear only on AI output (summaries, detected tasks, search answers, polished drafts). Human messages are never violet. This is the ONE brand thing: it makes "works in the background" visible.
2. **Monochrome discipline.** One hue (violet) plus violet-tinted neutrals. No second brand colour. Status colours (success/error) exist only inside product mocks and forms.
3. **The page is a ledger, the product is a card.** Page structure is square, white, and ruled with hairlines. Product mocks are white cards (20px radius, soft stacked shadow) built 1:1 from the getnick.ai analysis (`docs/references/nick-analysis/design.md`). The contrast between square page cells and rounded cards makes the mocks read as real software placed on the page.
4. **Pairs, not paragraphs.** Copy is written as rhythmic couplets ("Said in chat. Set in calendar."). Layout gives each couplet room: one headline per viewport block and no competing text.
5. **Content is data.** Every string, list, price, and link comes from `content/site.json` (see §8). Components must tolerate any length and any count.

---

## 2. Color

### 2.1 Brand scale (primitives)

| Token | Hex | Note |
|---|---|---|
| `--violet-50` | #FAF7FF | Subtle page wash |
| `--violet-100` | #F4EFFF | **Brand:** surface tint (chips, tags, search tags) |
| `--violet-200` | #E7DCFD | Tint hover |
| `--violet-300` | #D3BCFB | Strong borders |
| `--violet-400` | #B78AF7 | **Brand:** highlight / accent / AI glow |
| `--violet-500` | #8F5BE0 | Interpolated; charts only |
| `--violet-600` | #723AC5 | **Brand:** primary |
| `--violet-700` | #5E2BAA | Primary hover |
| `--violet-800` | #4E2290 | Primary pressed |
| `--violet-900` | #1D1432 | **Brand:** elevated card surface |
| `--violet-950` | #120B20 | **Brand:** deep base canvas |

Neutrals are violet-tinted, never pure grey: ink #120B20, sub #4A4458, soft #6E6880, border #E7E1F2.

### 2.2 Semantic tokens (use these in components)

| Token | Light | Dark | Role |
|---|---|---|---|
| `--color-bg` | #FFFFFF | #120B20 | Page, cells |
| `--color-bg-tint` | #F4EFFF | #1D1432 | Chips, highlighted cells, featured areas |
| `--color-text` | #120B20 | #F4EFFF | Headlines, primary labels |
| `--color-text-sub` | #4A4458 | #B8B0CC | Body copy, nav |
| `--color-text-soft` | #6E6880 | #8D84A3 | Micro-copy, captions, meta |
| `--color-primary` | #723AC5 | #B78AF7 | CTAs, links, active states |
| `--color-primary-hover` | #5E2BAA | #D3BCFB | Hover |
| `--color-text-on-primary` | #FFFFFF | #120B20 | Text on primary buttons |
| `--color-primary-tint` | #F4EFFF | violet 12% | Tag and chip fills, selected rows |
| `--color-border` | #E7E1F2 | violet 14% | Component borders |
| `--color-rail` | ink 7% | violet 10% | Ledger lines |
| `--color-focus` | #723AC5 | #B78AF7 | Focus ring |

**Product card tokens** (follow the theme): `--color-card` #FFFFFF / #1D1432, `--color-card-border` #E7E1F2 / violet 16%, `--color-card-sub` #F7F5FB / #170F28, `--color-bubble` #120B20 / #3B2A63 with `--color-on-bubble` white / #F4EFFF. Micro-tag colours: `--color-tag-decision` #723AC5 / #B78AF7, `--color-tag-blocker` #B42318 / #FF8A80, `--color-tag-next` #1B7F4B / #5FD39A.

**Status** (micro-tags inside cards, and forms only): success #1B7F4B (light) / #5FD39A (dark), error #B42318 / #FF8A80.

### 2.3 Contrast (verified, `design-a11y.md`)

- White on primary **6.72:1 AA**. Primary text on white **6.72:1 AA** (Nick's CTA was 4.09 and failed; ours passes).
- Ink on white 19.19, sub 9.30, soft **5.31 AA**. Soft text is safe for micro-copy at 14px.
- Dark theme: text 17.03, sub 9.25, soft 5.45, accent on base 7.30. Ink on accent (dark-mode CTA) 7.30.
- Cards: light card text uses the page pairs above. Dark card (#1D1432): accent 6.67, sub 8.44, success 9.41. Ink bubble: white on #120B20 is 19.19.

### 2.4 Color rules

- Primary fill is used only for conversion CTAs, including the featured Pro plan's CTA.
- `--color-accent` / `--color-ai-glow` is never a text colour on white (it fails at about 2.6:1). Use it for borders, glows, and dark surfaces only.
- No gradients on page surfaces. The scoped exceptions are the violet brand-texture frame around the app showcase and the hero ribbon video (Nick scopes his textures to the hero and app showcase the same way).

---

## 3. Typography

**Families:** `Inter` (everything readable) and `Roboto Mono` (eyebrows, step numbers, timestamps, keyboard hints, in-mock metadata). Both are embedded in the brand doc and free on Google Fonts. Load weights 400/500/600 for Inter and 400/500 for Roboto Mono.

| Token | Size | Weight | Line-height | Tracking | Use |
|---|---|---|---|---|---|
| `display` | clamp 40→72px | 600 | 1.04 | −0.035em | Hero H1, closing H2 (4-word headlines) |
| `h2` | clamp 32→52px | 600 | 1.12 | −0.025em | Feature headlines, section titles |
| `h3` | clamp 22→28px | 600 | 1.2 | −0.02em | Journey beat titles, plan names |
| `lead` | 20px | 400 | 1.5 | −0.01em | Hero paragraph, section intros |
| `body` | 16px | 400 | 1.625 | 0 | Feature body, plan features |
| `ui` | 15px | 500 | 1.45 | −0.005em | Buttons, nav, inputs |
| `small` | 14px | 400 | 1.45 | 0 | Micro-copy, footer links |
| `eyebrow` | 12px mono | 500 | 1 | +0.12em, UPPERCASE | ACTA INTELLIGENCE, CATCH UP, AUTO-SYNC… |
| `step` | 14px mono | 500 | 1 | +0.04em | "01." "02." "03." |
| `micro` | 11px mono | 400 | 1.4 | +0.02em | In-mock timestamps and metadata only |
| `price` | 48px | 600 | 1 | −0.03em | Plan price; the unit ("/ user / month") in `small` + `text-soft` |

Rules:
- Headline weight ceiling is 600. Never use 700+.
- Negative tracking on every size ≥ 22px. Positive tracking only on uppercase mono.
- Headlines use `text-wrap: balance`, and body uses `text-wrap: pretty`. Keep the full stop that ends each headline, because it is part of the voice.
- Body line length is 60–68ch max (`max-width: 34rem` for feature body).
- Mono is a labelling voice, never used for paragraphs.

---

## 4. Space, grid, radius, elevation

### 4.1 Spacing
4px base. The scale is 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128. Density is spacious (marketing). Section padding is 80px on mobile and 96px from 768px. Eyebrow to headline is 16px, headline to body 20px, and body to CTA row 32px.

### 4.2 The ledger frame (layout skeleton)
- Container `--container` 1240px, centred, `border-inline: 1px solid var(--color-rail)` running the full page height.
- Inner gutter `--gutter`: 20px on mobile, 36px from 768px.
- Every section starts with a **full-bleed rule**: a 1px `--color-rail` line spanning the viewport (absolutely positioned at section level, not container level).
- **Corner marks:** 5×5px plus signs (`+`) in `--color-border-strong`, where the full-bleed rule crosses each rail. This is Acta's variant of Nick's dots: plus signs echo the precise-geometry brand.
- **Hatch band: not used.** The user removed Nick's diagonal hatch texture from every section (2026-09-30). Sections are separated by the full-bleed rule and corner marks only.
- **Cells:** gapless grids divided by 1px `--color-rail`. The variants are 1-up (full), 2-up (50/50), 3-up (pricing), and 2×2 (feature summary on mobile collapse).

### 4.3 Radius
| Context | Radius |
|---|---|
| Page structure (cells, pricing columns, bands) | `--radius-none` 0 |
| Marketing controls (buttons, chips, input, toggle, nav hover) | `--radius-pill` |
| In-mock tags, file chips, calendar events | `--radius-sm` 8px |
| Chat bubbles, mock buttons, search field in mock | `--radius-md` 12px |
| Product cards, hero frame | `--radius-lg` 20px |

Never mix contexts. A pill never appears inside a mock except for the AI action tag, and a page cell is never rounded.

### 4.4 Elevation
| Level | Token | Use |
|---|---|---|
| 0 | none + rail lines | Page, cells |
| 1 | `--header-bg` + saturate(180%) blur(24px) + rail bottom border (no shadow) | Sticky header |
| 2 | `--shadow-card` (Nick card-app stack) | Product cards |
| 3 | `--shadow-ai-glow` | AI-produced elements (summary card, detected task, search answer, polished draft) |
| 4 | `--shadow-popover` | Menus, film modal |

The page itself has no shadow. Depth belongs to the product.

---

## 5. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 120ms | Toggle |
| `--dur-press` | 160ms | Press scale (0.97) |
| `--dur-fast` | 180ms | Hover colour and border |
| `--dur-base` | 280ms | Accordion, menu, modal in |
| `--dur-slow` | 480ms | Section reveal |
| `--dur-demo` | 1200ms per step | Scripted mock sequences |
| `--ease-out` | cubic-bezier(.16,1,.3,1) | Entrances |
| `--ease-exit` | cubic-bezier(.4,0,1,1) | Exits (exit = 70% of enter duration) |
| `--ease-hover` | ease | Hover and colour changes |
| `--ease-wipe` | cubic-bezier(.77,0,.175,1) | Heading wipe reveal |
| `--ease-fade` | cubic-bezier(.45,0,.2,1) | Text fade-in |

- **Scroll choreography (after terascape.framer.website, measured frame by frame on 2026-09-30).** Set per element with `reveal(type, delay)` from `src/lib/reveal.ts`; one `RevealObserver` reveals each element once at 15% visibility.
  | Type | Used on | Motion | Terascape source |
  |---|---|---|---|
  | `wipe` | Hero H1, section H2s, feature H3s, closing H2 | `clip-path: inset(0 0 100% 0)` to open, top to bottom, 1500ms `--ease-wipe` | Headline reveal (~1.2s, slow start, fast middle) |
  | `fade` | Eyebrows, lead paragraphs, CTA row, micro-copy, feature body, closing form, footer | Opacity only, 1600ms `--ease-fade` | Text and link fades (~1.4s, no movement) |
  | `slide` | Journey beats, 100ms stagger | 48px from the right + fade, 900ms `--ease-out` | Stat cards sliding in |
  | `tilt` | Pricing columns, 120ms stagger | `perspective(1400px) rotateY(-22deg)` to flat + fade, 1000ms | Process cards swinging in |
- **Smooth scroll (Lenis, as on Terascape):** `SmoothScroll` runs Lenis with `lerp: 0.07` and `wheelMultiplier: 0.85`, so a wheel flick glides for about a second instead of jumping. In-page links glide for 1.4s and land 88px below the top (under the sticky header), with focus moved to the section. Touch keeps native scrolling, and reduced motion turns the smoothing off.
- **Pace:** reveal durations are wipe 1500ms, fade 1600ms, slide 1300ms, tilt 1400ms. Staggers: journey 160ms, pricing 180ms. Hero: H1 150ms, paragraph 450ms, CTA row 600ms, micro-copy 750ms.
- **Scroll-linked (CSS scroll timelines, `@supports (animation-timeline: view())`, no scroll listeners):** the hero copy drifts 96px down and dims as it leaves (Terascape hero, ~0.3px per px); the app card floats ±16px inside its frame (Terascape image parallax); each section's full-bleed rule draws in from the left as it rises into view.
- **Safety:** reveals hide content only when an inline script has set `html.reveal` before paint and motion is allowed; the script un-hides everything if the observer has not started within 3s, and nothing is hidden without JavaScript. Wiped headings are observed through their parent, because a fully clipped element has no visible area. Reduced motion turns every reveal into a 400ms fade and switches off scroll-linked motion.
- **Mock demos** are the product story: each feature mock plays its scripted sequence **once**, when a fifth of the cell is on screen, and never replays. The demo parts start hidden (only when reveals are armed and motion is allowed), so the reader sees the mock build up and never a finished mock that blanks and rebuilds. Every step is a CSS transition, and each mock has its own timeline (`.chat[data-mock]` sets `--t-*`):
  - summary: question 0, reply 500ms, summary card 1100ms, bullets from 1500ms, 150ms apart;
  - task: message 0, "by Tuesday" underline 550ms, calendar card 1100ms, new event drops in 1800ms;
  - search: query types 300ms, "Understood as" chips 1600ms, result card 2000ms;
  - compose: composer 0, AI tag pressed 900ms, polished draft 1300ms.
  Under reduced motion the same order plays as fades.
- Animate only `transform` and `opacity`.
- `prefers-reduced-motion: reduce` means **fewer and gentler, not zero** (Emil Kowalski): all movement stops (no translate, scale, typing, underline draw or line fill; the hero video stays on its poster), but demos still fade in and colour changes keep `--dur-fast`. The resting state of every mock is its **final state**, so no content is hidden behind animation.

**Interaction polish (Emil Kowalski design-engineering pass, 2026-09-30):**
- Press feedback: buttons and icon buttons scale to 0.97 on `:active` over `--dur-press` (160ms) with `--ease-out`.
- Hover and colour changes use `--ease-hover` (`ease`), and every hover rule is gated by `@media (hover: hover) and (pointer: fine)` so taps never stick.
- Transitions name exact properties (never `all`). Only transform and opacity move.
- The mobile menu sheet enters with `@starting-style` (opacity + 6px translate, 200ms ease-out) and closes instantly: exit faster than enter. The menu and close icons crossfade with scale 0.8 and 2px blur.
- The film modal enters from the centre (scale 0.96 + fade, 240ms). Modals are not origin-aware.
- The signup success line fades up 4px on entry. The spinner turns every 0.6s (a faster spinner reads as faster loading).
- The featured plan's corner ticks spread 2px on hover: a rare, delight-level detail.

---

## 6. Generic components

All interactive components define: default, hover, focus-visible, active, disabled, loading (where async), and error (where input). Minimum touch target 44×44px. Focus = `--ring-focus` (2px bg gap + 2px `--color-focus`) and is never removed.

### 6.1 Button
| Variant | Style | Use |
|---|---|---|
| `primary` | `--color-primary` fill, `--color-text-on-primary`, pill | "Try Acta free", "Get started free", Pro plan CTA |
| `secondary` | transparent, 1px `--color-border`, `--color-text` | Starter and Enterprise plan CTAs |
| `ghost-link` | text only, `--color-text`, trailing arrow | "Watch the film →" |
| `nav` | text `--color-text-sub`, pill hover `--color-bg-tint` | Header links |

- Sizes: `md` 44px (header, padding 0 20px) and `lg` 52px (hero, closing CTA, padding 0 28px). Label uses `ui` 15px/500.
- Trailing icon: 16px Phosphor `ArrowRight`, 8px gap. On hover it translates 2px right.
- States: hover goes to `--color-primary-hover`; active scales to 0.98 and goes to `--color-primary-active`; disabled is 40% opacity with `cursor: not-allowed`; loading shows a 16px spinner replacing the icon, keeps the width, and sets `aria-busy="true"`.

### 6.2 Header
- Sticky, 72px tall, 1px rail bottom border. **Frosted glass:** `--header-bg` (white 50% / base 50%) with `backdrop-filter: saturate(180%) blur(24px)` and no bottom shadow (removed at the user request, 2026-09-30); only the 1px rail marks its edge. Where blur is unsupported, or under `prefers-reduced-transparency`, it falls back to the solid `--header-bg-solid`. Write only the unprefixed `backdrop-filter`; the build adds `-webkit-` (hand-writing both made the compiler drop the standard one, so Chrome and Edge showed no blur).
- Anatomy: logo (height 24px) → nav links (content-driven list) → flexible gap → optional theme toggle → primary CTA (`md`).
- Mobile (<768px): logo + CTA + menu button (44px). The menu opens a full-width sheet under the header with links at 52px row height. Esc and outside click close it, and focus returns to the menu button.
- A "Skip to content" link comes first in tab order.

### 6.3 Logo
- Light backgrounds: `logo-color.svg`. Dark backgrounds: `logo-white.svg` (both served from `public/brand/`, originals in `docs/brand/`).
- Mark-only version (the two parallelograms) for the favicon and avatar. It must render at 16px.
- Clear space equals the mark's short-bar height on all sides. Don't recolour it beyond the brand violet, ink, and white.

### 6.4 Eyebrow
Roboto Mono 12px/500, +0.12em, uppercase, `--color-primary`. Optionally preceded by a 6px violet square (the brand geometry). Content-driven, and hidden if the field is empty.

### 6.5 Chip / Tag
- `tag` (marketing): 28px, padding 0 12px, pill, `--color-primary-tint` fill, `--color-primary` text, 13px/500.
- `mock-tag` (in-mock): 22px, padding 0 8px, `--radius-sm`, mono 11px. Variants: `neutral`, `ai` (glow border), `success`, `blocker`.
- Labels never wrap (`white-space: nowrap`). Overflow gets an ellipsis with the full text in `title`.

### 6.6 Text field (email capture)
- 52px, pill, 1px `--color-border`, `--color-bg`, padding 0 20px, `ui` 15px. On desktop the button sits inside the right end of the field. On mobile it stacks full width.
- Label: a visible label or a visually hidden `<label>` ("Work email"). The placeholder is never the only label.
- `type="email"`, `autocomplete="email"`, `inputmode="email"`.
- States: focus (ring + border `--color-primary`), error (border `--color-error`, message below in 14px `--color-error` with an icon, `aria-describedby`, `aria-invalid`), loading (the button shows a spinner and the input goes read-only), success (the field is replaced by a confirmation line from content, `role="status"`).

### 6.7 Modal (film)
- Opens from "Watch the film →". Backdrop is ink at 72% + blur(8px). The panel holds a 16:9 video, `--radius-lg`, `--shadow-popover`.
- Focus is trapped, Esc closes, and focus returns to the trigger. The video autoplays muted only if motion is allowed, and has captions.
- The film URL is a content field. If it is empty, hide the trigger. Never ship a dead link.

### 6.8 Accordion (FAQ, optional)
72px rows, 1px `--color-border` dividers, and a plus icon that rotates 45° (`--dur-base`). Uses `<button aria-expanded>`. The brand doc has no FAQ; build it as optional and render it only if `faq.items` exists.

### 6.9 Footer
Logo, content-driven link groups (group label in `eyebrow` style, `--color-text-soft`), legal line in `small`. Links are 44px tall rows on mobile.

---

## 7. Feature components (from the content)

### 7.1 Product card `ProductCard` (from Nick `card-app`)
- Every product mock is a **white card**: `--card` #FFFFFF, 1px `--card-border` #E7E1F2, `--radius-lg` 20px, `--card-shadow` (Nick's stacked soft shadow: 3 drops + hairline ring + 2 bottom insets, ink-tinted), `overflow: hidden`.
- **Header** (`card-head`): a 16px line icon, a 15px/600 title, and a pill **meta tag** on the right (26px, 1px border, 12px text, e.g. "50 messages", "Tuesday", "Sep 23").
- **Body** 16px padding. **Footer** (`card-foot`): 1px top border, a segmented pill group on the left and a pill action on the right.
- **Acta-produced cards** swap the neutral shadow for `--shadow-ai` (a faint violet ring + soft violet drop). This is the only place violet glow appears.
- The card follows the theme: in dark mode `--card` is #1D1432 and borders go to violet 16%.
- Mocks are decorative: real DOM text marked `aria-hidden="true"`, with an `sr-only` sentence from `mock.srSummary`.

### 7.2 Chat bubbles `ChatRow` (from Nick `chat-bubble`)
- **You** (`row.me`): right-aligned ink bubble, `--bubble` #120B20 with white 14px/500 text, 12px radius, 12px 16px padding, max 34ch, and a 32px round avatar on the right. An optional name sits above in 12px `text-soft`.
- **Acta** (`row.bot`): left-aligned white bubble with a 1px `--card-border`, 15px `text-sub`, 12px radius, and a 36px circular **outline avatar** holding the violet sparkle.
- **Typing:** three 6px grey dots in a bordered bubble show Acta working before it answers.
- **Human avatars:** 32px circles with a violet duotone fill and initials (4 person variants in the violet family).
- **@mentions** inside the ink bubble use violet-300. **Highlights** (detected phrases) get a 2px underline that draws in left to right.
- **Answers are widgets:** after a short Acta bubble, the answer arrives as a `ProductCard` (as Nick "answers inline with the same widgets it uses in the app").

### 7.3 Summary widget: Feature 1 "CATCH UP"
- A `row.me` question ("What did I miss in #launch-q3?"), then an Acta bubble ("Here is what changed since 9:02 AM."), then an Acta card.
- Card header: sparkle + "3 key updates while you were away" (content), meta pill "50 messages".
- Rows: a 76px column with a **micro-tag** (uppercase mono 10px/600, +0.08em, coloured text, no box: DECISION violet, BLOCKER red, NEXT STEP green), then the text. Designed for 3, it tolerates 1–5.
- Demo: the question, then the reply, then the card rise in order. The rows stagger at 80ms.

### 7.4 Task widget: Feature 2 "AUTO-SYNC"
- A `row.me` message ("I'll have the marketing report done by Tuesday.") with the deadline highlighted, then an Acta card: calendar icon + "Sprint Calendar", meta pill "Tuesday".
- Body: the content callout with a check ("Task detected → Added to Sprint Calendar for Tuesday, 5:00 PM"), then a 5-column mini week. Events have a `--radius-sm` corner and a 3px primary left border on `--primary-tint`, and the new event drops into Tuesday.
- Footer: an "Undo" ghost action and an "Open task" pill.

### 7.5 Search widget: Feature 3 "RECALL"
- A neutral card holding the search field (48px, 12px radius, `--card-sub` fill, placeholder "Ask anything: decisions, dates, or files…" from content, `⌘K` hint). Below it an "Understood as" row of pill chips (person, date range, topic).
- An Acta card: sparkle + "Found in #brand", meta pill with the date, a quoted message block (`--card-sub`, 12px radius, avatar + name + mono time, match highlighted in `--primary-tint`), a file chip, and a "Jump to message" pill.

### 7.6 Compose widget: Feature 4 "COMPOSE"
- A neutral composer card: header "# Message #leadership" with Chat / Acta segmented pills (after Nick's Chat / Agent), rough bullets in mono `text-soft`, and a footer with the AI action tag "Format into executive summary" (pill, `--primary-tint`), mention and attach icons, and an ink send button.
- An Acta output card: "Q3 launch update", meta pill "Only visible to you", the polished paragraph, and a footer with EN / DE / JA segmented pills + "Insert draft".

### 7.7 Feature cell grid `FeatureGrid` (from Nick `cell`)
- A **2x2 gapless grid on rails** (1-up below 1024px). Each cell has a **visual zone on top** (min 440px, mock centred, max 480px wide), then the text: eyebrow, 24px/600 H3 (line-height 1.5), and body in `text-sub`, with 36px side padding and 36px bottom padding.
- From 1024px the cells use subgrid rows, so both visuals in a row share one height and the text blocks start on one line (polish 2026-09-30). Mock card titles wrap instead of truncating.
- There is no alternating zigzag. The same cell shape repeats, like Nick's "Purpose-built for autonomous agents" grid.
- Data-driven: `features[]` fills the cells in order, and the mock type comes from `feature.mock.type` ∈ `summary | task | search | compose`. An odd count leaves the last cell full width.

### 7.8 Journey cards `JourneySteps` (Talk / Distill / Deliver)
- **Layout from the aeye-saas.webflow.io value section (user request 2026-09-30), rebuilt on Acta tokens.** Reference: `docs/references/aeye-value-section/element.md`.
- Intro: headline only, no eyebrow (user request 2026-09-30). A `\n` in any section headline renders as a line break (`Section` splits it into block lines that each balance); the journey headline is one line again (user request 2026-09-30).
- Cards: `3 x 1fr` from 900px (count from data, wraps above 3), 1-up below. **Ledger net, same as pricing** (user request 2026-09-30): no card borders or gaps; the columns share the section rails, split by 1px `--color-rail` lines (horizontal when stacked) with plus marks where they meet the top rule. Padding 36px (20px sides on mobile), `min-height` 340px on mobile and clamp(400px, 34vw, 496px) from 900px. It is a flex column with `space-between`: the top block holds the icon (22px Phosphor regular icon in a 48px round 1px `--color-border-strong` stroke) and the mono index ("//01", slashes in `--color-accent`), then 40px, then the h3 title and body. The optional tag (mono, uppercase, `--color-bg-tint` chip) sits at the bottom.
- Content: `beats[].icon` ∈ `chat | sparkle | calendar | search | list | lightning` and `beats[].tag` are optional.
- Motion: cards slide in with a 160ms stagger (no progress line: it broke the ledger net). Hover (as Aeye, 250ms, fine pointers only): the title turns `--color-primary`, the icon crossfades to its filled version in primary with a primary ring, and the body unfolds (grid rows 0fr→1fr + fade). The border does not change. On touch screens the body is always shown; collapsed bodies stay in the accessibility tree.

### 7.9 Hero and app showcase
- **Hero (left column, user direction 2026-09-30).** Eyebrow (in Nick's trust-line slot) → H1 at `--text-hero` (40→64px, max 14ch) → the lead paragraph right under it (16px, max 30rem) → CTA row (primary sized to the heading: 48px tall, 16px label, as Nick pairs a 54px H1 with a 48px CTA; plus the film ghost-link, shown only when `filmUrl` is set) → optional micro-copy (rendered only when `hero.microcopy` exists; removed from content on 2026-09-30). The right of the hero is left to the ribbon video.
- **App showcase** is its own section right below (Nick "App showcase"): a white app `ProductCard` (icon rail, channel list, channel messages, and an Acta panel with a summary card and a task card) inside a 20px-radius violet brand-texture frame that fills the container.
- **Hero background video (Nick's hero ribbon, in violet).** `hero.backgroundVideo` (src + poster, content fields) plays muted and looping behind the hero, mirrored and aligned so the clip's right edge sits on the hero's right rail: the ribbon is cropped by the cell (as Nick crops his ribbon) with no white fade (user request 2026-09-30). Only a narrow feather hides the clip's left edge. All hero copy sits in the left column, clear of the ribbon. Below 1024px the clip fills the whole cell (`cover`) at 35% opacity behind the stacked copy. The clip is violet on white: `object-fit: contain` shows the whole ribbon rather than a cropped close-up; `mix-blend-mode: multiply` drops the white in light mode; dark mode uses `invert(1) hue-rotate(180deg)` + `screen`. On desktop a horizontal mask confines it to the column gap; below 1024px it sits at 35% opacity. It plays only while on screen, never under reduced motion (the poster shows), and is `aria-hidden`.
- Vertical: hero padding clamp(56px, 8vw, 96px) top.

### 7.10 Pricing `PricingTable`
- **Layout from 21st.dev "Blueprint Tiers" (chosen by the user, 2026-09-30), rebuilt on Nick's ledger with Acta tokens.** Intro block (optional heading from content), then one column per tier sharing rails (1-up stacked on mobile, with the featured plan first).
- Each plan is a column of **three ruled rows** that line up across columns (CSS subgrid): (1) header: name (h3) + optional badge (mono 10.5px uppercase on `--color-primary-tint`) + optional description; (2) price row: price (clamp 36→52px, −0.04em) + unit (`small` soft), optional `note`, then the CTA (full-width `lg` pill); (3) features: one row per bullet with a 1px rail between rows, a 20px outlined circle holding the check (`--color-border-strong` ring, `--color-primary` check), and 15px `text-sub`.
- **Crop marks** (the plus sign) sit where each column rule meets the top rule. The featured plan (`featured: true`, Pro) is marked by its badge, the only `primary` CTA in the table, and four **corner ticks** around that CTA. Other plans use the `secondary` CTA. There is no filled column any more.
- Custom price ("Custom pricing"): a string price in a smaller size, with the unit hidden automatically.
- Columns rise in with an 80ms stagger when the table enters the viewport (final state under reduced motion).
- No billing toggle, because the brand doc has no annual pricing. The 21st source's toggle, grey section background, blue accent and bottom hatch were dropped.
- The internal note ("Top-of-funnel acquisition…") is never rendered. It is an `internalNote` field that components ignore.

### 7.11 Closing CTA `ClosingCTA`
- **Nick 2-col closing, on white.** Left cell: display headline "Work that moves itself." → sub-copy (lead). Right cell: the Acta mark (identity) → email capture (6.6) → optional micro-copy. Cells share a rail; 1-up on mobile.

### 7.12 Implementation

Components live in `src/components/{layout,ui,mocks,sections,forms,motion}`. Their CSS is `src/styles/components.css`, ported 1:1 from `preview.html` and using only semantic tokens; `src/app/globals.css` bridges the tokens into Tailwind v4 utilities. Demos are CSS keyframes started by `DemoPlayer` (IntersectionObserver), so the resting state is always the final state.

---

## 8. Content model (strict rule: all content editable)

Every component above renders from `content/site.json`. There is no copy in markup. **The implemented contract is `src/content/schema.ts` (zod); it is authoritative, and the sketch below is the original outline.** Mock text uses `[[phrase]]` to mark a detected phrase or search match. Section order comes from `sections[]`, and accessible labels (skip link, menu, footer nav, film close) live in `ui`.

```jsonc
{
  "meta": { "title": "", "description": "", "ogImage": "" },
  "nav": { "links": [{ "label": "", "href": "" }], "cta": { "label": "", "href": "" } },
  "hero": {
    "eyebrow": "ACTA INTELLIGENCE",
    "headline": "From conversation to execution.",
    "body": "",
    "primaryCta": { "label": "Try Acta free", "href": "" },
    "secondaryCta": { "label": "Watch the film →", "filmUrl": "" },
    "microcopy": "Free for teams. Ready in seconds.",
    "mock": { "type": "hero", "srSummary": "" }
  },
  "journey": { "heading": "", "steps": [{ "number": "01.", "title": "Talk", "body": "" }] },
  "features": [{
    "id": "summaries",
    "eyebrow": "CATCH UP",
    "headline": "Fifty messages. Three bullets.",
    "body": "",
    "mock": { "type": "summary", "callout": "3 key updates while you were away", "items": [{ "kind": "decision", "text": "" }], "srSummary": "" }
  }],
  "pricing": {
    "heading": "",
    "plans": [{ "id": "starter", "name": "Starter", "price": "$0", "unit": "/ month", "description": "",
                "features": [""], "cta": { "label": "", "href": "" }, "featured": false, "badge": "", "internalNote": "" }]
  },
  "closing": {
    "headline": "Work that moves itself.", "body": "",
    "form": { "label": "Work email", "placeholder": "", "button": "Get started free", "action": "", "success": "", "error": "" }
  },
  "faq": { "heading": "", "items": [] },
  "footer": { "groups": [{ "label": "", "links": [{ "label": "", "href": "" }] }], "legal": "" }
}
```

Rules:
- Every optional field hides its element cleanly when empty: no empty wrappers and no leftover gaps.
- Arrays have no fixed length. Components are tested with 0, 1, the designed count, and the designed count + 2.
- Each mock's demo script text (messages, names, times) lives in `mock` too, so demos are editable.
- Placeholder CTA labels not in the brand doc (plan CTAs, nav links, footer, form success and error) are marked `"TBD"` in content until approved.

---

## 9. Page composition (default order)

| # | Section | Grid | Surface |
|---|---|---|---|
| 1 | Header | container | blur white |
| 2 | Hero | split 2-col (Nick) | white |
| 2b | App showcase | 1-up | app card in violet texture frame |
| 3 | Journey (Talk / Distill / Deliver) | 3-up cells | white |
| 4–7 | Features | 2x2 feature cells (visual top, text below) | white |
| 8 | Pricing | one column per tier, ruled rows (21st Blueprint Tiers) | white, Pro marked by badge, primary CTA and corner ticks |
| 9 | Closing CTA | 2-col (Nick) | white |
| 10 | Footer | groups | white |

Order is set by content (`sections[]` order, if provided), not hardcoded.

---

## 10. Responsive

| Breakpoint | Changes |
|---|---|
| 375 (base) | Gutter 20px, everything 1-up, display 40px, CTA row stacks full width, email form stacks, header menu sheet |
| 768 | Gutter 36px, journey 1-up (3-up from 900), pricing still 1-up (featured first), section pad 96px |
| 1024 | Features 2x2, pricing 3-up, header shows inline nav |
| 1440 | Container capped at 1240, display 72px |

No horizontal scroll at any width. Mocks scale by container query (`container-type: inline-size` on the mock cell); below 360px the mock shows a simplified state.

---

## 11. Iconography and imagery

- Phosphor icons (`@phosphor-icons/react`, regular weight), 16px inline or 18–20px standalone, `currentColor`. No emoji. The logo mark is the only custom SVG.
- The sparkle icon marks AI. It is used only with AI-produced elements.
- No stock photography. Avatars in mocks are initials on violet-900, or illustrated portraits kept consistent in one style.
- Decorative icons get `aria-hidden="true"`. Icon-only buttons get an `aria-label`.

---

## 12. Do / Don't

### Do
- Reserve `--color-ai-glow` (#B78AF7) and the sparkle for AI output only. It is the brand signature.
- Keep page structure square and flat. Put all depth and roundness inside `ProductCard`.
- Separate sections with full-bleed rail rules only (no hatch bands: removed by the user on 2026-09-30), never background colour blocks (there are no colour blocks).
- Use `--color-primary` (#723AC5) fill only for conversion CTAs (including the featured plan's CTA).
- Render every string from `content/site.json`.

### Don't
- Don't introduce a second hue (no blue links, no green CTAs). Status colours stay inside mocks and forms.
- Don't use `--color-accent` as text on white (it fails contrast).
- Don't set headlines above weight 600 or drop their negative tracking.
- Don't ship touch targets under 44px or remove focus rings.
- Don't hardcode counts (3 bullets, 4 features, 3 plans). The content decides.

---

## 12b. Browser surfaces (polish 2026-09-30)
- Mock controls: the composer send button and the active app-rail icon fill with `--color-primary` (user request 2026-09-30).
- `accent-color` and `caret-color` use `--color-primary`; `scrollbar-color` uses `--color-border-strong`; `::selection` uses `--color-selection` (violet-200 light, accent at 34% dark); links get `text-underline-offset: 0.2em` and a 1px underline.
- Detector exception: the calendar mock's `.evt` keeps a 3px left bar, because real calendars mark events that way.

## 13. Open decisions

- **Logo violet:** `logo-color.svg` uses #622DDE while the brand primary is #723AC5. The recommendation is to recolour the mark to #723AC5 so the system has one violet.
- **Film:** no film asset yet, so the trigger stays hidden until `hero.secondaryCta.filmUrl` is set.
- **Intro headlines:** the journey, features and pricing intro headlines ("Chat. Acta takes it from there.", "Four jobs. Zero manual work.", "Start free. Grow with your team.") are drafts in the brand voice, not from the brand doc. Approve or replace them in content.
- **Journey card tags:** "No new habits", "Always in the background", "Done on its own" are drafts in the brand voice. Approve or replace them in content.
- **Signup destination:** form `action` and CTA `href` values are TBD.
- **Nav and footer links, plan CTA labels:** not in the brand doc, so they are TBD in content.
- **Theme:** light is the default and dark mode is supported. Confirm whether to ship the toggle.

---

## 14. Pre-delivery checklist

- [ ] Every visible string comes from `content/site.json`; editing it alone updates the page
- [ ] Arrays tested at 0 / 1 / designed / designed+2 items; empty optional fields leave no gaps
- [ ] All pairs in `design-a11y.md` hold; no text below 4.5:1 (11px mono micro only inside decorative, `aria-hidden` mocks)
- [ ] Focus ring visible on every interactive element, including the modal and mobile menu
- [ ] Touch targets ≥ 44×44px, 8px+ spacing
- [ ] `prefers-reduced-motion` shows the final state of every mock and turns off reveals
- [ ] Mocks pause offscreen; only transform and opacity are animated
- [ ] No horizontal scroll at 375 / 768 / 1024 / 1440
- [ ] Fonts `display=swap`; hero frame has reserved space (CLS < 0.1)
- [ ] Light and dark theme both checked; product cards checked in both
- [ ] No emoji icons; Phosphor regular weight only
- [ ] Internal notes (`internalNote`) never rendered
