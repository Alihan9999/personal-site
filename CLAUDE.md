# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run optimize:images` — regenerate AVIF + WebP next to every PNG/JPG in `public/` via `scripts/optimize-images.mjs` (sharp). Re-run after adding new source images.

There is no test runner, linter, or typecheck configured. The project is plain JSX (not TypeScript).

`vite.config.js` injects `__BUILD_COMMIT__` (git short-sha) and `__BUILD_TIME__` (ISO) at build time via `define`. Both are consumed by `src/data/live.js`.

## Architecture

Single-page React portfolio site styled as an "Operator Console" — a kubectl/SRE-inspired control plane. Vite is the build tool, Tailwind v4 is the styling layer, Framer Motion handles animation, React Router v7 (`BrowserRouter`) handles client-side routing.

### Routing

| Path | Component | Notes |
|---|---|---|
| `/` | `pages/Home.jsx` | Operator Console hero + bento body |
| `/projects` | `pages/ProjectsIndex.jsx` | Filterable full project list |
| `/projects/:slug` | `pages/ProjectView.jsx` | Loader-resolved case study; tagged with `view-transition-name: project-${slug}` |
| `/posts` | `pages/PostsIndex.jsx` | Filterable full post list |
| `/posts/:slug` | `pages/PostView.jsx` | Loader-resolved post route |
| `*` | `pages/NotFound.jsx` | Catch-all |

`src/router.jsx` defines the routes and a `RootLayout` that holds the page-wide chrome: theme provider (`useTheme`), `Navbar`, `CommandPalette`, `MagneticCursor`, `CodeRain` background canvas, page-background gradient, and `<AnimatePresence mode="wait">` keyed by pathname for route transitions. The `AnimatePresence` wrapper is **skipped for `/projects/:slug` routes** — the View Transitions API owns those transitions instead via `src/lib/navigateWithTransition.js`. `ProjectCard` and `ProjectsBento` tiles call this helper and tag themselves with `viewTransitionName: project-${slug}` so a click morphs the tile into the case study hero on browsers that support it.

`vercel.json` rewrites `/(.*)` → `/index.html` so deep links resolve in production.

`App.jsx` is a thin shell: `<LazyMotion features={domAnimation}>` around `<RouterProvider>`. Stay on `domAnimation`; switch to `domMax` only if you add drag.

### Content

All site content lives in `src/data/` (barrel re-export via `src/data/index.js`):

- `projects.js` — projects with `slug`, `meta.{uptime,replicas,lastDeploy}`, plus `FEATURED_SLUGS`, `featuredProjects`, and `findProjectBySlug(slug)` (used by the `/projects/:slug` loader). Optional case-study fields (`problem`, `architecture[]`, `outcome[]`, `tradeoffs[]`) enrich `ProjectView`; absent fields fall back to `details` + `metrics`.
- `posts.js` — posts with `slug`, plus `findPostBySlug(slug)` helper used by the route loader
- `skills.js`, `capabilities.js`, `contact.js`
- `now.js` — `currentFocus`, `lastDeploy`, `sinceDates`, `personaStatusRow` (drives the hero status board)
- `live.js` — runtime-derived signals: `buildCommit`, `buildTime`, `buildAge()`, `homelabUptime()`, `firstCommitYears()`. Pure functions that consume the Vite `define` injects.

Add a project/post by editing the relevant data file. Filter chips work by string-matching `tags`; new filters need entries in both `*Filters` arrays and the items' `tags`.

### Section composition (Home)

Order in `pages/Home.jsx`: `OperatorConsole` → `NowRunning` → `ProjectsBento` → `TechMarquee` → `StackBento` → `WritingStrip` → `AboutBlock` → `ContactBlock`. Section IDs (`#now`, `#projects`, `#stack`, `#writing`, `#about`, `#contact`) are the navigation contract — `Navbar` and `CommandPalette` link to them. `#blog` is preserved as a sibling alias of `#writing` for backward compat.

The visual cohesion motif: every section header reads like `kubectl get <resource>` (rendered via `SectionHeader` with NAME / STATUS / AGE), and bento tiles carry a recurring `MetadataFooter` (`uptime: 412d`, `replicas: 3/3`, `last-deploy: …`).

### Primitives

`src/components/primitives/` (re-exported from `index.js`):

