# React Learn Lab

A free, beginner-friendly React course. Simple explanations, plain language, and code
examples you can edit and run right in the browser — no setup required to start learning.

Live site: https://santhanukumarsuresh.github.io/react-learn-lab/

## What's inside

- A guided curriculum: JavaScript warm-up → Meet React → JSX → Components → Events →
  State → Hooks → React Router → a mini project
- Interactive, editable code sandboxes on every lesson (powered by `react-live`)
- Progress tracking saved locally in your browser, with a per-part Recharts dashboard
- A responsive sidebar navigation inspired by modern learning platforms
- A procedural 3D "React atom" hero (Three.js + React Three Fiber, lazy-loaded)
- A token-driven theme system: light/dark with a circular-reveal switch
  (View Transitions API) and a clickable accent picker, persisted to LocalStorage
- Motion everywhere — page transitions, staggered entrances, animated sidebar and
  quiz feedback — with full `prefers-reduced-motion` support

## Tech stack

- [React](https://react.dev) 19 + [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com) v4 with token-driven CSS-variable theming
- [React Router](https://reactrouter.com)
- [Motion](https://motion.dev) (Framer Motion) for animations
- [Zustand](https://zustand.docs.pmnd.rs) for theme / tier / progress state
- [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) + drei for the 3D hero
- [Recharts](https://recharts.org) for the progress dashboard
- [Radix UI](https://www.radix-ui.com) tabs + shadcn/ui-style `cn`/`cva` utilities
- [Lenis](https://lenis.darkroom.engineering) smooth scrolling
- [Montserrat](https://fontsource.org/fonts/montserrat) self-hosted via @fontsource
- [react-live](https://github.com/FormidableLabs/react-live) for in-browser code sandboxes
- Deployed to [GitHub Pages](https://pages.github.com) via GitHub Actions

## Getting started

Requires [Node.js](https://nodejs.org) 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open the printed local URL to view the site. Changes hot-reload instantly.

## Building for production

```bash
pnpm build     # outputs to dist/, also generates dist/sitemap.xml
pnpm preview   # preview the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages automatically. To enable this on a fresh fork:

1. Go to the repo's **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Push to `main` — the site deploys automatically

## Project structure

```
src/
  data/curriculum.js   # the course outline (parts + lessons)
  store/               # Zustand stores (theme, tier, progress — localStorage-backed)
  lib/                 # cn(), motion presets, theme transition, Lenis, page titles
  components/          # Sidebar, Topbar, CodeSandbox, Hero3D, layout, etc.
  lessons/              # lesson content, one file per written lesson
  pages/                # route-level pages (Home, Lesson, NotFound)
```

Lessons not yet written show a friendly "coming soon" placeholder automatically — just
add a slug to `src/lessons/registry.js` and create the matching file to fill one in.

## Content sources

Lesson explanations are written from scratch, inspired in structure (not content) by
common developer-training layouts, and fact-checked against the official
[react.dev](https://react.dev) docs and [MDN Web Docs](https://developer.mozilla.org).
