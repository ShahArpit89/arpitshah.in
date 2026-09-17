---
status: Planned
branch: spec/0003-projects-content
prd_ref: '§2, §3'
---

# 0003 — Real project entries

## Goal

Populate `content/projects.json` with real projects (MacFileDedup at minimum, per the home page hero copy that already references it) instead of the empty `[]` seeded in 0001.

## Scope

**In:**

- Real entries matching the shape in `.claude/skills/content-authoring/templates/PROJECT_ENTRY_TEMPLATE.json` (title, description, stack[], repoUrl, liveUrl, cover, status)
- MacFileDedup's real repoUrl/liveUrl/stack/status (0001 deliberately didn't guess these)

**Out:**

- Changes to `ProjectCard.tsx` layout unless the real data reveals a gap (e.g. very long descriptions)

## Approach

Needs real values from Arpit: repo URL, live URL (if any), tech stack, status, and description for each project. Pure content addition — `app/projects/page.tsx` and `ProjectCard.tsx` already handle a populated array.

## Acceptance criteria

- [ ] `content/projects.json` has at least the MacFileDedup entry with real (not guessed) values
- [ ] `/projects` no longer shows the empty-state message
- [ ] `npm run build`/`lint`/`typecheck` clean

## Dependencies

None — blocked only on Arpit supplying real project details.
