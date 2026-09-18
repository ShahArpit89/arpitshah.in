---
status: Planned
branch: spec/0005-sanity-project-setup
prd_ref: '§3, §7 item 3'
github_issue: 15
---

# 0005 — Create Sanity project, wire real config

## Goal

Stand up the actual Sanity.io project the photography workflow depends on, and point `lib/sanity.ts` at it for real (it's currently a defensive stub with no live project behind it — see `.claude/skills/sanity-cms/SKILL.md`).

## Scope

**In:**

- Arpit creates a free-tier Sanity.io project
- Define the `photo` schema (fields already specified in PRD.md §3 and `.claude/skills/sanity-cms/SKILL.md`)
- Real `NEXT_PUBLIC_SANITY_PROJECT_ID`/`NEXT_PUBLIC_SANITY_DATASET` values, added to local `.env.local` (never committed) and Vercel env vars (ties into 0008)
- Re-verify `lib/sanity.ts` against the real project (env var names, dataset name)

**Out:**

- `/studio` route — separate spec (0006), since it depends on the embed-vs-subdomain decision
- Uploading real photos — separate spec (0007)

## Approach

This is the one spec in this list that starts with Arpit, not code: creating the Sanity account/project is an external action requiring his own login, not something to do unsupervised. Once the project exists and credentials are shared, wiring `lib/sanity.ts` is small.

## Acceptance criteria

- [ ] Real Sanity project exists
- [ ] `photo` schema defined matching PRD.md §3's field list
- [ ] `lib/sanity.ts` re-verified against real env vars, `sanity-cms` skill's re-verify checklist completed
- [ ] `getPhotos()` returns real (even if empty) results against the live dataset

## Dependencies

None — but this is a prerequisite for 0006 and 0007.