- `Card` — bento tile with variants (`featured`, `wide`, `tall`, `compact`, `square`, `half`, `full`); pass `interactive` for hover lift; accepts `as` to override the underlying motion element (e.g. `as="div"` when the tile is a clickable role="link")
- `Chip` — variants `tech`, `tag`, `skill`, `ghost`
- `CodeRain` — fixed-canvas ambient phosphor rain; throttled to 18 fps (10 fps on coarse pointer); no-ops on `prefers-reduced-motion`; pauses when tab hidden
- `FilterBar` — chip row with `aria-pressed`
- `Modal` — focus-trap overlay (Tab + Shift+Tab cycle, ESC closes, restores focus); reserved for image lightbox use — currently unimported now that project detail is a route
- `SectionHeader` — kubectl-style resource header
- `StatusDot` — phosphor/amber/muted indicator with reduced-motion-aware pulse
- `TerminalBlock` — terminal chrome with traffic-light dots, monospace surface
- `Typewriter` — phrase cycling, renders final string instantly under reduced-motion
- `MetadataFooter` — recurring monospace tile footer
- `MagneticCursor` — global custom cursor; no-ops on coarse pointer or reduced-motion

Top-level helpers:

- `src/lib/navigateWithTransition.js` — wraps `navigate()` in `document.startViewTransition()` when supported, falls back to plain navigation. Used wherever a project tile clicks through to its case study.
- `src/components/InfraDiagram.jsx` — pure SVG request-path diagram (`user → cloudflare → vercel → react-router → bento`) with animated dashed flow lines. Embedded in `AboutBlock`. Static under reduced-motion.

### State and modal pattern

App-level state is scoped per page. `RootLayout` owns `paletteOpen` and the global `Cmd/Ctrl+K` / `Escape` keydown handler. `Home`, `ProjectsIndex`, `PostsIndex` own their own filter state. `Modal` traps focus, restores it on close, and handles ESC (currently unused — earmarked for image lightbox).

### Command palette (Cmd+K)

`src/components/CommandPalette.jsx` is a real REPL, not a fuzzy jump-list. Commands are defined in `src/commands/registry.js` (`{ name, description, autocomplete?, run({ args, navigate, theme, setTheme, print, clear, close, history }) }`). Built-ins: `help`, `whoami`, `ls`, `cat <slug>`, `kubectl get <projects|posts|stack|endpoints>`, `open <slug>`, `theme <dark|light>`, `goto <section>`, `motion <on|off>`, `history`, `clear`. Tab autocompletes; Up/Down recalls history (persisted in `localStorage` via `src/hooks/useCommandHistory.js`). Unknown input falls back to fuzzy search across projects, posts, and section anchors. Add a command by appending to the registry — no palette code changes needed.

### Live data signals

`src/hooks/useGitHubProfile.js` fetches `https://api.github.com/users/Alihan9999` once per session, caches in `sessionStorage` for 1h (key `gh:profile`), and falls back to baked numbers when offline or rate-limited (no spinner, no error UI). `StatusBoard` renders fallback values dim and live values phosphor. `NowRunning` consumes `buildAge()` and `homelabUptime()` from `data/live.js` so the "last deploy" tile always reflects the actual deploy.

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
| Page transitions (most routes) | `RootLayout` | `AnimatePresence mode="wait"` keyed by pathname |
| Project tile → case study morph | `ProjectsBento`/`ProjectCard` ↔ `ProjectView` | `viewTransitionName` + `navigateWithTransition()`; `RootLayout` skips its `AnimatePresence` for `/projects/:slug` so the View Transition owns the route change |
| Bento card hover lift | `Card` (interactive) | reduced-motion disables |
| Navbar scroll progress + active section | `Navbar` | `useScroll` + `useSpring` for the bar; `useActiveSection` (IntersectionObserver) for the underline. `motion.span layoutId="nav-underline"` slides between active links. |
| Code-rain background | `CodeRain` | canvas `requestAnimationFrame` throttled to 18 fps; `document.visibilityState` pauses when tab hidden; reduced-motion no-op |
| Infra diagram flow lines | `InfraDiagram` | SVG `<animate>` on `stroke-dashoffset`; reduced-motion strips the `<animate>` |

### Accessibility & perf

- `useReducedMotion()` and `usePointerCapability()` live in `src/hooks/` and gate every motion effect.
- `Modal` traps Tab/Shift+Tab and restores focus to the triggering element on close.
- Filter chips have `aria-pressed`; theme button has `aria-label`; decorative SVGs/dots have `aria-hidden`.
- Portrait images use `loading="lazy"` and ship as `<picture>` with AVIF + WebP `<source>` fallbacks (PNG remains as the universal fallback). The 1.5–2 MB PNGs collapse to ~50 KB AVIF; rerun `npm run optimize:images` after replacing source files.

### Assets and deploy

Static assets live in `public/` and are referenced by absolute path. The site deploys to Vercel with the default Vite preset (`npm run build` → `dist/`); `vercel.json` provides the SPA rewrite. DNS is on Cloudflare.
