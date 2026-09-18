---
status: Planned
branch: spec/0006-studio-route
prd_ref: '§3, §6, §8'
github_issue: 16
---

# 0006 — Resolve Studio embed vs. subdomain, build `/studio`

## Goal

Resolve the explicit PRD.md §8 non-decision (embedded `/studio` route vs. a `studio.arpitshah.in` subdomain) and build whichever is chosen.

## Scope

**In:**

- A decision (with Arpit) between embedded and subdomain
- If embedded: `app/studio/[[...tool]]/page.tsx` + `sanity.config.ts`, login-gated to Arpit's account (PRD §3)
- If subdomain: separate Studio deployment + DNS entry, out of this repo's `app/` tree

**Out:**

- Anything else Sanity-related — schema/client wiring is 0005, this is purely the authoring UI's location

## Approach

Don't default silently — this is called out in `.claude/skills/sanity-cms/SKILL.md` as a decision to make explicitly, not infer. Ask before implementing either path.

## Acceptance criteria

- [ ] Decision recorded (update PRD.md §8 to reflect it's no longer open)
- [ ] Studio reachable and login-gated to Arpit's account only
- [ ] `.claude/skills/sanity-cms/SKILL.md`'s "Studio route" section updated to match reality instead of "not yet scaffolded"

## Dependencies

Requires 0005 (real Sanity project) to exist first.
