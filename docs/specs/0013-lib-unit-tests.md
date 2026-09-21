---
status: Planned
branch: spec/0013-lib-unit-tests
prd_ref: none
github_issue: 23
---

# 0013 — Unit test coverage for the content/data layer (`lib/`)

## Goal

Backfill tests for the three modules every page render depends on — `lib/mdx.ts`, `lib/projects.ts`, `lib/sanity.ts` — none of which have any coverage today. The highest-value target is `lib/sanity.ts`'s zero-env-var fallback: CLAUDE.md states as an invariant that "the app must build and run with zero Sanity environment variables set," but nothing currently regression-tests that this stays true as the module changes.

## Scope

**In:**

- `lib/mdx.test.ts`:
  - `getAllPostSlugs`: returns `[]` when the blog content directory doesn't exist; returns slugs (extension stripped) for `.mdx` files only, ignoring other file types
  - `getPostBySlug`: parses frontmatter and content correctly via `gray-matter` for a given file
  - `getAllPosts`: sorts posts descending by `frontmatter.date`
- `lib/projects.test.ts`:
  - `getAllProjects`: returns `[]` when `content/projects.json` doesn't exist; returns the parsed array when it does
- `lib/sanity.test.ts`:
  - Unconfigured (no `NEXT_PUBLIC_SANITY_PROJECT_ID`): `client` is `null`, `sanityConfigured` is `false`, `urlFor()` throws, `getPhotos()` resolves to `[]`
  - Configured (env var set, `next-sanity`'s `createClient` mocked): `client` is non-null, `getPhotos()` calls the mocked client's `fetch` with the expected query string
- Mocking strategy: `node:fs` mocked (`vi.mock('node:fs')`) for the `mdx.ts`/`projects.ts` tests rather than reading real repo content, so these tests stay independent of 0004's real blog posts landing later. `lib/sanity.ts` reads `process.env` at module import time, so its tests use `vi.resetModules()` + dynamic `import()` to get a fresh module per env-var scenario within one file, with `next-sanity`'s `createClient` mocked via `vi.mock('next-sanity')`.

**Out:**

- Component tests (`Button`, `Nav`, `PhotoGrid`, etc.) — future spec (0014), a different concern (rendering/interaction, not data loading)
- Testing `app/` pages or route handlers directly — future spec, once a component-testing convention exists to build on
- Real network calls against a live Sanity dataset — always mocked here; integration testing against real Sanity is a different spec if ever needed
- Coverage percentage thresholds — no gate, consistent with 0012's Scope Out

## Approach

`lib/mdx.ts` and `lib/projects.ts` read from `process.cwd()`-relative paths via `node:fs`, so tests mock `readFileSync`/`existsSync`/`readdirSync` rather than depending on the actual contents of `content/blog/` or `content/projects.json` — those will change the moment 0004 (real blog post) and 0003 (real project entries) land, and coupling tests to real content would make them brittle against unrelated content changes.

`lib/sanity.ts` computes `client`, `sanityConfigured`, and the image `builder` at module import time from `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID`. Because ES module state is cached after first import, testing both the configured and unconfigured branches in one file requires `vi.resetModules()` between cases plus a fresh dynamic `import('./sanity')` — a plain top-level `import` would only ever see whichever env state was active on first load.

Requires 0012's Vitest setup (config, jsdom environment, co-located `*.test.ts` convention) to already exist.

## Acceptance criteria

- [ ] `lib/mdx.test.ts` covers `getAllPostSlugs`, `getPostBySlug`, and `getAllPosts` (including the empty-directory and sort-order cases) — all passing
- [ ] `lib/projects.test.ts` covers `getAllProjects` for both a present and a missing `content/projects.json` — passing
- [ ] `lib/sanity.test.ts` covers both the unconfigured branch (`client`/`sanityConfigured`/`urlFor`/`getPhotos` behavior with no env var) and the configured branch (`getPhotos` calling a mocked client's `fetch` with the right query) — passing
- [ ] `npm run test` (from 0012's CI step) stays green with this suite added
- [ ] None of these tests depend on the real contents of `content/blog/` or `content/projects.json` — verified by the suite still passing if those are temporarily renamed locally

## Dependencies

Requires 0012 (testing infrastructure) done first — needs Vitest configured and the co-located test-file convention established before these tests can be written.
