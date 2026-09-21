---
status: In Progress
branch: spec/0012-testing-infrastructure
prd_ref: none
github_issue: 22
---

# 0012 — Testing infrastructure (Vitest + React Testing Library)

## Goal

Stand up the test framework and CI wiring this project never had, so tests can be written alongside code from here forward instead of after the fact. This spec is infrastructure only — it proves the harness works end-to-end (config, path aliases, CI) with one smoke test, not real coverage. Real coverage starts with 0013.

## Scope

**In:**

- devDependencies: `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- `vitest.config.ts`: `plugins: [react()]`, `resolve.tsconfigPaths: true`, `test.environment: 'jsdom'`, `test.setupFiles: ['./vitest.setup.ts']`, `test.include` matching co-located `*.test.ts` / `*.test.tsx` files next to the source they test
- `vitest.setup.ts`: imports `@testing-library/jest-dom/vitest` so matchers like `toBeInTheDocument()` are available everywhere
- `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`
- `.github/workflows/ci.yml`: add a `- run: npm run test` step, extending 0011's workflow
- One smoke test (`test/smoke.test.tsx`) that renders a trivial inline component with React Testing Library, asserts with a `jest-dom` matcher, and imports one thing via the `@/` alias — proves jsdom, RTL, jest-dom, and path resolution all work together. It doesn't test app logic.
- Establish (by example, in this spec) the convention that test files live **next to** the source file they test (`lib/mdx.ts` → `lib/mdx.test.ts`), not in a mirrored top-level tree — so 0013 and later specs don't have to re-decide this.

**Out:**

- Actual coverage of `lib/mdx.ts`, `lib/projects.ts`, `lib/sanity.ts` — 0013
- Component tests for anything in `components/` — future spec (0014)
- Playwright/e2e or visual regression testing — already called out as future work in 0011's Scope Out
- Coverage thresholds or CI gates on coverage percentage — meaningless with ~zero coverage today; revisit once 0013 and a component-testing spec exist
- Mocking `next-sanity`'s client — that's 0013's concern since it's the first spec to actually touch `lib/sanity.ts` in a test

## Approach

Deviation from the plan above: the spec originally called for the `vite-tsconfig-paths` plugin to resolve `tsconfig.json`'s `paths` without redefining them. Vitest 5's bundled Vite version supports this natively via `resolve.tsconfigPaths: true`, which Vite itself now recommends over the plugin — same outcome (the `@/*` alias resolves identically to `tsconfig.json`, proven by the smoke test's alias import), one fewer devDependency to maintain. Discovered during implementation, not a scope change.

`test.environment` is set to `jsdom` globally (not `node`) because the upcoming component-testing spec (0014) needs it, and Node's `fs`/`path` APIs that `lib/mdx.ts` and `lib/projects.ts` use work fine under jsdom — no per-file `// @vitest-environment` pragmas needed for now.

Test files are co-located with source (`lib/mdx.ts` + `lib/mdx.test.ts` in the same directory) rather than mirrored under a top-level `test/` or `__tests__/` tree, for discoverability — the smoke test itself is the one exception, since it isn't testing a specific source file, and lives at `test/smoke.test.tsx`.

CI's `npm run test` step goes after `typecheck` and before `build` in `ci.yml` — tests run against source directly via Vitest/esbuild, not against Next's build output, so there's no ordering dependency on `build` succeeding first.

## Acceptance criteria

- [x] `npm run test` runs Vitest and passes locally
- [x] `test/smoke.test.tsx` renders a trivial component via React Testing Library, asserts with a `jest-dom` matcher, and passes
- [x] The smoke test (or a dedicated config test) imports a module via the `@/` alias, proving `vitest.config.ts` resolves it the same way `tsconfig.json` does
- [ ] `.github/workflows/ci.yml` runs `npm run test` and a CI run on this spec's own PR shows it passing
- [x] `npm run typecheck` and `npm run lint` stay clean with the new config/test files in the tree

## Dependencies

None. Extends 0011's CI workflow file but doesn't require anything further from it.
