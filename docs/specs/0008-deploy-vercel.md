---
status: Planned
branch: spec/0008-deploy-vercel
prd_ref: '§5, §7 item 5'
github_issue: 18
---

# 0008 — First Vercel deploy

## Goal

Get the site actually deployed and reachable at a Vercel URL (before the custom domain — that's 0009).

## Scope

**In:**

- Connect the GitHub repo to a Vercel project
- Set env vars per `.claude/skills/deploy-vercel/SKILL.md` (Sanity vars, if 0005 is done by this point — otherwise deploy works fine without them per the defensive fallback)
- Confirm production deploy succeeds off `main`, and that PR previews work

**Out:**

- DNS/custom domain — 0009
- Any CI beyond Vercel's own build

## Approach

Mostly a Vercel dashboard task (Arpit's account). Verify against `.claude/skills/deploy-vercel/SKILL.md`'s existing guidance rather than re-deriving deploy steps here.

## Acceptance criteria

- [ ] Production deployment live at the `*.vercel.app` URL
- [ ] A test PR shows a working preview deployment
- [ ] Env vars set correctly per environment (Production/Preview)

## Dependencies

None strictly, but more useful once at least 0002-0004 have some real content to show.
