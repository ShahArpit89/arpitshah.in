---
name: git-workflow
description: How this project (arpitshah.in) writes git commits, branch names, and pull request descriptions, so the history stays clean and readable as a single-owner project grows. Use this skill whenever you are about to run `git commit`, name a branch, or open/describe a pull request in this repo — including small changes, not just big features. Also use it if the user asks about commit conventions, PR templates, squash-vs-merge policy, or "how should I commit this."
---

# Git Workflow — arpitshah.in

This repo is a solo-owned personal site (Next.js portfolio/blog/photography, see [PRD.md](../../../docs/PRD.md)) that will deploy straight to Vercel off `main`. Two consequences that shape everything below:

1. **`main` must always be deployable.** Every commit that lands on it should be a working state — Vercel auto-deploys on push (PRD §3), so a broken commit on `main` is a broken live site, not just a broken build.
2. **There's one author, but the history is read by future-you** (and Claude, working from this same repo across many sessions). Clean history isn't for code review overhead — it's so `git log` and `git blame` stay useful as the actual record of _why_ things changed, since PRD.md only captures decisions at a point in time.

## Commit messages

Use **Conventional Commits**: `<type>(<scope>): <subject>`

**Types** (pick one):

| Type       | When                                                           |
| ---------- | -------------------------------------------------------------- |
| `feat`     | New user-visible capability (a new page, a new gallery filter) |
| `fix`      | Bug fix (the nav double-border regression, a broken build)     |
| `docs`     | PRD.md, README, this skill, comments-only changes              |
| `style`    | Formatting/whitespace only, no logic change                    |
| `refactor` | Code restructuring with no behavior change                     |
| `perf`     | Performance improvement                                        |
| `test`     | Adding/fixing tests                                            |
| `build`    | Dependency bumps, Tailwind/Next config, tooling                |
| `ci`       | Deploy config, GitHub Actions                                  |
| `chore`    | Everything else maintenance-y (gitignore, renaming files)      |

**Scope** — the area touched, matching this repo's structure: `home`, `portfolio`, `projects`, `blog`, `photography`, `nav`, `sanity`, `content`, `design`. Omit scope only when the change is truly repo-wide.

**Subject line**

- Imperative mood: "add hero clock", not "added" or "adds"
- No period at the end
- ≤72 characters, ideally ≤50
- Says _what_, not _why_ — the why goes in the body

**Body** (optional, but required for anything non-obvious)

- Wrap at ~72 columns
- Explain _why_, not what — the diff already shows what. Write the body for someone who can't see the diff and needs the reasoning: what constraint forced this, what alternative was rejected, what PRD decision this implements.
- If the commit implements or changes a decision recorded in PRD.md, say so ("per PRD §4") — that's the kind of context `git blame` should surface later.

**Footer**

- `Fixes #N` / `Refs #N` for issue links, if issues are in use
- `BREAKING CHANGE: ...` if it changes an established public contract (rare for this project pre-launch)
- The Claude attribution line, when Claude authors the commit (see project's own attribution convention — don't hand-write this, it's appended automatically)

Full template: [templates/COMMIT_TEMPLATE.txt](templates/COMMIT_TEMPLATE.txt). Deeper rationale and examples: [references/best-practices.md](references/best-practices.md).

## Atomic commits

One logical change per commit. Concretely, for this project:

- Scaffolding steps from PRD §7 are separate commits, not one mega-commit ("scaffold Next.js + Tailwind" ≠ "port design tokens" ≠ "build home page").
- Don't mix a formatting pass with a logic change in the same commit — if you reformat a file you're also fixing, that's two commits (or a `style` commit first, then the `fix`).
- A commit should leave the repo in a state that builds. If a feature genuinely needs multiple commits to be usable, that's fine — but each one should compile/build, not leave `main`-bound work half-wired.

The test: could you revert this single commit cleanly without dragging in an unrelated change? If not, split it.

## Branch naming

For anything with a spec (see [spec-driven-dev](../spec-driven-dev/SKILL.md) — most non-trivial work): `spec/NNNN-slug`, matching the spec file's own name in `docs/specs/`.

For genuinely spec-less work (a one-line fix, a config tweak): `<type>/<short-description>`, matching the commit type vocabulary above — `fix/nav-double-border`, `chore/update-gitignore`. Kebab-case, no ticket-number-only names (a branch called `fix/123` tells a reader nothing six months later).

## Pull requests

Even as a solo project, PRs are worth using for anything larger than a one-line fix — they're the unit Vercel preview-deploys against, and the PR description is where the _why_ for a multi-commit change lives (individual commits stay atomic and narrow; the PR description gives the overview).

- **Title:** same convention as commit subjects (`feat(blog): add MDX post rendering pipeline`).
- **Description:** use [templates/PULL_REQUEST_TEMPLATE.md](templates/PULL_REQUEST_TEMPLATE.md) — Summary, Changes, Testing (screenshots matter here; this is a visually-designed site, see the [design system](../../../docs/DESIGN-SYSTEM.md)), Related PRD section.
- This repo also has `.github/pull_request_template.md`, so GitHub pre-fills this automatically for any PR opened through the GitHub UI or `gh pr create` — keep the two templates in sync if either changes.
- **Size:** one spec, one PR (see [spec-driven-dev](../spec-driven-dev/SKILL.md)). 0001-nextjs-scaffold shipped as a single ~25k-line PR and that was a mistake, not a model to repeat — if a spec's implementation is turning into something that large, split the spec, not just the commits inside one PR.

## Keeping history clean: merge policy

Default to **squash-and-merge** into `main`. Rationale: this is a single-owner repo where feature branches will accumulate exploratory/fixup commits ("wip", "fix typo", "actually fix it") — those are useful _while working_ but noise in permanent history. Squashing means:

- The branch can have as many rough commits as needed during development.
- `main`'s history reads as one clean, atomic, Conventional-Commits entry per feature/fix — exactly the log a future session (human or Claude) wants to read.
- The squashed commit message should itself follow the format above — GitHub's squash UI concatenates all commit messages by default, so **rewrite it** rather than accepting the auto-generated concatenation.

Never rewrite history that's already been pushed and might be relied on elsewhere (force-push policy is unchanged from standard git safety practice) — squash-merge happens once, at merge time, via GitHub's UI or `git merge --squash`, not via rebasing `main` itself.

## Quick checklist before committing

1. Does this commit build/run on its own?
2. Is it one logical change?
3. Type + scope correct, subject imperative and under ~72 chars?
4. Does the body explain _why_ if the _why_ isn't obvious from the diff alone?
5. If it implements a PRD decision, does the message say which one?
