---
status: Planned
branch: spec/0009-dns-cutover
prd_ref: '§7 item 5'
---

# 0009 — DNS cutover

## Goal

Point the registered `arpitshah.in` domain at Vercel so the site is live at its real domain.

## Scope

**In:**

- Follow `.claude/skills/deploy-vercel/references/dns-cutover-steps.md`
- Verify SSL and both apex/`www` behavior

**Out:**

- Anything else — this is purely the domain switch

## Approach

Registrar-account action — requires Arpit's own login, not something to attempt unsupervised (already called out in the deploy-vercel skill).

## Acceptance criteria

- [ ] `https://arpitshah.in` serves the production deployment with a valid certificate
- [ ] `www` redirect behavior decided and working
- [ ] PRD.md's "not yet switched over" note (§7 item 5) updated to reflect it's done

## Dependencies

Requires 0008 (site actually deployed to Vercel first).
