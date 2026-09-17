---
name: spec-driven-dev
description: This project develops step by step from written specs, not big batched changes. Use this before starting ANY task on arpitshah.in beyond a trivial one-line fix — writing a new page, wiring up Sanity, touching deploy config, adding content tooling. Also use it if asked to "create a spec," "what's the status of X," or "plan the next step."
---

# Spec-Driven Development — arpitshah.in

This repo was built once as one large batched PR (0001-nextjs-scaffold) and it caused real confusion about what was done vs. remaining, and produced a ~25k-line PR nobody could meaningfully review. This workflow exists specifically to prevent that from happening again — not as process for its own sake.

## The rule

**Every task gets a spec file before implementation starts.** A spec is short — goal, scope in/out, approach, acceptance criteria — not a design document. See [../../../specs/TEMPLATE.md](../../../specs/TEMPLATE.md).

1. Create `specs/NNNN-slug.md` from the template (`NNNN` = next number, `slug` = kebab-case short name).
2. Get it confirmed before writing code — even a one-line "yes, that scope is right" from Arpit. A spec nobody agreed to is just a plan you wrote for yourself.
3. Create branch `spec/NNNN-slug` — matching the spec file's own name, so branch and spec are always traceable to each other.
4. Implement **only what the spec's Scope section says is in.** If you discover the task is bigger than the spec assumed, stop and split it into a follow-up spec rather than quietly expanding scope mid-implementation.
5. Open a PR from that branch. Keep it small enough to actually review — if a spec's implementation is inherently large, that's a signal the spec itself should have been split into smaller specs, not that the PR should just be big.
6. Update the spec's `status` frontmatter (Planned → In Progress → Done) and [specs/README.md](../../../specs/README.md)'s index as work progresses.

## What counts as "a task"

Roughly: anything that would otherwise become its own PR. A single-line typo fix or a config tweak doesn't need a spec. Building a page, wiring a new integration, adding a content pipeline, changing deploy config — all of these do.

## Spec content guidelines

- **Scope Out is as important as Scope In** — write down what you're deliberately not doing, so a reviewer (or future you) can tell "not done yet" from "not done on purpose."
- **Link, don't duplicate.** A spec references PRD.md/DESIGN-SYSTEM.md/other skills for anything already documented there — it shouldn't restate the design system or content schema, just point at them.
- **Acceptance criteria are checkable**, not vibes — "renders on X route," "build passes," not "looks good."
- **Dependencies are explicit** — if a spec can't start until another one lands (e.g. photography content needs the Sanity project to exist first), say so, so specs don't get picked up out of order by accident.

## Relationship to other conventions

- Branch naming here (`spec/NNNN-slug`) supersedes [git-workflow](../git-workflow/SKILL.md)'s more general `<type>/<short-description>` pattern for anything that has a spec. Git-workflow's commit-message and squash-merge conventions still apply unchanged on top of this.
- [specs/0001-nextjs-scaffold.md](../../../specs/0001-nextjs-scaffold.md) is the retroactive record of everything built before this workflow existed, and is the reference example for "done" spec status.
