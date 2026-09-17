---
status: In Progress
branch: spec/0011-github-actions-ci
prd_ref: none
---

# 0011 — GitHub Actions CI + Dependabot

## Goal

Add automated quality gates (lint, typecheck, build, format) on every PR and push to `main`, enforced as required status checks, plus Dependabot for dependency update PRs. This is CI only — Vercel already handles CD (build+deploy on push/PR per [deploy-vercel](../../.claude/skills/deploy-vercel/SKILL.md)); GitHub Actions isn't duplicating that, it's giving objective pass/fail signal on the PR itself ahead of/alongside Vercel's own build. 0008-deploy-vercel explicitly scoped this out ("Any CI beyond Vercel's own build") — this spec is that deferred work.

## Scope

**In:**

- `.github/workflows/ci.yml`: one workflow, triggered on `pull_request` (base `main`) and `push` to `main` — steps: checkout, `actions/setup-node` (`node-version: lts/*`, npm cache), `npm ci`, then `npm run lint`, `npm run typecheck`, `npm run build`, `npm run format:check`
- Add `"format:check": "prettier --check ."` to `package.json` scripts — the existing `format` script writes, CI needs a non-mutating check
- Concurrency group so a new push cancels a superseded run for the same PR/branch
- `.github/dependabot.yml`: weekly update PRs for the `npm` ecosystem and the `github-actions` ecosystem (so the workflow's own action versions stay current), targeting `main`
- Document in this spec (not implement in-repo — it's a GitHub repo-settings change, not a file) that Arpit needs to enable branch protection on `main` requiring the CI check to pass before merge, same treatment as the DNS cutover in 0009: something he does himself in GitHub settings, not an unsupervised step taken on his behalf

**Out:**

- Any browser/visual testing (Playwright, Lighthouse budgets) — would partially automate the manual light/dark/mobile check in CLAUDE.md's "Verification expectations," but is real added complexity; future spec if wanted
- Content schema validation (`projects.json` shape, blog MDX frontmatter fields) — future spec
- An automated Claude Code review bot commenting on PRs — future spec, needs its own decision on whether it's wanted at all
- Any change to Vercel's own build/deploy config — untouched, out of this spec's concern entirely

## Approach

Single job, sequential steps (not parallel jobs) — repo is small enough that splitting lint/typecheck/build/format into separate jobs would just add queue overhead without a real speed win. `npm ci` (not `npm install`) for reproducible installs from `package-lock.json`. CI uses `node-version: lts/*` rather than a hard-pinned number — consistent with the project's own "whatever's current" Node policy (no `.nvmrc`, per CLAUDE.md) while still staying on an LTS release rather than tracking bleeding-edge current.

Dependabot config groups minor/patch npm updates to reduce PR noise where reasonable; major version bumps still get their own PR since those can be breaking (Next.js, React, Tailwind major bumps need eyes-on review, not auto-merge).

Branch protection itself can't be expressed as a repo file — it's configured in GitHub's Settings → Branches UI (or via the GitHub API with admin rights this session doesn't have a tool for). This spec's acceptance criteria call it out as a manual step for Arpit to complete once the workflow's check name exists to select.

## Acceptance criteria

- [x] `.github/workflows/ci.yml` exists and runs lint/typecheck/build/format-check on every PR against `main` and every push to `main`
- [ ] A deliberately broken PR (lint error, type error, or unformatted file) shows a failing check — not yet exercised; implied by the passing run but not directly tested
- [x] A clean PR shows all steps passing — verified on [PR #5](https://github.com/ShahArpit89/arpitshah.in/pull/5), run [35288755824](https://github.com/ShahArpit89/arpitshah.in/actions/runs/35288755824), conclusion `success`
- [x] `format:check` script added to `package.json`; existing `format` script's write behavior unchanged
- [x] `.github/dependabot.yml` exists for `npm` and `github-actions` ecosystems, weekly schedule
- [ ] Arpit has enabled branch protection on `main` requiring the CI check before merge (manual, still outstanding — the check now exists on `main` and is selectable)

## Dependencies

None.
