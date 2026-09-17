---
status: Done
branch: feat/nextjs-scaffold
prd_ref: '§5, §6, §7 item 1'
---

# 0001 — Next.js app scaffold

Written retroactively — this predates the spec-driven workflow itself ([0000... see .claude/skills/spec-driven-dev](../.claude/skills/spec-driven-dev/SKILL.md)), documented here so the spec index has a complete, honest record of what shipped.

## Goal

Turn `design/homepage-mockup.html` into a real, running Next.js app, and add the Claude-facing instruction layer (CLAUDE.md + project skills) so later specs build consistently instead of re-deriving conventions each time.

## What was implemented

- **App:** Next.js (App Router) + TypeScript + Tailwind v4, bootstrapped via `create-next-app` and merged into the existing repo.
- **Home page (`/`):** fully built, matches the mockup — Hero → Blog preview → Photography teaser, light/dark/OS-driven theming, scroll-reveal, live IST clock.
- **Design tokens:** ported from the mockup into `app/globals.css` via Tailwind v4's `@theme inline`, same three-state theming as the mockup.
- **Stub pages:** `/portfolio`, `/projects`, `/blog`, `/blog/[slug]`, `/photography` all render (share Nav/Footer) but hold placeholder content, not real data.
- **Content pipeline:** `lib/mdx.ts` (gray-matter + next-mdx-remote) reads `content/blog/*.mdx`; one placeholder post seeded (`hello-world.mdx`) to prove the pipeline end to end.
- **Sanity client:** `lib/sanity.ts` built defensively — `sanityConfigured` is `false` and every consumer falls back to a placeholder grid when no project ID is set. Verified: app builds and runs with zero Sanity env vars.
- **Two design gaps resolved:** button hover state (`hover:opacity-90`) and the nav double-border bug class (Tailwind utilities directly on elements, no scoped CSS) — both written back into `docs/DESIGN-SYSTEM.md`.
- **Instruction layer:** root `CLAUDE.md` + `README.md`, plus four project skills — `design-system-ui`, `content-authoring`, `sanity-cms` (flagged spec-derived, pending a real Sanity project), `deploy-vercel`.

## Explicitly not included

- Real content for Portfolio, Projects, or Blog (see 0002-0004)
- A real Sanity project, schema, or `/studio` route (see 0005-0006)
- Real photos (see 0007)
- Any deployment or DNS work (see 0008-0009)

## Acceptance criteria (met)

- [x] `npm run build`, `lint`, `typecheck`, `format` all clean
- [x] All 5 routes render without error
- [x] App builds/runs with zero Sanity env vars
- [x] Home page matches mockup in light, dark, and mobile viewport

## Notes

Shipped as [PR #2](https://github.com/ShahArpit89/arpitshah.in/pull/2) — a single large PR (~25k lines, mostly `package-lock.json`). That's the thing this spec-driven workflow exists to prevent going forward: every spec after this one should be its own small, reviewable PR.
