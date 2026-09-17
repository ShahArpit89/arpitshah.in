---
status: Planned
branch: spec/0004-blog-real-post
prd_ref: '§2, §3'
---

# 0004 — Replace placeholder blog post with real content

## Goal

Publish at least one real blog post, and remove or replace `content/blog/hello-world.mdx` (seeded in 0001 purely to exercise the MDX pipeline).

## Scope

**In:**

- One real post (engineering or photography topic, Arpit's choice)
- Delete `hello-world.mdx` once the real post exists

**Out:**

- Comments/newsletter (explicit PRD §8 non-decision, don't add)
- Changing the frontmatter schema — `.claude/skills/content-authoring` already defines it

## Approach

Content-only task, following `.claude/skills/content-authoring/SKILL.md` and its `templates/BLOG_POST_TEMPLATE.mdx`. No code changes expected unless the real post reveals an MDX rendering gap (e.g. a content type the current `[&_h2]`/`[&_p]` styling in `app/blog/[slug]/page.tsx` doesn't handle well).

## Acceptance criteria

- [ ] Real post published, `hello-world.mdx` removed
- [ ] Renders correctly on `/blog` and `/blog/[slug]`
- [ ] `npm run build` clean

## Dependencies

None.
