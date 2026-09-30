---
version: anydesign-element-1
name: Aeye "Less manual work" value section (layout + card size)
source: https://aeye-saas.webflow.io/
captured_at: 2026-09-30
kind: code
target:
  description: "Section 'Less manual work. More intelligent execution.' — layout and card size only; the Get Started button is out of scope"
  selector: "section.section:has(.value-layout)"
spacing-used: [8, 16, 24, 40, 56, 64, 80]
rounded-used: { none: 0px }
---

# Element — Aeye value section (layout and card size)

> Generated with the `anydesign` skill (element mode). Kind: code · Date: 2026-09-30
> Scope: layout, grid and card geometry. Colors and fonts are Aeye's. Do not copy them.

## Source & target

- **Source**: https://aeye-saas.webflow.io/ (the second section, `[N.01/11] > KEY VALUE`)
- **Targeting**: DOM-based ✅. I measured `getBoundingClientRect` and the computed styles at 1440, 1024, 768 and 390px wide.
- **Context**: a white page. The container is 1210px wide at a 1440px viewport. The page gutter is fluid: `padding: 0 8vw` (115px at 1440px, 24px on mobile). The container's `max-width` is 1280px.
- **Captures**: `desktop.png`, `hover.png`, `mobile.png` (in this folder)

## 1. What this element is

This is a three-pillar value strip. The heading stacks above a row of three tall, square-cornered cards with hairline borders. What makes it distinctive is the **tall empty card**. Each card is 496px high, but its content only fills the top 272px and the tag at the bottom. The empty middle creates a calm, gallery-like rhythm, and on hover the description fills that space without changing the card's height.

## 2. Spec

### Section skeleton (1440px desktop)

```
section                      padding 80px 0 (mobile 56px 0)
└ container (max 1280, 1210 wide at 1440)
  └ .value-layout            flex column, gap 24px (mobile 16px)
    ├ eyebrow row            21px tall: "[N.01/11] ── > KEY VALUE ──────── (rule to the right edge)"
    └ .value-main            flex column, gap 64px (mobile 40px)
      ├ .value-heading       flex row, space-between, align-items flex-start
      │   h2 (636px wide, 2 lines, 123px tall)      [button, ignored]
      └ .value-content       grid, 3 columns of 1fr, gap 8px, card height 496px
```

Vertical rhythm at 1440px, measured from the section top:

| Y | What |
|---|---|
| 0 → 80 | section padding |
| 80 → 101 | eyebrow (21px) |
| 101 → 125 | gap, 24px |
| 125 → 248 | heading, 2 lines at 56/61.6, 123px |
| 248 → 312 | gap, 64px |
| 312 → 808 | cards, 496px |
| 808 → 888 | section padding |

The section is **888px** tall, about one viewport.

### Card geometry

| Viewport | Grid | Card w × h | Gap | Ratio |
|---|---|---|---|---|
| 1440 | `repeat(3, 1fr)` | **398 × 496** | 8px | ~0.8, a portrait card |
| 1024 | 3 cols | 281 × 496 | 8px | 0.57 |
| 768 | 3 cols | 225 × 496 | 8px | 0.45 |
| 390 | **slider**, 1 card visible | 340 × 399 | — | 0.85 |

The height is **fixed at 496px** at every desktop and tablet width, so only the width flexes. At 768px the cards become very narrow. That is a weakness; see §5.

### Inside one card (desktop, offsets relative to the card)

```
.value-card   flex column, justify-content: space-between, padding 24px,
              border 1px #E0E0E0, radius 0, background transparent
├ content     flex column, gap 40px          (y 25 → 272)
│ ├ top row   flex row, space-between, 160px tall
│ │   icon 160×160 (top-left)      "//001" index (top-right, 16px)
│ └ title wrap  flex column, gap 16px
│     title 24/31.2 (500)
│     description 16/20.8. Collapsed at rest (height 0), 62px on hover
└ tag         bottom-left, 25px tall, mono 14px uppercase, grey chip, padding 2.8px 0
```

- Content area: 348px wide inside the 24px padding. The top block ends at y 272 and the tag sits at y 446 → 471. **About 174px of deliberate empty space** separates them.
- `gap: 80px` on the card is a *minimum* between the content and the tag. `space-between` does the real work.
- Hover: the title turns the accent color, the icon swaps to a pixel-art version, and the description expands into the empty space. **The card height does not change.**

### Mobile (390px)

- Gutter 24px, section padding 56px, `.value-main` gap 40px.
- The heading and button stack, with a 24px gap.
- The grid becomes one bordered slider (342 × 401). Each slide is 340 × 399 and one slide shows at a time.

## 3. Reconstruction prompt (layout only, for Acta)

> Build a value section: an eyebrow row, a two-line h2 on the left and an optional action on the right (`justify-content: space-between`, `align-items: flex-start`), then a grid of cards from a content array (`features[]`, any count).
> Spacing: section `padding-block: 80px` (56px on mobile), eyebrow→heading 24px (16px), heading→grid 64px (40px).
> Grid: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 8px`.
> Card: `min-height: 496px; display: flex; flex-direction: column; justify-content: space-between; padding: 24px; border: 1px solid var(--border); border-radius: 0`. Top block: a row with the icon (160px square) and the index ("//001") at the far ends, then 40px, then the title with a 16px gap to the description. The tag sits alone at the bottom.
> Mobile (<768px): one column, or a scroll-snap row with each card at `flex: 0 0 88%` and `min-height: 400px`.
> Use Acta tokens only. Do not copy Aeye's blue, Geist or grey chips.

## 4. Consistency notes (moving this into Acta)

- The ledger fit is strong. Aeye's hairline, square-cornered, 8px-gap cards match Nick's ledger. Map the border to `--border` and the tag chip to `--acta-surface-tint`.
- Use `min-height` instead of Aeye's fixed `height: 496px`, so longer copy from `site.json` can't overflow the card (CLAUDE.md: layouts must tolerate content changes).
- Replace Aeye's fixed 3-column tablet grid with `auto-fit`. It avoids the cramped 225px cards at 768px.
- If Acta keeps its four features, 4 × 1fr at 1210px gives 296px cards. Use `minmax(280px, 1fr)` so the grid wraps to 2 × 2 on tablets.
- Revealing the description on hover is inaccessible on touch screens and to keyboard users. In Acta, show it by default, or reveal it on `:focus-within` too.

## 5. Confidence & open questions

| Aspect | Confidence | Why |
|---|---|---|
| Targeting | ✅ | DOM selector |
| Sizes and gaps (desktop and tablet) | ✅ | measured from the rendered page |
| Mobile slider | ✅ | measured; the swipe behavior is Webflow's `w-slider` |
| Hover | ⚠️ | description height and swap observed; exact easing not measured |
| Breakpoints between the measured widths | ❓ | only 1440, 1024, 768 and 390 were sampled |

Open question: should Acta's feature grid move to this tall-card layout (3–4 columns, with the demo mocks inside the cards), or keep its current layout and borrow only the spacing rhythm?
