# Minh Nguyen — Portfolio

Personal site at [minhsonnguyen.dev](https://minhsonnguyen.dev). A single, statically rendered page built with Next.js 16, TypeScript and Tailwind CSS v4.

## Features

- **Command menu**: press `⌘K` / `Ctrl+K` (or click Search) to jump to sections and projects, switch theme, copy the email address or open links.
- **Skill filter**: pick a skill to highlight the projects and roles that use it.
- **Project explorer**: select a project to show its details, metrics and links.
- **Light and dark themes** that follow the system setting, plus a manual toggle.
- Accessible by keyboard, respects reduced-motion settings, and works on mobile.

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
| `site.ts` | Name, contact links, intro, status and hero metrics |
| `projects.ts` | Selected work, shown in list order. The first link is the primary button. |
| `experience.ts` | Roles and bullets |
| `education.ts` | Degrees |
| `skills.ts` | Filter chips and the Toolkit section |

Projects and roles are tagged with skills from `filterSkills`, which is what the skill filter matches on.

To update the résumé, replace `public/minh-nguyen-resume.pdf`.
