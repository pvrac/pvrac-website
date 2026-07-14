# PVRAC Website

Multi-page Next.js site for Pierre van Ryneveld Athletics Club, built with the
App Router and configured for static export to GitHub Pages.

## Pages

- `/` — Home (hero, quick intro, training snapshot, links to every section)
- `/about` — Full club description, activities, training sessions, location
- `/membership` — Pricing, how to join, downloadable forms
- `/club-kit` — Club kit pricing, items, ordering
- `/gallery` — Photo gallery
- `/contact` — Contact details, message form, social links

## Getting started

Install [Node.js 20+](https://nodejs.org/) if you haven't already, then:

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build      # static export to /out
npm run preview    # serve /out locally to sanity-check the export
```

## Deploying to GitHub Pages

1. Push this project to a GitHub repo.
2. In the repo settings, go to **Pages** → **Build and deployment** → set
   **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
   `.github/workflows/deploy.yml` builds the static export and publishes it.

The workflow automatically figures out the right `basePath`:
- Repo named `<something>.github.io` → deployed at the domain root, no
  basePath.
- Any other repo name → deployed at `https://<user>.github.io/<repo>/`, so
  basePath is set to `/<repo>` automatically at build time.

You don't need to edit any config for this — it reads `github.event.repository.name`
at build time. Local dev (`npm run dev`) always runs with no basePath.

## Known gaps — content to add

- **Contact form** — `src/app/contact/page.tsx` posts to a Formspree
  placeholder (`YOUR_FORM_ID`). Create a free form at
  [formspree.io](https://formspree.io) and swap in the real ID before launch.

## Design

Colour scheme and typography (Barlow Condensed + Montserrat, navy/blue/gold)
carried over from the original site — see the CSS variables in
`src/app/globals.css`.

## Legacy

The original single-page HTML site is kept in `legacy-static-site/` for
reference and is not part of the Next.js build.
