# Git Best Practices — Rationale & Examples

Background reading for the conventions in [../SKILL.md](../SKILL.md). Load this when you want the _why_ behind a rule, or examples to pattern-match against.

## Where these conventions come from

- **Conventional Commits** (conventionalcommits.org) — the `type(scope): subject` format. Widely adopted because it makes history machine-parseable (changelogs, semantic-version bumps) _and_ human-scannable (`git log --oneline` reads like a changelog for free).
- **Chris Beams' "Seven Rules of a Great Commit Message"** — the classic, still-cited style guide: separate subject from body with a blank line, capitalize subject, no period, imperative mood, wrap body at 72 chars, use the body to explain _what and why_ vs. _how_.
- **Linux kernel / git project style** — the source of "one logical change per commit" and "the commit message body explains why, the diff explains what."

None of this is arpitshah.in-specific invention — it's the common denominator across the projects that are actually pleasant to `git log` through.

## Why imperative mood

"add hero clock" not "added hero clock" or "adds hero clock". Test: the subject should complete the sentence "If applied, this commit will ___". Git itself uses this convention for auto-generated messages ("Merge branch...", "Revert..."), so imperative keeps hand-written commits consistent with git's own.

## Why the body explains _why_, not _what_

The diff is a perfect, complete record of _what_ changed — re-describing it in prose is redundant and rots the moment someone refactors nearby code. What the diff _can't_ show: why this approach and not the obvious alternative, what constraint or bug report drove it, what tradeoff was accepted. That's the information that's expensive to reconstruct later and cheap to write down now.

Example:

```
fix(nav): scope header divider to .masthead .nav

.masthead nav (descendant selector on the bare tag) was also matching
a nested <nav> used inside the mobile menu, doubling the hairline
border. Scoping to the .nav class instead makes the rule specific to
the header's own nav element. See design/DESIGN-SYSTEM.md watch-item 1.
```

Not:

```
fix(nav): update CSS selector

Changed .masthead nav to .masthead .nav in the stylesheet.
```

The second version just narrates the diff — anyone reading it still has to go dig up why it mattered.

## Why atomic commits

Two failure modes atomic commits prevent:

1. **Unrevertable commits.** If a commit bundles a bug fix with an unrelated formatting pass, reverting the fix later also reverts (or conflicts with) the formatting. Splitting them means either can be reverted cleanly.
2. **Useless `git blame`.** If "add photography gallery" and "fix typo in portfolio copy" are one commit, `git blame` on the portfolio line points at a commit message that has nothing to do with what actually changed there.

Rule of thumb used in [../SKILL.md](../SKILL.md): if you can't write one clean, specific subject line for a commit without using "and," it's probably two commits.

## Why squash-and-merge for this repo specifically

Squash-merge is a judgment call, not a universal law — some projects (especially multi-contributor ones needing individual attribution per commit) prefer merge commits or rebase-and-merge instead. It's the right call _here_ because:

- Single owner, so there's no need to preserve individual contributors' commit boundaries.
- Feature branches will naturally accumulate "wip", "try again", "actually fix build" commits during normal iterative work (including Claude's own iteration inside a branch) — those are valuable as a working log but not as permanent history.
- `main` deploys straight to production (Vercel, PRD §3) — a clean, one-commit-per-feature `main` makes `git bisect` and rollback trivial: reverting a feature is reverting exactly one commit.

If this project ever gains other contributors who want per-commit attribution preserved, revisit this — rebase-and-merge would be the next thing to consider, not merge commits (which reintroduce the exact noise squash avoids).

## Examples: full commit messages for this project

```
feat(photography): add EXIF caption fields to PhotoGrid tile

Sanity schema already stores camera/lens/focalLength/aperture/
shutterSpeed/iso (PRD §3). Tile component was only rendering the
image — wiring the caption row now so real photos display metadata
without another pass later.
```

```
docs(design): document button hover-state gap

Mockup (design/homepage-mockup.html) never defined a CTA hover state.
Documented as an open gap in DESIGN-SYSTEM.md rather than inventing
one silently, so it gets a real decision before the shared <Button>
component ships.
```

```
chore(content): add projects.json scaffold

Empty array + schema comment, per PRD §3 Projects storage spec.
Unblocks building ProjectCard before real project data exists.
```
