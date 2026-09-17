---
status: Planned
branch: spec/0002-portfolio-page
prd_ref: '§2'
---

# 0002 — Portfolio page

## Goal

Replace the `/portfolio` stub with real content: role, experience, skills, case studies (PRD.md §2).

## Scope

**In:**

- Real copy for role/experience/skills sections
- At least one case study (structure + one real example)
- Layout consistent with design/DESIGN-SYSTEM.md (reuse existing components/patterns where they fit)

**Out:**

- New shared components beyond what this page needs (add only if genuinely reusable elsewhere)
- Downloadable resume/PDF export (not in PRD, don't add unless asked)

## Approach

Needs real input from Arpit first: role history, skills list, case study content. This spec can't be implemented blind — the first step is gathering that content, not writing layout code.

## Acceptance criteria

- [ ] Real content in place (no more "coming soon" placeholder)
- [ ] Follows design-system-ui skill checklist (tokens, theming, no new bug classes)
- [ ] `npm run build`/`lint`/`typecheck` clean
- [ ] Checked in light/dark/mobile

## Dependencies

None — can start independently, but blocked on Arpit supplying the actual content.
