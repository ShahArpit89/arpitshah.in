# Pre-PR Component Checklist

Condensed from design/DESIGN-SYSTEM.md's Do's/Don'ts tables — run through this before opening a PR that touches UI.

- [ ] No hardcoded hex colors — token utilities only (`bg-paper`, `text-flare`, etc.)
- [ ] No `dark:` variant used on a token color
- [ ] Checked in light theme, dark theme, and OS-driven (no explicit `data-theme`)
- [ ] Checked at mobile width (~375px)
- [ ] Nav/CTA elements are real `<Link>`/`<a>`, not `<div onClick>`
- [ ] New looping animation guarded under `prefers-reduced-motion: reduce`
- [ ] No new scoped CSS class introduced for something a Tailwind utility already covers (this is exactly the class of bug that caused the nav double-border regression)
- [ ] Reused an existing component/pattern instead of duplicating one that already exists in `components/`
- [ ] Screenshots attached to the PR (per `.github/pull_request_template.md`) for anything visual
