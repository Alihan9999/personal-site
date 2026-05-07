# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally

There is no test runner, linter, or typecheck configured. The project is plain JSX (not TypeScript).

## Architecture

Single-page React portfolio site styled as an "Operator Console" — a kubectl/SRE-inspired control plane. Vite is the build tool, Tailwind v4 is the styling layer, Framer Motion handles animation, React Router v7 (`BrowserRouter`) handles client-side routing.

### Routing

| Path | Component | Notes |
|---|---|---|
| `/` | `pages/Home.jsx` | Operator Console hero + bento body |
| `/projects` | `pages/ProjectsIndex.jsx` | Filterable full project list |
| `/posts` | `pages/PostsIndex.jsx` | Filterable full post list |
| `/posts/:slug` | `pages/PostView.jsx` | Loader-resolved post route |
| `*` | `pages/NotFound.jsx` | Catch-all |

`src/router.jsx` defines the routes and a `RootLayout` that holds the page-wide chrome: theme provider (`useTheme`), `Navbar`, `CommandPalette`, `MagneticCursor`, page-background gradient, and `<AnimatePresence mode="wait">` keyed by pathname for route transitions.

`vercel.json` rewrites `/(.*)` → `/index.html` so deep links resolve in production.

`App.jsx` is a thin shell: `<LazyMotion features={domAnimation}>` around `<RouterProvider>`. Stay on `domAnimation`; switch to `domMax` only if you add drag.

### Content

All site content lives in `src/data/` (barrel re-export via `src/data/index.js`):

- `projects.js` — projects with `slug`, `meta.{uptime,replicas,lastDeploy}`, plus `FEATURED_SLUGS` and `featuredProjects`
- `posts.js` — posts with `slug`, plus `findPostBySlug(slug)` helper used by the route loader
- `skills.js`, `capabilities.js`, `contact.js`
- `now.js` — `currentFocus`, `lastDeploy`, `sinceDates`, `personaStatusRow` (drives the hero status board)

Add a project/post by editing the relevant data file. Filter chips work by string-matching `tags`; new filters need entries in both `*Filters` arrays and the items' `tags`.

### Section composition (Home)

Order in `pages/Home.jsx`: `OperatorConsole` → `NowRunning` → `ProjectsBento` → `TechMarquee` → `StackBento` → `WritingStrip` → `AboutBlock` → `ContactBlock`. Section IDs (`#now`, `#projects`, `#stack`, `#writing`, `#about`, `#contact`) are the navigation contract — `Navbar` and `CommandPalette` link to them. `#blog` is preserved as a sibling alias of `#writing` for backward compat.

The visual cohesion motif: every section header reads like `kubectl get <resource>` (rendered via `SectionHeader` with NAME / STATUS / AGE), and bento tiles carry a recurring `MetadataFooter` (`uptime: 412d`, `replicas: 3/3`, `last-deploy: …`).

### Primitives

`src/components/primitives/` (re-exported from `index.js`):

- `Card` — bento tile with variants (`featured`, `wide`, `tall`, `compact`, `square`, `half`, `full`); pass `interactive` for hover lift
- `Chip` — variants `tech`, `tag`, `skill`, `ghost`
- `FilterBar` — chip row with `aria-pressed`
- `Modal` — focus-trap overlay with `layoutId` shared-element transition support
- `SectionHeader` — kubectl-style resource header
- `StatusDot` — phosphor/amber/muted indicator with reduced-motion-aware pulse
- `TerminalBlock` — terminal chrome with traffic-light dots, monospace surface
- `Typewriter` — phrase cycling, renders final string instantly under reduced-motion
- `MetadataFooter` — recurring monospace tile footer
- `MagneticCursor` — global custom cursor; no-ops on coarse pointer or reduced-motion

### State and modal pattern

App-level state is scoped per page. `RootLayout` owns `paletteOpen` and the global `Cmd/Ctrl+K` / `Escape` keydown handler. `Home`, `ProjectsIndex`, `PostsIndex` own their own filter state. `Modal` traps focus, restores it on close, and handles ESC.

### Theme

Toggling adds/removes the `light` class on `<html>` and writes `localStorage.theme`. To prevent FOUC, an inline script in `index.html` `<head>` runs **before** React mounts: it reads `localStorage.theme` (or `prefers-color-scheme`), sets the class, and writes `documentElement.dataset.theme`. `useTheme()` reads its initial state from that dataset, so the first paint matches React's state. The hook also listens to `prefers-color-scheme` changes, but only follows them when nothing is stored (manual toggle wins).

### Tailwind v4 tokens

Tailwind is consumed via `@import "tailwindcss"` and `@tailwindcss/postcss`. There is no `tailwind.config.js` — configuration is CSS-first via `@theme` in `src/styles.css`.

Custom palette: `phosphor-{300..600}` (live data, status), `amber-{300..600}` (accent, CTAs), `graphite-{700..950}` (warm near-black base), `ivory-50/100`, `ink-700/900` (light theme). `--color-cyan-*` is overridden to amber values so any leftover `cyan-*` class strings render in the new palette.

Fonts: Manrope (sans, body) and JetBrains Mono (mono, terminal/data surfaces) loaded via Google Fonts. Use `font-mono` for any terminal/data UI; `font-sans` (default) for body.

The `light:` variant is enabled in `src/styles.css` via `@custom-variant light (&:where(.light, .light *));` — supply both default (dark) and `light:` overrides on styled elements.

### Animation

| Pattern | Where | Notes |
|---|---|---|
| Section reveal | bento sections | `motion.section` + `whileInView` |
| Project → modal shared element | `ProjectCard` ↔ `Modal` | `layoutId={project.slug}` |
| Hero typewriter | `Typewriter` | 55ms per char, 4s loop, reduced-motion shows final string |
| Status dot pulse | `StatusDot` | reduced-motion disables |
| Tech marquee scroll-velocity coupling | `TechMarquee` | `useVelocity` + `useTransform`, reduced-motion freezes |
| Magnetic cursor | `MagneticCursor` | `useSpring` on x/y; coarse pointer + reduced-motion no-op |
| Page transitions | `RootLayout` | `AnimatePresence mode="wait"` keyed by pathname |
| Bento card hover lift | `Card` (interactive) | reduced-motion disables |

### Accessibility & perf

- `useReducedMotion()` and `usePointerCapability()` live in `src/hooks/` and gate every motion effect.
- `Modal` traps Tab/Shift+Tab and restores focus to the triggering element on close.
- Filter chips have `aria-pressed`; theme button has `aria-label`; decorative SVGs/dots have `aria-hidden`.
- Portrait images use `loading="lazy"`.
- **Follow-up**: `public/websitepic.png`, `websitepicLight.png`, and `social-preview.png` are 1.5–2 MB each. Convert to AVIF/WebP for substantial Lighthouse wins (no CLI tools were installed in this environment).

### Assets and deploy

Static assets live in `public/` and are referenced by absolute path. The site deploys to Vercel with the default Vite preset (`npm run build` → `dist/`); `vercel.json` provides the SPA rewrite. DNS is on Cloudflare.
