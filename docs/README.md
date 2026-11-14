# Aerarium Landing Docs

This folder tracks planning for the standalone Aerarium landing page.

## Current Docs

- `research/reference-sites/2026-05-28-outlier-inspiration.md`
  - Firecrawl-backed inspiration synthesis from Luffu, Poly, Fluz, and ISO
    Meet.
  - Captures the proposed emotional arc, product moat, founder-story draft, and
    next landing-page architecture.
- `research/reference-sites/2026-05-28-redesign-way-forward.md`
  - Converts the reference research and Gemini critique into the recommended
    redesign sequence for the feature branch.
- `superpowers/specs/2026-05-27-seo-geo-launch-design.md`
  - Planned SEO/GEO and launch-distribution pass.
  - Covers `aerarium.app`, `research.aerarium.app`, the iOS app funnel, social media kit expansion, and Research public-route planning.
- `superpowers/plans/2026-06-02-landing-phase-2-static-seo-pages.md`
  - Implemented build-time rendering plan for seven crawlable Portfolio guide
    pages under `aerarium.app`.
- `LANDING-HANDOFF.md`
  - Current page architecture, scene mechanics, conventions, and done/pending
    list, including the 2026-11-13 audit.
- `CONTENT-MAP.md`
  - Which file holds which copy, and the shared values (App Store and Research
    URLs, prices).
- `LAUNCH_FLIP.md`
  - The App Store launch-day checklist; completed 2026-07-20, kept as history.

## Current Priority

The calm two-product homepage overhaul is shipped. The first landing SEO wedge
is now generated as static HTML so it can remain crawlable without changing the
homepage scrollytelling architecture.

On 2026-11-13 the page was audited and improved (PRs #11 and #12): compact
phone layout, one App Store call to action with consistent pricing, tracked
product links and Smart App Banner, accessibility fixes, waitlist API and admin
hardening, a Playwright browser suite, and cleared dependency advisories. Open
follow-ups (email ownership verification for referral lookups, a shared rate
limiter, checks on the deployed site and physical devices) are listed in
`LANDING-HANDOFF.md`.

The next separate workstream is the Research GEO content plan for
`research.aerarium.app`. Keep it in its own branch and PR.
