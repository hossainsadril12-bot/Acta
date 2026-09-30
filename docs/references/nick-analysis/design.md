---
version: anydesign-1
name: NickAI
source: https://getnick.ai/
captured_at: 2026-09-30
description: |
  A white, ruled "ledger" page: one 1240px column framed by hairline rails, cut into cells by
  1px dividers and separated by hatched 48px bands. Near-black duplet headlines, grey Manrope
  body text at weight 440, and live product mock-ups set into the cells. Colour appears only
  where it means something: blue for the brand and primary action, green for "go / money / free".
colors:
  primary: "#0178FF"
  primary-dark: "#0169E0"
  primary-light: "#389CFF"
  primary-alpha-10: "#0178FF1A"
  go: "#00A63E"
  success: "#00A544"
  surface: "#FFFFFF"
  surface-weak: "#F4F4F5"
  surface-strong: "#09090B"
  surface-ink-soft: "#18181B"
  text-strong: "#09090B"
  text-sub: "#52525C"
  text-soft: "#9F9FA9"
  border: "#E4E4E7"
  rail: "#0000000F"
  dark-surface: "#09090B"
  dark-surface-weak: "#18181B"
  dark-text-strong: "#FFFFFF"
  dark-text-sub: "#9F9FA9"
typography:
  display: { fontFamily: "duplet, sans-serif", fontSize: 54px, fontWeight: 600, lineHeight: 1.08, letterSpacing: -0.5px }
  heading-section: { fontFamily: "duplet, sans-serif", fontSize: 40px, fontWeight: 600, lineHeight: 1.25, letterSpacing: -0.5px }
  heading-cell: { fontFamily: "duplet, sans-serif", fontSize: 24px, fontWeight: 600, lineHeight: 1.5 }
  price: { fontFamily: "duplet, sans-serif", fontSize: 40px, fontWeight: 600, lineHeight: 1.1 }
  body: { fontFamily: "Manrope, sans-serif", fontSize: 16px, fontWeight: 440, lineHeight: 26px }
  body-ui: { fontFamily: "Manrope, sans-serif", fontSize: 15px, fontWeight: 440, lineHeight: 1.5 }
  label-nav: { fontFamily: "Manrope, sans-serif", fontSize: 14px, fontWeight: 550, lineHeight: 21px, letterSpacing: -0.35px }
  label-button: { fontFamily: "Manrope, sans-serif", fontSize: 14px, fontWeight: 600, lineHeight: 1 }
  eyebrow: { fontFamily: "Manrope, sans-serif", fontSize: 12px, fontWeight: 550, letterSpacing: 0.3px, textTransform: uppercase }
  micro-tag: { fontFamily: "Manrope, sans-serif", fontSize: 10px, fontWeight: 600, letterSpacing: 0.8px, textTransform: uppercase }
spacing:
  base: 4px
  scale: [4, 8, 12, 14, 16, 20, 24, 28, 32, 36, 48, 64, 80]
  container: 1240px
  gutter-mobile: 20px
  gutter-desktop: 36px
  band-hatch: 48px
rounded:
  sm: 8px
  md: 12px
  lg: 20px
  pill: 9999px
shadows:
  card-app: "0 4px 8px rgba(41,41,41,.06), 0 2px 4px rgba(41,41,41,.04), 0 1px 2px rgba(41,41,41,.04), 0 0 0 1px rgba(41,41,41,.06), inset 0 -0.5px 0.5px rgba(41,41,41,.1), inset 0 -1px 0.5px rgba(0,0,0,.1)"
  popover: "0 20px 44px -10px #00000094, 0 0 0 1px #00000080"
  tooltip: "0 14px 28px 0 #00000080, 0 1px 2px 0 #00000059"
motion:
  duration-default: 150ms
  ease-default: "cubic-bezier(.4,0,.2,1)"
  ease-out: "cubic-bezier(0,0,.2,1)"
