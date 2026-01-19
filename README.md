# Minh's Portfolio

My portfolio website built with Next.js 16, TypeScript, and Tailwind CSS v4.

## Live Demo

TODO

## Features

- **Dynamic GitHub Integration** - Automatically fetches and displays repos from GitHub
- **Real-time Weather** - Live weather display for Boston with animated effects (rain/snow)
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-first layout
- **Smooth Animations** - Framer Motion powered transitions
- **ISR Caching** - Auto-refreshes GitHub data every hour

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Configuration

### GitHub Integration

Edit `src/data/github-config.ts` to configure:

```typescript
export const GITHUB_USERNAME = "mnguyen38";

// Mark repos as featured
export const featuredRepos: string[] = [
  "your-repo-name",
];

// Hide specific repos
export const excludedRepos: string[] = [
  "repo-to-hide",
];
```

### Personal Info

- **Home page**: `src/app/home-client.tsx`
- **About page**: `src/app/about/page.tsx`
- **Experience**: `src/data/experience.ts`

## License

MIT
