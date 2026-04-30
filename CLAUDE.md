# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

Serve the site locally with Python's built-in HTTP server (configured in `.claude/launch.json`):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`. No build step required — all files are served as-is.

## Deployment

Static site hosted on GitHub Pages. Pushing to `main` deploys automatically. No CI/CD pipeline.

## Architecture

**Main site** (`index.html`, `portfolio.html`, `contact.html`):
- Plain HTML/CSS/JS — no framework, no bundler, no preprocessor
- All pages share a single `styles.css` and `script.js`
- Navigation/header markup is duplicated across all three pages (no templating)
- Content is in English

**Final project** (`finalproject.html`):
- Fully self-contained single HTML file — base64-encoded fonts and images embedded directly
- Tabbed document viewer with sections loaded via `srcdoc` (Jupyter notebook HTML exports embedded as JS strings)
- Has its own embedded CSS design system (IBM Plex fonts, dark professional color scheme) — separate from the main site's `styles.css`
- Do not modify the Jupyter notebook content inside the `srcdoc` strings

**Assets** (`/media/`):
- Portfolio card images: `finalproject.png`, `datathon.png`, `porsche.jpg`, `warehouse.png`
- Profile photo: `pfp.jpg`
- SVG icons: `media/icons/` (email, linkedin, github)

## CSS/JS Conventions

- **CSS custom properties** defined in `:root` — use these, don't hardcode values. Primary color: `#2980b9` (blue), dark bg: `#343a40`
- **Fonts:** IBM Plex Sans (body), IBM Plex Mono (`.tag` elements) — loaded from Google Fonts
- **Flexbox** is the primary layout method
- **Breakpoints:** 992px, 767px, 576px, 480px, 375px
- **No animations/IntersectionObserver** — removed as dead code. Page uses only a simple `pageFadeIn` CSS keyframe on `main`
- **Vanilla JS only** — no libraries
- `script.js` has three functions: `setActiveNavLink`, `setupMobileMenu`, `setupCarousel`
