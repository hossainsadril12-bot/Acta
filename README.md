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
