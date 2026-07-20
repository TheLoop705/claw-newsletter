# Repository Guidelines

## Project Overview

This repository is a static GitHub Pages site for the "Atoms Over Bits" investment newsletter.

The production site is published from static HTML, CSS, JavaScript, Markdown, and JSON files. There is no package manager, build step, or server-side runtime in the current repo.

## Important Paths

- `index.html` - newsletter homepage.
- `daily.html` - daily digest landing/reader page.
- `archive.html` - issue archive with client-side search/filtering.
- `themes.html` - theme browser.
- `about.html` - publication/about page.
- `css/style.css` - shared newsletter styling.
- `js/main.js` - shared interactions such as theme toggle, search, mobile nav, and progress.
- `js/archive.js` - archive-specific behavior where used.
- `issues/` - generated/static issue pages plus `index.json`, `stats.json`, `themes.json`, and `search-index.json`.
- `daily-digest-YYYY-MM-DD.md` - daily digest Markdown source files loaded by the frontend.

## Development Workflow

Because this is a plain static site, use simple local inspection rather than a build command:

- Open HTML files directly in a browser for quick visual checks.
- If browser security blocks local `fetch()` calls for JSON or Markdown, run a tiny local server from the repo root, for example `python -m http.server 8000`, and visit `http://localhost:8000/`.
- Validate JSON data after edits with a JSON parser or editor before relying on frontend code.
- Use `rg` to find duplicate facts before updating publication dates, links, ratings, or company references.

## Coding Conventions

- Prefer small, scoped HTML/CSS/JS changes that match the surrounding file.
- Do not introduce a build system or dependency unless the task clearly requires it.
- Preserve GitHub Pages compatibility: static files only, relative links, and no server-specific assumptions.
- Shared newsletter pages should use `css/style.css` variables and existing component classes where possible.
- Keep accessibility basics in mind: meaningful link text, visible focus states, readable contrast, and mobile layout checks.

## Verification Checklist

For newsletter pages:

- Check desktop and mobile layout.
- Confirm navigation links resolve from the current page location.
- Confirm search/filter UI still loads `issues/*.json` successfully.
- Check the browser console for JavaScript errors.

## Git Notes

The worktree may contain user changes. Do not reset, checkout, or delete existing changes unless explicitly asked. As of this init, `.claude/` is untracked and should be treated as user/local configuration.