components:
  button-primary: { backgroundColor: "{colors.primary}", textColor: "{colors.surface}", rounded: "{rounded.pill}", height: 36px, padding: 0 20px, typography: "{typography.label-button}" }
  button-go: { backgroundColor: "{colors.go}", textColor: "{colors.surface}", rounded: "{rounded.pill}", height: 48px, padding: 0 28px, fontSize: 15px }
  button-dark: { backgroundColor: "{colors.surface-strong}", textColor: "{colors.surface}", rounded: "{rounded.pill}", height: 36px, padding: 0 20px }
  button-outline: { backgroundColor: "{colors.surface}", textColor: "{colors.text-strong}", border: "1px solid {colors.border}", rounded: "{rounded.pill}", height: 48px, padding: 0 24px }
  nav-link: { textColor: "{colors.text-sub}", rounded: "{rounded.pill}", padding: 8px 12px, typography: "{typography.label-nav}" }
  chip: { backgroundColor: transparent, textColor: "{colors.text-strong}", border: "1px solid {colors.border}", rounded: "{rounded.pill}", height: 32px, padding: 0 14px, fontSize: 14px, fontWeight: 500 }
  header: { backgroundColor: "#FFFFFFCC", backdropFilter: blur(12px), height: 81px, borderBottom: "1px solid {colors.rail}", position: sticky }
  card-app: { backgroundColor: "{colors.surface}", border: "1px solid {colors.border}", rounded: "{rounded.lg}", shadow: "{shadows.card-app}" }
  cell: { backgroundColor: "{colors.surface}", border: "1px solid {colors.rail}", rounded: 0px, padding: 28px 28px 32px }
  pricing-card: { backgroundColor: "{colors.surface}", rounded: 0px, padding: 32px, featuredBackground: "{colors.primary}", featuredText: "{colors.surface}" }
  segmented-toggle: { backgroundColor: "{colors.surface}", border: "1px solid {colors.border}", rounded: "{rounded.pill}", activeBackground: "{colors.surface-strong}", activeText: "{colors.surface}" }
  faq-row: { padding: 24px 28px, height: 72px, fontSize: 16px, fontWeight: 550, divider: "1px solid {colors.border}", icon: plus }
  chat-bubble: { userBackground: "{colors.surface-ink-soft}", userText: "{colors.surface}", agentBackground: "{colors.surface}", agentBorder: "1px solid {colors.border}", rounded: "{rounded.md}" }
---

# Design Analysis: NickAI

> Analysis generated with the `anydesign` skill. Date: 2026-09-30. Emphasis: reconstruction + design system (deep, component and layout detail)

## Source

- **Type:** URL, https://getnick.ai/ (`?ref=land-book.com` dropped; it's the same page).
- **Capture:** CSS custom-property digest (281 vars, Tailwind v4 theme) ✅, Playwright computed styles (desktop 1440×900, mobile 375×812) ✅, a DOM outline pass for section geometry, grid templates and button variants ✅, 8 desktop frames + 2 mobile frames.
- **Cross-checked against** `../design-1-nick.md`, an earlier auto-extraction of the same site. That file is directionally right, but it is a generic template: its type scale (10–18px) leaves out the display sizes and the duplet face, it lists the blue #0178FF as a "surface", and it misses the green CTA, the rail grid and the hatched bands. This file supersedes it.
- **Limitations:** the chat demos animate in when scrolled into view, so some frames show empty cells. Hover and focus states were not triggered. No tablet viewport. Dark mode exists (toggle + alt tokens), but only its tokens were captured, not frames.

## TL;DR

