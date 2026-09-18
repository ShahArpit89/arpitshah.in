---
status: Planned
branch: spec/0007-photography-real-content
prd_ref: '§2, §3, §7 item 4'
github_issue: 17
---

# 0007 — Real photos through Sanity

## Goal

Replace the placeholder photo grid with real photos, uploaded through Sanity Studio, on both the home teaser and the full `/photography` gallery.

## Scope

**In:**

- Arpit uploads a first batch of real photos via Studio (per `.claude/skills/content-authoring/SKILL.md`'s photography workflow)
- Confirm `PhotoGrid`/`PhotoTile` render real images correctly (aspect ratio, hover-zoom on `<img>` not just the placeholder `<svg>` path, EXIF captions if the design calls for showing them inline)
- Decide whether to surface EXIF fields (camera/lens/aperture/etc.) in the UI now or leave them Sanity-only for now — not decided anywhere yet

**Out:**

- `/photography/[id]` detail pages — explicit PRD §8 non-decision, don't build speculatively

## Approach

Mostly a verification pass once real content exists — the components were already built against the real `Photo` shape in 0001. Watch for anything that only shows up with real aspect ratios/orientations (portrait vs landscape photos) that placeholder squares didn't exercise.

## Acceptance criteria

- [ ] At least one real photo marked `featured` shows on the home page teaser
- [ ] Full gallery on `/photography` shows real photos, grid layout holds up with mixed orientations
- [ ] Hover-zoom confirmed working on real `<img>` elements, not just placeholder `<svg>`

## Dependencies

Requires 0005 (real Sanity project + schema).
