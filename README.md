# Elvin Le — Portfolio

Plain HTML, CSS, and vanilla JavaScript for GitHub Pages. No build step, dependencies, remote fonts, trackers, or backend.

## Files

- `/index.html`: page content, semantic sections, SEO and sharing metadata.
- `/css/style.css`: responsive layouts, light/dark colors, focus and reduced-motion styles.
- `/js/config.js`: single GitHub username constant.
- `/js/projects.js`: single `PROJECTS` array containing all project card content.
- `/js/theme.js`: loads saved theme before the page renders.
- `/js/main.js`: project rendering, profile link, and persistent theme toggle.
- `/assets/`: favicon and future real screenshots.
- `/robots.txt`, `/sitemap.xml`: crawler settings.

## Edit projects

Copy an object in `PROJECTS` in `/js/projects.js`. Set title, subtitle, context, role, problem, detail, and stack. Keep the role specific to your own contribution. Add verified HTTPS URLs to `repoUrl` and optionally `demoUrl`. Leave missing values as `null`; the site never generates fake links. Live demo links only appear when a URL is explicitly set. Flask and Next.js applications do not execute on this static site.

For a real screenshot, add an optimized image in `/assets/` and set `screenshot` to `{ src: "/assets/project.webp", alt: "Describe the actual screen", width: 1600, height: 1000 }` using its actual pixel dimensions. Images are lazy-loaded inside a reserved aspect-ratio container. Until then, cards visibly say “Screenshots coming soon.”

## Remaining placeholders

- Verified repository URLs for all three projects.
- Real screenshots and descriptive alt text for all three projects.
- Optional verified demo URLs (omitted until supplied).
- Original social preview image and `og:image` (TODO in HTML; no fabricated preview).

## GitHub username and site address

Update `GITHUB_USERNAME` only in `/js/config.js` to change the profile link. If the Pages hostname changes too, also update the canonical URL, `og:url`, sitemap location, and robots sitemap URL. GitHub Pages paths are case-sensitive; use exact filenames. Entry-point assets use document-relative paths; project screenshots may use root-relative paths.

## Preview and publish

Serve the repository root with any static HTTP server, for example `python3 -m http.server 8766`, and open `http://localhost:8766/`. No build or package installation is required. JavaScript renders project cards; a no-script summary remains available.

After reviewing and merging the PR yourself, enable GitHub Pages in Settings → Pages → Deploy from a branch → main → / (root). The implementation PR does not enable Pages or merge itself.

The theme initially follows the OS preference. A manual toggle saves light/dark in local storage; remove the `portfolio-theme` key to follow the OS again. When storage is blocked, the toggle still works for the current page.
