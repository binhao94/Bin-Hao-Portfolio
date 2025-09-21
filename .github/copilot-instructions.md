# Copilot Instructions for Bin Hao Er Portfolio Website

## Project Overview
- **Static portfolio site** for Bin Hao Er, focused on game design work.
- Built with **vanilla HTML, CSS, and minimal JavaScript** (no frameworks, no build tools).
- Hosted on **Netlify**; see `_redirects` for pretty URL rules.

## Key Structure
- Main pages: `index.html` (gallery), `about.html`, `project1.html`–`project4.html` (project details)
- Shared assets: `assets/css/style.css` (all styles), `assets/js/main.js` (minimal JS for copy-to-clipboard), `assets/img/` (SVGs)
- All navigation and layout is **static**; no dynamic routing or SPA logic.

## Patterns & Conventions
- **Consistent navigation bar** and footer on every page (copy-pasted, not templated)
- **CSS custom properties** (variables) for colors, spacing, and layout in `style.css`
- **Responsive design** via CSS grid and media queries; no JS for layout
- **Image placeholders** (`ph1.svg`–`ph6.svg`) used for project and profile visuals
- **Minimal JavaScript**: Only `main.js` for copy-to-clipboard on the About page (uses `[data-copy]` attribute)
- **No build step**: All files are edited directly; no npm, no bundlers, no preprocessors
- **No tests or CI**: Manual deploy and preview

## Developer Workflows
- **Edit HTML/CSS/JS directly**; changes are reflected immediately
- **To add a new project**:
  1. Duplicate a `projectN.html` file
  2. Update content and image references
  3. Add a new tile in `index.html` gallery
- **To update navigation/footer**: Edit each HTML file individually (no includes/partials)
- **Netlify redirects**: Update `_redirects` for new pretty URLs if needed

## External Integrations
- **Netlify** for hosting and redirects (see `_redirects`)
- No analytics, forms, or third-party scripts

## Examples
- **Copy-to-clipboard**: See `assets/js/main.js` and the About page's email button
- **Gallery tile**: See `index.html` for structure and hover effect
- **CSS variables**: See `:root` in `assets/css/style.css`

## Special Notes
- **No package manager**: Ignore `node_modules/` and related files in `.gitignore`
- **No build/dist folders**: All output is in the root and `assets/`
- **No hidden conventions**: All logic is visible in the HTML/CSS/JS files

---
For major changes, keep the static, minimal, and accessible approach. When in doubt, prefer simplicity and direct editing over adding complexity.
