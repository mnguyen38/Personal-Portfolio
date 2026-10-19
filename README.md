# Minh Nguyen — Portfolio

Personal site at [minhsonnguyen.dev](https://www.minhsonnguyen.dev). A single, statically rendered page built with Next.js 16, TypeScript and Tailwind CSS v4.

## Features

- **Command menu**: press `⌘K` / `Ctrl+K` (or click Search) to jump to sections, projects and write-ups, switch theme, copy the email address or open links.
- **Project write-ups**: long-form write-ups open in a side reader without leaving the page, with shareable links like `/#work/options-backtester`.
- **Skill filter**: pick a skill to highlight the projects and roles that use it.
- **Live trading stats**: the Sharpe ratio and return of an automated paper-trading strategy, refreshed daily from `src/data/sharpe.json` and `src/data/returns.json`.
- **Motion**: scroll reveals in both directions, a clickable period after the name that opens a constellation of quick links, and a soft crossfade between light and dark themes. All of it respects reduced-motion settings.
- Accessible by keyboard and works on mobile.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Editing content

All content lives in `src/data/`:

| File | Contents |
| --- | --- |
| `site.ts` | Name, contact links, intro, "Currently" strip and How I work principles |
| `projects.ts` | Selected work, shown in list order. The first link is the primary button. |
| `experience.ts` | Roles and the short story shown for each |
| `education.ts` | Degrees |
| `skills.ts` | Skill filter chips |
| `sharpe.json`, `returns.json` | Written daily by the trading app's GitHub Action; a missing or invalid file hides its stat |

Projects and roles are tagged with skills from `filterSkills`, which is what the skill filter matches on.

### Write-ups

Each project's write-up is an MDX file in `src/content/projects/<id>.mdx`. In `projects.ts`, a project's `writeup` is either:

- `"draft"`: visible only in `npm run dev`, marked Draft in the reader, never in production.
- `"published"`: visible everywhere.

Put images in `public/writeups/` and use `<Figure src="/writeups/…" alt="…" caption="…" />`.

To update the résumé, replace `public/minh-nguyen-resume.pdf`.
