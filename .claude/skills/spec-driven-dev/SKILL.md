---
name: spec-driven-dev
description: This project develops step by step from written specs, not big batched changes. Use this before starting ANY task on arpitshah.in beyond a trivial one-line fix — writing a new page, wiring up Sanity, touching deploy config, adding content tooling. Also use it if asked to "create a spec," "what's the status of X," or "plan the next step."
---

# Spec-Driven Development — arpitshah.in

This repo was built once as one large batched PR (0001-nextjs-scaffold) and it caused real confusion about what was done vs. remaining, and produced a ~25k-line PR nobody could meaningfully review. This workflow exists specifically to prevent that from happening again — not as process for its own sake.

## The rule

**Every task gets a spec file before implementation starts.** A spec is short — goal, scope in/out, approach, acceptance criteria — not a design document. See [../../../docs/specs/TEMPLATE.md](../../../docs/specs/TEMPLATE.md).

1. Create `docs/specs/NNNN-slug.md` from the template (`NNNN` = next number, `slug` = kebab-case short name).
2. Get it confirmed before writing code — even a one-line "yes, that scope is right" from Arpit. A spec nobody agreed to is just a plan you wrote for yourself.
3. Create a GitHub Issue from the confirmed spec (see "GitHub Issues" below) and record its number in the spec's `github_issue` frontmatter field.
4. Create branch `spec/NNNN-slug` — matching the spec file's own name, so branch and spec are always traceable to each other.
5. Implement **only what the spec's Scope section says is in.** If you discover the task is bigger than the spec assumed, stop and split it into a follow-up spec rather than quietly expanding scope mid-implementation.
6. Open a PR from that branch, with `Closes #N` in the description so merging auto-closes the tracking issue. Keep it small enough to actually review — if a spec's implementation is inherently large, that's a signal the spec itself should have been split into smaller specs, not that the PR should just be big.
7. Update the spec's `status` frontmatter (Planned → In Progress → Done) and [docs/specs/README.md](../../../docs/specs/README.md)'s index as work progresses.

## GitHub Issues

Every spec gets exactly one tracking issue, created right after the spec is confirmed (step 3 above). The issue is the _operational_ status layer — open/closed, assignee, project board — while the spec file stays the _technical_ record (Goal/Scope/Approach/Acceptance criteria). Don't duplicate one into the other beyond what's needed for the issue to stand alone:

- **Title:** `[NNNN] <spec title>` — e.g. `[0002] Real Portfolio page content`.
- **Body:** the spec's Goal, its Acceptance criteria reproduced as a literal `- [ ]` checklist (GitHub renders these as trackable checkboxes), its Dependencies, and a link to the spec file. Don't restate Scope or Approach — link instead.
- The spec's `github_issue: N` frontmatter field points at the issue; the issue body links back to the spec — traceable both ways, same pattern as `branch:`.
- Closing happens automatically via the PR's `Closes #N`, not manually — if a spec turns out not needed, close its issue with a reason instead of leaving it to rot open.

## Sequential vs. parallel implementation

Default to one issue/spec at a time. Multiple specs can be implemented in parallel (separate sessions or worktrees, each on its own `spec/NNNN-slug` branch) only when each spec's own **Dependencies** section confirms there's no ordering constraint between them _and_ their Scope sections don't touch the same files — check both before starting, don't assume. When in doubt, stay sequential; a merge conflict between two "parallel" specs costs more than the time saved.

## What counts as "a task"

Roughly: anything that would otherwise become its own PR. A single-line typo fix or a config tweak doesn't need a spec. Building a page, wiring a new integration, adding a content pipeline, changing deploy config — all of these do.

## Spec content guidelines

- **Scope Out is as important as Scope In** — write down what you're deliberately not doing, so a reviewer (or future you) can tell "not done yet" from "not done on purpose."
- **Link, don't duplicate.** A spec references PRD.md/DESIGN-SYSTEM.md/other skills for anything already documented there — it shouldn't restate the design system or content schema, just point at them.
- **Acceptance criteria are checkable**, not vibes — "renders on X route," "build passes," not "looks good."
- **Dependencies are explicit** — if a spec can't start until another one lands (e.g. photography content needs the Sanity project to exist first), say so, so specs don't get picked up out of order by accident.

## Relationship to other conventions

- Branch naming here (`spec/NNNN-slug`) supersedes [git-workflow](../git-workflow/SKILL.md)'s more general `<type>/<short-description>` pattern for anything that has a spec. Git-workflow's commit-message and squash-merge conventions still apply unchanged on top of this.
- [docs/specs/0001-nextjs-scaffold.md](../../../docs/specs/0001-nextjs-scaffold.md) is the retroactive record of everything built before this workflow existed, and is the reference example for "done" spec status.
