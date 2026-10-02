# CLAUDE.md

Personal site of Adam Kelbl — static HTML/CSS on GitHub Pages. No build step, no JavaScript, no framework.

## Run & deploy

- Local: `python3 -m http.server 8080` → `http://localhost:8080` (also in `.claude/launch.json`)
- Deploy: push to `main` → GitHub Pages publishes automatically

## Files

| File | What |
|---|---|
| `index.html` | About: bio paragraphs + contact links (email, LinkedIn, GitHub) |
| `portfolio.html` | Projects on a timeline, newest first |
| `cv.html` | Experience + Education on the same timeline (content from the user's LinkedIn) |
| `finalproject.html` | Bachelor's thesis viewer — self-contained (base64 assets, Jupyter exports in `srcdoc`), own dark CSS. Don't edit notebook content; its back link targets `portfolio.html`, so keep that filename |
| `styles.css` | Shared by the three main pages |
| `favicon.svg` | White "AK" text, no background |
| `media/` | `pfp.jpg` and `finalproject.png` (only used as `og:image`), `icons/` (contact icons) |

## Editing rules

- The user edits content by hand: keep HTML flat, one `<!-- ===== name ===== -->` comment per block, and keep the commented copy-paste templates above the lists in `portfolio.html` / `cv.html` in sync with the markup
- Header + nav (`about` / `portfolio` / `cv`) is duplicated in all three pages — change it in each; active link = `aria-current="page"`
- Timeline entry: `li.project` → `p.project-date` → `div.project-body` with `.project-title`, optional `.project-meta` (CV), `.project-desc` (one `<p>` per paragraph), `ul.cv-points` (CV bullets), `ul.project-tags`, `.project-links`
- Link texts have no arrows; no images in the portfolio
- For visual/layout changes, show previews of variants first (scratchpad page on another port) and wait for the user's pick

## Design

- Minimal and monochrome: white background, black/grey only, single 600px column, 15px base, justified paragraphs (left-aligned ≤480px, the only breakpoint)
- Tokens in `:root` — use them, don't hardcode colours. `--accent` is `#111111` (links, timeline rings, focus ring)
- Fonts: IBM Plex Sans; IBM Plex Mono for `.tag`, `.project-date`, `.section-label` (Google Fonts `<link>` in each `<head>`)
- Timeline: `.project::before` = ring, `.project::after` = axis segment to the next ring (hidden on the last item), so the line never sticks out
- Only motion: `pageFadeIn` on `main` (off under `prefers-reduced-motion`)
- Rejected by the user — don't reintroduce: dark mode, blue accent, large hero name, contact table, project images/thumbnails, photo on the about page (removed for now), role line under the name

## Testing note

Headless Chrome can't go below a 500px viewport — check phone layouts by rendering the page in a 390px-wide iframe.
