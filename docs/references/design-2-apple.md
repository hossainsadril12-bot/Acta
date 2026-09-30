# iPad Pro

## Mission
Create implementation-ready, token-driven UI guidance for iPad Pro that is optimized for consistency, accessibility, and fast delivery across e-commerce storefront.

## Brand
- Product/brand: iPad Pro
- URL: https://www.apple.com/ipad-pro/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=SF Pro Text`, `font.family.stack=SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif`, `font.size.base=12px`, `font.weight.base=400`, `font.lineHeight.base=16.0005px`
- Typography scale: `font.size.xs=8.4px`, `font.size.sm=12px`, `font.size.md=14px`, `font.size.lg=17px`, `font.size.xl=19.89px`, `font.size.2xl=20px`, `font.size.3xl=21px`, `font.size.4xl=28px`
- Color palette: `color.text.primary=#f5f5f7`, `color.text.secondary=#ffffff`, `color.text.tertiary=#86868b`, `color.text.inverse=#2997ff`, `color.surface.base=#000000`, `color.surface.raised=#0071e3`
- Spacing scale: `space.1=2px`, `space.2=3px`, `space.3=4px`, `space.4=8px`, `space.5=9.6px`, `space.6=10px`, `space.7=11px`, `space.8=12px`
- Radius/shadow/motion tokens: `radius.xs=10px`, `radius.sm=32px`, `radius.md=980px` | `motion.duration.instant=240ms`, `motion.duration.fast=320ms`, `motion.duration.normal=400ms`, `motion.duration.slow=1800ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (433), buttons (139), cards (120), lists (101), navigation (10), inputs (5).


## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
