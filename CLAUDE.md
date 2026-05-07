# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally

There is no test runner, linter, or typecheck configured. The project is plain JSX (not TypeScript).

## Architecture

Single-page React portfolio site. Vite is the build tool, Tailwind v4 is the styling layer, and Framer Motion handles animation.

### Content lives in one file

All site content — projects, blog posts, skills, capabilities, contact links, and the filter chip lists (`projectFilters`, `blogFilters`) — is defined as exported arrays in `src/data.js`. Adding a project or post means editing that file; the components only render what's exported. Filter chips work by string-matching `tags` against the selected filter, so a new filter must be added to both the `*Filters` array and the relevant items' `tags`.

### Single-page layout

`src/App.jsx` is the only page. It composes `Hero`, then `SectionWrapper`-wrapped sections for `#projects`, `#blog`, `#about`, `#contact`. Navigation (`Navbar`, `CommandPalette`, in-page anchor links) all rely on these section IDs — keep them stable.

`SectionWrapper` provides the eyebrow/title/description heading layout and a `whileInView` reveal animation; new sections should use it for visual consistency.

### State and modal pattern

App-level UI state (filters, expanded project, active blog post, theme, palette open, content-ready) is held in `App.jsx` and threaded down. Modals (`ProjectCard` expanded view, `BlogPostView`, `CommandPalette`) are rendered from `App.jsx` and toggled via state. A global keydown handler in `App.jsx` wires `Cmd/Ctrl+K` to open the palette and `Escape` to close any open modal — new modals should hook into this same pattern.

`contentReady` is a 450 ms timer that gates project/blog grids; before it fires, `SkeletonCard` placeholders render. Preserve this if you change list rendering.

### Theming

Dark/light is toggled by adding/removing the `light` class on `<html>` (`App.jsx` effect on `theme`). Tailwind's `light:` variant is enabled in `src/styles.css` via `@custom-variant light (&:where(.light, .light *));` — that's why `light:bg-...` utilities work without dark-mode config. When adding styled elements, supply both default (dark) and `light:` overrides.

### Animation

`App.jsx` wraps the tree in `<LazyMotion features={domAnimation}>`. Use `motion` (lowercase `m` is fine when imported as `m`) and Framer Motion's standard APIs (`AnimatePresence`, `layout`, `whileHover`, `whileInView`) — `domAnimation` features are already loaded.

### Tailwind v4

Tailwind is consumed via `@import "tailwindcss"` in `src/styles.css` and `@tailwindcss/postcss` in `postcss.config.js`. There is no `tailwind.config.js` — configuration is CSS-first. Custom variants and tokens belong in `styles.css`.

### Assets and deploy

Static assets (`profile.png`, `websitepic.png`, `websitepicLight.png`, social previews) live in `public/` and are referenced by absolute path (`/websitepic.png`). The site deploys to Vercel with the default Vite preset (`npm run build` → `dist/`); DNS is on Cloudflare.
