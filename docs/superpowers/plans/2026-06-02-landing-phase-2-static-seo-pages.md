# Landing Phase 2 — Static SEO Content Pages

Date: 2026-06-02  
Status: Implemented on `codex/phase-2-static-seo-pages` for review  
Repo: `aerarium-landing`

## Goal

Ship a small, useful content wedge under `aerarium.app` that search engines and
AI crawlers can read without executing the React landing-page application.

These pages support discovery without flattening the cinematic landing page
into a keyword-heavy marketing surface.

## Rendering Decision

Use build-time static rendering rather than adding runtime SSR infrastructure.

The seven landing-site pages are evergreen, human-written guides. Build-time
HTML gives them the SSR property that matters for this phase: the complete
content, metadata, FAQ markup, screenshot, and internal links are present in the
initial HTML response.

This keeps the existing Vite landing site intact and avoids adding a server
runtime for content that does not need request-time rendering.

## Pages

1. `/portfolio-x-ray`
2. `/investment-policy-statement-app`
3. `/policy-score`
4. `/methodology`
5. `/security`
6. `/goals-funding-plan`
7. `/investment-thesis-tracker`

Each page includes:

- a focused title, meta description, canonical URL, and crawl directive
- visible problem and product explanation copy
- one real iOS screenshot
- who-it-is-for and what-Aerarium-does-not-do sections
- four plain-language FAQs with matching JSON-LD
- internal links to related guides
- TestFlight, founder-list, and Research CTAs

## Implementation

- `scripts/seo-pages.mjs`
  - owns the structured page content and shared static HTML renderer
- `scripts/build-seo-pages.mjs`
  - writes flat `.html` output into `dist/` after Vite builds the SPA
- `public/assets/seo/`
  - stable screenshot paths for the static pages
- `vercel.json`
  - replaces the broad SPA rewrite with an admin-only rewrite so static page
    paths resolve directly
- `public/sitemap.xml`
  - advertises the seven content URLs
- `public/llms.txt`
  - exposes canonical links for AI-oriented discovery

## Verification

Run:

```bash
npm test
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Then fetch every generated route and confirm:

- HTTP `200`
- distinct title and canonical URL
- visible `<h1>`
- FAQ JSON-LD
- screenshot request succeeds

## Database Boundary

No Supabase migration is required or applied for this phase.