NickAI reads like a **ruled trading ledger**. Everything sits inside one 1240px column bounded by 6%-black hairlines, divided into cells by 1px rules and punctuated by 48px diagonal-hatch bands. The page is almost monochrome: near-black duplet headlines, grey Manrope body at the unusual weight 440, and real product UI placed in the cells. Colour is **semantic, not decorative**: blue `{colors.primary}` (#0178FF) is the brand and the primary action, green `{colors.go}` (#00A63E) means go / free / buy. The one lavish gesture is a WebGL blue ribbon in the hero. The actionable insight: the ledger lines (rails + dividers + hatch bands) are the whole layout system. Get them right and any content looks "Nick".

## 1. Visual identity

### 1.1 Surface description

- **Personality:** precise, technical, calm, trustworthy, quietly premium. ✅ Hairlines, a restrained palette and real UI instead of illustration.
- **Mood:** a Bloomberg terminal redrawn by a Swiss typographer: lots of white, exact lines, data as decoration. ✅
- **Stylistic references:** Linear / Vercel "grid-lined" marketing sites (visible column rails, cell borders), plus Stripe-style embedded product mocks. ⚠️ An inference from the patterns seen.
- **Information density:** medium. Section intros are spacious (h2 + one 16px paragraph); the cells below are dense with real UI (charts, tool calls, order receipts). ✅
- **Implicit positioning:** enterprise-grade fintech that still feels consumer-simple ("Describe what you want to trade in plain English"). "Backed by Galaxy" sits above the H1 as a trust signal. ✅

### 1.2 Brand voice / Atmosphere

Nick believes traders distrust hype and trust *evidence*. So the page never illustrates a promise; it shows the product doing it: a real tool call, a real chart with a tooltip at $289.36, a real order receipt, all inside ruled cells like entries in an audit log. The hairline grid says "every line accounted for". Colour is kept for the two things a trader acts on: the brand/primary action (blue) and money-moving "go" (green). The only indulgence, the hero ribbon, is motion, not decoration.

### 1.3 The "ONE brand thing"

- **The thing:** the *ruled ledger frame*: a 1240px column with `1px {colors.rail}` (#0000000F) left/right rails running the whole page height, full-bleed 1px horizontal rules at every section boundary, tiny 2px corner dots where the rules cross the rails, and 48px `repeating-linear-gradient(315deg, …6%, transparent 1px 50%)` hatch bands closing each section.
- **Why it carries the brand:** it turns a marketing page into an instrument panel, which is exactly the "precise trading system" promise.
- **How the rest is restrained:** no card shadows on the page level, no background tints, no section colour bands. Every section is `#FFFFFF`, so the lines do the separating.
- **Where it appears / doesn't:** everywhere between the header and the footer. It is absent *inside* product mocks, which use rounded 20px cards with soft stacked shadows. That contrast (square page cells vs. rounded app UI) makes the mocks read as "real software placed on the ledger".

## 2. Design System (tokens)

### 2.1 Colors

Tailwind v4 theme with semantic aliases (`--bg-white-0`, `--text-strong-950`, `--text-sub-600`, `--text-soft-400`, `--primary-base`). Computed text colours come through as `lab()`; the hex values below are the matching theme variables. ✅

| Token | Hex | Role | Where it appears | Confidence |
|---|---|---|---|---|
| `primary` | #0178FF | Brand + primary action | "Start for Free", logo mark, Pro pricing card fill, "Workflow" active tab, links | ✅ |
| `primary-dark` | #0169E0 | Primary hover/pressed | Theme var; hover not triggered | ⚠️ |
| `primary-alpha-10` | #0178FF1A | Tinted selected state | "Agent" segmented pill, "Powered by Snapshot.org" tag | ✅ |
| `go` | #00A63E | Go / free / execute | Hero "Try for free now", "Run Now", "1000 credits" text, "20% off" badge | ✅ |
| `success` | #00A544 | Data semantics (YES/BUY, up-trend) | Chart line + fill, YES/BUY tags | ✅ |
| `surface` | #FFFFFF | Page and every cell | All sections | ✅ |
| `surface-weak` | #F4F4F5 | Subtle fills | App mock sidebar, inputs | ✅ |
| `surface-strong` | #09090B | Inverted pill buttons | "Login", "Start your free trial", toggle active | ✅ |
| `surface-ink-soft` | #18181B | User chat bubble, "New Chat" button | Chat demos | ✅ |
| `text-strong` | #09090B | Headlines, primary labels | h1–h3, chip text | ✅ |
| `text-sub` | #52525C | Body copy, nav | Paragraphs, nav links | ✅ |
| `text-soft` | #9F9FA9 | Tertiary / eyebrows | Footer column labels, "No credit card needed." | ✅ |
| `border` | #E4E4E7 | Component borders | Chips, app cards, FAQ dividers, outline button | ✅ |
| `rail` | #0000000F | Ledger lines (6% black) | Column rails, section rules, header border | ✅ |

**Dark mode** (toggle in the header; alt token values ✅, not visually captured ❓):

| Token | Hex | Role | Where it appears | Confidence |
|---|---|---|---|---|
| `dark-surface` | #09090B | Page | `--background` alt | ✅ |
| `dark-surface-weak` | #18181B | Cells / weak fill | `--bg-surface` alt | ✅ |
| `dark-text-strong` | #FFFFFF | Headlines | `--text-strong-950` alt | ✅ |
| `dark-text-sub` | #9F9FA9 | Body | `--text-sub-600` alt | ✅ |

The theme also defines a full Tailwind accent set (amber, red, emerald, teal, sky, indigo, purple, rose). These are for **data visualisation only** (chart series, asset badges), never for UI chrome. ⚠️

### 2.2 Typography

- **Display face:** `duplet` (`--font-duplet`) ✅, a geometric grotesk with round "a"/"g" and tight apertures. It is a commercial typeface ❓ (licence needed). Fallback: a geometric sans such as *Outfit* or *Plus Jakarta Sans* ⚠️.
- **Text/UI face:** `Manrope` ✅ (Google Fonts, variable). **Body weight is 440**, not 400 ✅. The variable axis gives slightly firmer grey text so it survives #52525C at 16px. Labels use **550** and buttons **600**.

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `display` | 54px (mobile 40px) | 600 | 1.08 (58.3px) | Hero H1, 2 lines max |
| `heading-section` | 40px (mobile 32px) | 600 | 1.25 (50px) | Section H2s, always ending with a full stop |
| `heading-cell` | 24px | 600 | 1.5 (36px) | Cell H3s ("Say it, Nick trades it.") |
| `price` | ~40px ⚠️ | 600 | tight | Pricing amounts; "/month" in 14px `text-sub` baseline-aligned |
| `body` | 16px | 440 | 26px | Section intros, cell descriptions |
| `body-ui` | 15px | 440 | 1.5 | Inputs, mobile nav |
| `label-nav` | 14px | 550 | 21px, −0.35px | Nav links, "Use cases" row labels |
| `label-button` | 14px (hero 15px) | 600 | — | All pill buttons |
| `eyebrow` | 12px | 550 | +0.3px, UPPERCASE | Footer column heads (PRODUCT / COMPANY / LEGAL) |
| `micro-tag` | 9–10px | 600 | +0.8px, UPPERCASE | In-mock tags (YES, BUY, START, PAPER) |

**Tracking convention:** −0.5px on all duplet display sizes; −0.35px on 14px labels; *positive* tracking only on uppercase. ✅ There are **no uppercase eyebrows above section headlines**: sections open straight with the H2. ✅

The CSS scale also defines `--text-title-h-1..6` = 54/40/32/28/24/20px, and h1/h2/h3 use 1, 2 and 5 of it. ✅

### 2.3 Spacing

- **Base unit:** 4px (`--spacing: .25rem`, Tailwind v4) ✅.
- **Observed values:** 8/12 (nav padding), 14 (chip x-padding), 20 (button x-padding, mobile gutter), 24 (FAQ y-padding), 28 (hero button x, cell/FAQ x-padding), 32 (pricing card padding), 36 (desktop container gutter `md:px-9`), 48 (hatch band height; section-intro inset), and ~64–80 (section-intro top padding). ✅/⚠️
- **Vertical rhythm:** each section is an *intro block* (≈100px top → H2 → 24–32px → paragraph → ≈64px) followed by a *cell grid* and closed by a 48px hatch band. Section heights run 585–916px, except the chart gallery (2028px). ⚠️
- **Consistency:** high ✅. Everything lands on the 4px grid.

### 2.4 Radii

Deliberately **tiered by context** ✅:
- **0px**: all page-level structure (cells, pricing columns, logo wall, FAQ). The ledger is square.
- **8px** `{rounded.sm}`: small in-app controls (menu items, mobile nav links).
- **12px** `{rounded.md}`: in-app buttons and list items ("New Chat", sidebar items), chat bubbles.
- **20px** `{rounded.lg}`: app mock cards and the portfolio widget.
- **pill** `{rounded.pill}`: every marketing button, chip, nav link and toggle.

The system: **page = square, marketing controls = pill, product UI = 8/12/20.** Never mix these contexts.

### 2.5 Elevation system

| Level | Name | Treatment | Use |
|---|---|---|---|
| 0 | Ledger | No shadow; 1px `{colors.rail}` lines | All page structure |
| 1 | Header | `rgba(255,255,255,.8)` + `backdrop-filter: blur(12px)` + 1px rail bottom border, sticky | Top nav |
| 2 | App card | `{shadows.card-app}`: six stacked shadows (3 soft drops, 1 hairline ring, 2 bottom insets) + 1px `{colors.border}` | Product mocks only |
| 3 | Popover | `{shadows.popover}` | Dropdowns (Use Cases / Resources) ⚠️ not opened |

**Philosophy:** the page is flat and ruled; depth exists *only* in product UI. The app-card shadow is tactile: the two negative inset shadows make a faint "bottom lip", as if the card were a physical tile. ✅

**Decorative depth:** (a) the hero's WebGL ribbon (`<canvas>` 624×389, blue silk/ribbon) crossing behind the hero column; (b) the rich blue painterly texture (`app-deco-bg.avif`) framing the app mock with 20px radius; (c) left/right ribbon images (`tryit-ribbon-*.webp`) in the "Give it a try" band; (d) a dotted-grid canvas behind the workflow node graph. Blue textures are scoped to **three zones**: hero, app showcase, try-it band, plus the FAQ side image. ✅

### 2.6 Borders

- **Rails and section rules:** 1px `{colors.rail}` (#0000000F, 6% black) ✅.
- **Component borders:** 1px `{colors.border}` (#E4E4E7) on chips, outline buttons, app cards and FAQ dividers ✅.
- **Hatch band:** `repeating-linear-gradient(315deg, oklab(.141 …/.06) 0 1px, transparent 0 50%)` over a small background size, 48px tall, full container width ✅.
- **Corner marks:** tiny dots at rail/rule intersections (x=100 and x=1340) ✅, visible in every frame.
- **Focus treatment:** not observed ❓. A rebuild must add a visible ring, e.g. `0 0 0 3px {colors.primary-alpha-10}` + 1px `{colors.primary}`.

### 2.7 Accessibility quick-check

From `design-a11y.md`:
- `text-strong` on white **19.9:1 AAA**; `text-sub` body on white **7.72:1 AAA**.
- `text-soft` (#9F9FA9) labels on white **2.62:1, fails AA**. It is used for footer eyebrows and "No credit card needed.".
- White on `primary` (#0178FF) **4.09:1, AA large only**: "Start for Free" at 14px/600 is *below* AA for normal text, and so is the Pro pricing card's body copy.
- White on `go` (#00A63E) **3.22:1, AA large only**: the hero CTA at 15px/600 fails AA normal.
- Blue link text on white 4.09:1 and green inline "1000 credits" 3.22:1, AA large only.
- Touch targets: header pills are 36px tall and chips 32px, **below 44px**. The hero CTA (48px) passes.

## 3. Components Inventory

### 3.1 Generic components

#### button-primary
- **Variants:** 1 observed ("Start for Free" in the header), with a trailing → arrow icon (16px, 8px gap).
- **Size:** height 36px, padding 0 20px, 14px/600 Manrope, `{rounded.pill}`.
- **Colour:** `{colors.primary}` (#0178FF) bg, white text; hover likely `{colors.primary-dark}` ⚠️.
- **States seen:** default only.
- **Confidence:** ✅ computed.

#### button-go
- **Variants:** hero "Try for free now →" (48px) and the in-app "▶ Run Now" (~32px, green with a play icon). ✅
- **Size:** 48px tall, padding 0 28px, 15px/600, pill.
- **Role:** the *conversion* colour. Green = "start / execute / free", separate from blue brand chrome.
- **Micro-copy under it:** "1,000 credits. No card. No time limit." (14px `text-sub`, 20px below).
- **Confidence:** ✅.

#### button-dark
- **Variants:** "Login" (36px, header) and "Start your free trial →" (48px, closing CTA). ✅
- **Colour:** `{colors.surface-strong}` #09090B, white text, pill, no border.
- **Pairing rule:** in the header, dark sits *left of* blue (Login | Start for Free, 8px gap); in the closing CTA, dark is the primary and pairs with button-outline.
- **Confidence:** ✅.

#### button-outline
- **Variants:** "Contact us" (closing CTA) ✅.
- **Size:** 48px, padding ~0 24px, 1px `{colors.border}`, pill, `text-strong`.
- **Confidence:** ⚠️ read from the frame; padding estimated.

#### nav-link
- **Variants:** plain ("Enterprise", "Pricing", "Contact") and dropdown ("Use Cases ⌄", "Resources ⌄", 12px chevron, `text-soft`).
- **Size:** padding 8px 12px, 14px/550, −0.35px tracking, `text-sub`, pill hit area (a pill hover background is implied ❓).
- **Mobile:** collapses to a hamburger; drawer links are 15px, radius 8px, padding 10px 12px ✅.
- **Confidence:** ✅.

#### chip
- **Variants:** link chips in the "Use cases / Integrations" index row.
- **Size:** 32px tall, padding 0 14px, 14px/500, `text-strong`, 1px `{colors.border}`, transparent bg, pill. Gap 8px.
- **Layout:** a 128px left label column (14px/550 `text-sub`), then chips wrapping inline. Two rows, 48px apart.
- **Confidence:** ✅.

#### header
- **Anatomy:** logo (N-mark + "NickAI" wordmark, ~24px tall) → 32px → nav links → flexible gap → Login + Start for Free → 16px → theme toggle (moon icon, 20px).
- **Size:** 81px tall, sticky, `rgba(255,255,255,.8)` + blur(12px), 1px rail bottom border. Content aligns to the 1240 container with 36px inner padding.
- **Mobile:** logo, theme toggle and hamburger only; 81px tall.
- **Confidence:** ✅.

#### card-app
- **What:** the rounded product-UI container for every mock (portfolio widget, paper exchange, workflow card, tool-call cards).
- **Style:** white, 1px `{colors.border}`, `{rounded.lg}` 20px, `{shadows.card-app}`.
- **Inner header:** 16px/550 title with a 16px line icon on the left, and a pill "meta tag" on the right (12px, 1px border, e.g. "papertrader2", "Paper account").
- **Confidence:** ✅.

#### cell
- **What:** the square ledger cell holding each feature.
- **Anatomy:** a visual zone on top (mock or illustration, ~400px tall, bleeding to the cell edges), then `heading-cell` H3 (24px), 16px gap, `body` paragraph in `text-sub`, max ~480px wide.
- **Padding:** 28px sides, 32px bottom. Cells share 1px rail borders (no gap).
- **Grids seen:** 2-up (619+619), 3-up (412×3), 4-up logo wall (309.5×4).
- **Confidence:** ✅ geometry; ⚠️ exact padding.

#### pricing-card
- **Variants:** standard (white) and **featured**: the whole Pro column filled `{colors.primary}` with white text and a "Most popular" pill (white 10% bg, 11px/600).
- **Anatomy:** plan name (24px duplet) + badge → description (15px, `text-sub` or white/80%) → price (`price` token, "$79") + "/month" (14px) → features/CTA (below fold ❓).
- **Layout:** 3 square columns, no radius, no gap, sharing rails. The featured card is the only large colour block on the page.
- **Above it:** a centred "No credit card needed." (12px `text-soft`) + pill "Start your free trial with **1000 credits**" (credits in `{colors.go}`), hanging over a thin bracket line that connects to the columns.
- **Confidence:** ✅ top half; ❓ features list.

#### segmented-toggle
- **What:** the Monthly / Annual billing switch.
- **Style:** pill container, 1px `{colors.border}`, 4px inner padding. Active segment `{colors.surface-strong}` black pill with white 14px/600 text, plus an inline green "20% off" micro-badge (`{colors.go}` bg, 10px/600). Inactive is `text-sub`.
- **Also used** in-app as Chat / Agent pills (19px radius, 12px/550; active = `{colors.primary-alpha-10}` bg + `{colors.primary}` text).
- **Confidence:** ✅.

#### faq-row
- **Anatomy:** question (16px/550 `text-strong`), then a flexible gap, then a 20px thin "+" icon (`text-soft`). 1px `{colors.border}` divider between rows.
- **Size:** 72px tall, padding 24px 28px.
- **Layout:** the right half of a 2-col split, with a blue brand-texture image + large white N-mark on the left half.
- **Confidence:** ✅.

#### chat-bubble
- **User:** `{colors.surface-ink-soft}` black bubble, white 14px/500 text, 12px radius, 12px 16px padding, right-aligned, 32px round avatar on the right.
- **Agent:** white bubble, 1px `{colors.border}`, `text-sub` 15px text, with a 36px circular outline avatar holding a blue ✦ sparkle on the left. A typing indicator (3 grey dots) shows before the content streams in.
- **Motion:** bubbles and widgets animate in on scroll (frames show empty cells before the trigger). ✅
- **Confidence:** ✅.

### 3.2 Signature components

1. **The ledger frame (rails + section rules + hatch bands + corner dots).** Covered in 1.3. Build it as a wrapper: `max-w-[1240px] mx-auto border-x border-[--rail]`; each section gets `border-t` full-bleed (an absolute `inset-x-0` line reaching the viewport edges) and ends with a `h-12` hatch div. The corner dots are 2–3px squares or circles sitting on the rule where it crosses each rail.
2. **Live product mock in a cell.** Real UI fragments instead of illustrations: the workflow builder (sidebar icons, tool-call list with ✓ states, node graph on a dot grid), the AAPL area chart with a black tooltip pill "$289.36" and a pulsing green halo dot, and the portfolio donut. They are drawn as SVG/HTML (not screenshots), so they stay crisp and can animate.
3. **Hero WebGL ribbon.** A translucent blue silk ribbon (canvas) sweeping diagonally behind the gap between the H1 column and the paragraph column, cropped by the hero cell. It is the only "art" on the page.

## 4. Layout & Composition

### 4.1 Grid & containers

- **Container:** 1240px max (`max-w-[1240px]`), centred (100px side margins at 1440), 1px rails. Inner padding 20px mobile / 36px ≥md. Section intros inset a further ~12px (text starts at x=149 vs the rail at x=100). ✅
- **Header:** 81px sticky, aligned to the same container.
- **Grids:** 2-col 50/50 (most features, pricing CTA, FAQ), 3-col equal (trust pillars, pricing), 4-col (logo walls). All gapless and divided by rails. ✅
- **Hierarchy:** set by size (54 → 40 → 24) and **colour step** (`text-strong` headlines vs `text-sub` body), never by colour hue. Weight is flat: 600 for all headings.

### 4.2 Composition patterns

Section order (desktop y-positions ✅):

| # | y | Section | Pattern |
|---|---|---|---|
| 1 | 81 | Hero | **Split hero**: left = trust line ("Backed by Galaxy" + icon) → H1 (2 lines) → green CTA → micro-copy; right (x≈900) = two 18px `text-sub` paragraphs; ribbon canvas in the middle. 389px tall. |
| 2 | 470 | Index row | Label + chip rows ("Use cases", "Integrations"). 136px. |
| 3 | 606 | App showcase | Full-width product mock framed by the blue texture (720px). |
| 4 | 1326 | "Give it a try. It's Free." | Centred try-it band with ribbon images left and right (680px). |
| 5 | 2006 | "Turn your ideas into live trades." | Intro + 2-col (chat + workflow graph). |
| 6 | 2732 | "Purpose-built for autonomous agents." | Intro + 2×2 feature cells. |
| 7 | 4074 | "All the data your agents need…" | Intro + 4-col data-source wall. |
| 8 | 4729 | "Ask a question. Get a chart back." | Intro + 2-col chat gallery, 3 rows (2028px). |
| 9 | 6757 | "Trade across the venues you already use." | Intro + 4×2 logo wall (140px cells, greyscale/mono logos). |
| 10 | 7342 | "Test and prove it on paper trading." | Intro + 2-col: 3-step stepper (numbered circles on a line) + paper-exchange card. |
| 11 | 8101 | "You stay in control." | Intro + 3-col trust pillars (icon, H3, body, optional tag). |
| 12 | 8748 | "The right plan for your strategy" | Intro with right-aligned billing toggle + 3-col pricing. |
| 13 | 9664 | "Built for funds and enterprises…" | 2-col enterprise pitch. |
| 14 | 10025 | FAQ | 2-col: brand image left, accordion right. |
| 15 | 10457 | Closing CTA + footer | 2-col CTA (H2 + micro-copy left; Nick identity + outline/dark buttons right), then a 3-group footer (PRODUCT / COMPANY / LEGAL, links 15px `text-sub`, 36px row spacing). |

**Canonical section pattern:** *intro block (H2 + paragraph, left-aligned, max ~860px) → full-bleed rule → cell grid → hatch band.* ✅ Headlines are left-aligned everywhere except the try-it band.

### 4.3 Responsive behavior

| Breakpoint | Behaviour | Confidence |
|---|---|---|
| ≥768 (md) | Container gutter 36px, multi-column grids | ✅ (`md:px-9`) |
| 375 (mobile) | Gutter 20px; H1 54→40, H2 40→32; hero stacks: H1 → CTA → micro-copy → paragraphs; nav → hamburger | ✅ |
| Tablet | Not captured | ❓ |

- **Collapsing:** hero split → stacked; 2-col → 1-col; chip rows wrap; logo wall 4 → 2 ⚠️; pricing 3 → 1 ⚠️. The mobile page is 15,294px vs 11,015px desktop, which fits every grid going single-column.
- **Container queries:** the class list includes `@container` ✅, so cells size mock content to the cell, not the viewport.
- **Touch targets:** chips (32px) and header pills (36px) are under 44px.

### 4.4 Image behavior

- **Hero ribbon:** WebGL `<canvas>`, blue translucent silk, animated ✅.
- **Brand textures:** painterly deep-blue grain images (`.avif`/`.webp`) used as frames/backgrounds, always cropped by a cell or 20px-radius frame ✅.
- **Logo walls:** partner wordmarks in greyscale/black (some in their own type styles, e.g. Hyperliquid's serif italic), centred in 140px square-ish cells ✅.
- **Mocks:** inline SVG/HTML product UI, not raster screenshots ✅.
- **Icons:** 16–20px line icons, ~1.5px stroke, `text-sub` colour (lucide-like ⚠️). Model logos (OpenAI, Anthropic, DeepSeek) appear as coloured 40px circles in the orbit illustration.
- **Avatars:** round photos at 32px.

## 5. Reconstruction Notes

- **Stack:** Next.js (the `/_next/static/` chunks) + Tailwind CSS v4 (`--spacing`, `--color-*-NNN`, `@container`, arbitrary `max-w-[1240px]` classes) ✅. Rebuild with Next + Tailwind v4 and put these tokens in `@theme`.
- **Quick wins:** (1) the ledger wrapper plus hatch-band utility (`bg-[repeating-linear-gradient(315deg,rgb(0_0_0/.06)_0_1px,transparent_0_50%)] bg-[length:10px_10px] h-12`); (2) Manrope at `font-weight:440` through the variable font; (3) the six-layer `card-app` shadow as one utility.
- **Tricky bits:** (1) `duplet` is a licensed font, so pick a geometric fallback and tune the −0.5px tracking; (2) the WebGL ribbon, which a looping muted video or a static `.webp` can stand in for; (3) full-bleed section rules that escape the 1240 container while the rails stay inside (absolute `inset-x-0` at section level, not container level); (4) scroll-triggered streaming chat demos (IntersectionObserver + staggered typing dots → content).
- **Implicit states to define:** nav/chip hover (pill `surface-weak` bg), button hover (`primary-dark` / darker green), focus-visible rings (missing), FAQ open (the + rotates to ×, body expands), toggle transition (150ms `ease-default`), mobile drawer.

| Layer | Confidence | Why |
|---|---|---|
| Colors | ✅ | Theme vars + computed styles agree |
| Typography | ✅ | Computed families, sizes, weights; duplet licence ❓ |
| Spacing | ⚠️ | Key paddings computed; section padding estimated from frames |
| Components | ✅/⚠️ | Buttons/chips/header computed; pricing features and FAQ open state unseen |
| Layout | ✅ | DOM outline gave widths, grid templates, y-positions |
| Motion | ⚠️ | Default 150ms token; ribbon and chat reveal seen, curves not measured |

## 6. Do's and Don'ts

### Do
- Keep every section on white `{colors.surface}` (#FFFFFF) and separate sections with 1px `{colors.rail}` rules and 48px hatch bands, never with background tints.
- Keep `{colors.go}` (#00A63E) for "start / execute / free" actions and positive money, and `{colors.primary}` (#0178FF) for brand chrome and the header CTA.
- Set every headline in duplet 600 with −0.5px tracking, ending with a full stop ("You stay in control.").
- Use `{rounded.pill}` for every marketing control and `{rounded.lg}` (20px) only for product-UI cards.
- Show the product: fill feature cells with live, animatable UI mocks inside `card-app`, not illustrations or stock imagery.

### Don't
- Don't round or shadow page-level cells, pricing columns or logo tiles. The ledger is square and flat (`rounded: 0`).
- Don't set body copy at weight 400 or in `{colors.text-soft}` (#9F9FA9). Body is 440 in `{colors.text-sub}` (#52525C); soft grey is for tertiary labels only.
- Don't add uppercase eyebrows above section H2s. Uppercase is limited to footer column heads and in-mock micro-tags.
- Don't use the Tailwind accent palette (purple, rose, amber…) in UI chrome. It is for chart and data series only.
- Don't let a blue texture or ribbon appear outside its scoped zones (hero, app showcase, try-it band, FAQ image).

## 7. Open Questions

- Hover, active and focus states for buttons, chips and nav: capture with a hover/focus pass, or read from the CSS.
- Pricing-card lower half (feature lists, CTAs): needs a frame at y≈9000–9600.
- The "Give it a try" band, the data-source wall contents and the enterprise section were not framed at desktop.
- Dark-mode visuals: tokens are known; capture after toggling the moon icon.
- The duplet licence source (foundry) and the exact hero ribbon implementation (shader vs video).
- Tablet breakpoint behaviour: re-run with `--viewports desktop,tablet,mobile`.

## 8. Companion files

- `design-tokens.json`: DTCG tokens generated from this frontmatter by `build_tokens_json.py`.
- `design-a11y.md`: WCAG contrast table for 9 text/surface pairs.
- Frames: `capture-desktop-01..04.png`, `capture-d-05..08.png`, `capture-mobile-01..04.png`.
- `css-vars.json`: raw token dump (don't read whole; use `extract_css_vars.py --grep`).
