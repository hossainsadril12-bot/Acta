# .spine/config.md — pinned cross-cutting context (asserted before task one)
- Stack:            Next.js 16 (App Router, RSC) + React 19 + TypeScript strict, on Node 26. Tailwind CSS 4 via @tailwindcss/postcss. zod 4 for content validation. npm. Single app at the project root; server code in src/app/api route handlers.
- Test runner:      Vitest 4 (jsdom + Testing Library) for tests/unit, Playwright (chromium) for tests/e2e.
- DB / project / env: None yet. No database, no deploy target. The signup route validates and returns without storing.
- Auth context:     None.
- Conventions:      Tokens only from design-system/acta/tokens.css (via Tailwind @theme inline or var(--token)), no raw hex in src/. All copy from content/site.json validated by src/content/schema.ts. Components follow design-system/acta/MASTER.md and docs/references/nick-analysis/design.md 1:1. Folders: src/app, src/components/{layout,ui,mocks,sections}, src/content, src/lib, tests/{unit,e2e}. Commits deferred until the user asks (2026-09-30).
- Boot assertion:   `npm run build` fails loudly when content/site.json does not match the schema (parseSiteContent throws at module load).
