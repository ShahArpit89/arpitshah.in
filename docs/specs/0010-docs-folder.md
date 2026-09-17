---
status: Done
branch: spec/0010-docs-folder
prd_ref: none
---

# 0010 — Move PRD.md, DESIGN-SYSTEM.md, and specs/ into docs/

## Goal

Consolidate the long-form reference documents and the spec index (`PRD.md`, `design/DESIGN-SYSTEM.md`, `specs/`) into a single `docs/` folder, and fix every reference to them across the repo.

## Scope

**In:**

- `PRD.md` → `docs/PRD.md`
- `design/DESIGN-SYSTEM.md` → `docs/DESIGN-SYSTEM.md`
- `specs/` → `docs/specs/` (added after review feedback on this PR — see PR #4 comment)
- Update every relative link/mention across `.claude/skills/`, `CLAUDE.md`, `README.md`, `.github/pull_request_template.md`, `docs/specs/`, and code comments in `app/`/`components/`/`lib/`
- Update `design/DESIGN-SYSTEM.md`'s own self-references (link to `homepage-mockup.html` becomes cross-directory once it moves)

**Out:**

- `README.md`, `CLAUDE.md` stay at repo root — GitHub and Claude Code both expect them there (confirmed with Arpit)
- `design/homepage-mockup.html` stays in `design/` — it's a reference asset, not a doc
- `.claude/skills/` stays where it is — not part of this move

## Approach

`git mv` for `PRD.md`, `design/DESIGN-SYSTEM.md`, and the whole `specs/` directory, then fix every relative path. A repo-wide grep for `PRD.md`/`DESIGN-SYSTEM.md`/`specs/` found mentions across ~25 files — most are bare filename references in prose (fine to leave, unambiguous by name) but the rest are actual relative-path links or `design/`-prefixed mentions that break and need updating.

## Acceptance criteria

- [ ] `docs/PRD.md`, `docs/DESIGN-SYSTEM.md`, `docs/specs/` exist, old paths gone
- [ ] Every markdown link to any of them resolves (spot-check by following links, not just grep)
- [ ] `design/DESIGN-SYSTEM.md`'s link to `homepage-mockup.html` still resolves after the move
- [ ] `npm run build`/`lint`/`typecheck`/format all still clean (code comments reference these files by name, not by working path, so this should be unaffected — verify anyway)

## Dependencies

None.
