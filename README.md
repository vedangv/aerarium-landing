# Aerarium Landing

Standalone Vercel project for the Aerarium launch page.

## Product role

This site is the Aerarium brand umbrella. It should help visitors discover:

- **Aerarium Portfolio:** the iOS app and primary monetizable product. This is
  where users connect brokerages, build an IPS, monitor Policy Score, inspect
  ETF look-through exposure, manage goals/funding, and keep thesis check-ins.
- **Aerarium Research:** the public web research workspace at
  `https://research.aerarium.app/`. This is the source-first market research
  surface and long-tail SEO engine.

The intended funnel is:

```text
SEO / social / Research traffic
  -> aerarium.app
  -> TestFlight or founder launch list
  -> Aerarium Portfolio iOS activation
```

Research can also route users back to the iOS app through contextual CTAs such
as “analyze this exposure in your own portfolio.”

This project is intentionally separate from:

- `website` / FinSight (`https://finsight-beryl.vercel.app/`)
- `Aerarium_Web`
- `Aerarium_Claude` / iOS app source

The landing page may link to FinSight, but it should not be deployed over either existing project.

## Public repo boundary

This repository is safe to keep public only while it remains a marketing surface:

- no Supabase keys or Vercel environment files
- no iOS app source code
- no private product docs or sprint plans
- no user data, screenshots with real personal data, or internal credentials

Current production landing project: `aerarium-landing` on Vercel.
Current iOS beta CTA: `https://testflight.apple.com/join/Xna39VKU`.
Canonical launch domain: `https://aerarium.app/`.
Secondary domain: `https://aerariumapp.com/`, intended to redirect to
`https://aerarium.app/`.
Research domain: `https://research.aerarium.app/`.

## Current planning docs

- `docs/research/reference-sites/2026-05-28-outlier-inspiration.md`
  - Captures the Firecrawl scrape results and inspiration synthesis from Luffu,
    Poly, Fluz, and ISO Meet for the next landing-page creative branch.
- `docs/research/reference-sites/2026-05-28-redesign-way-forward.md`
  - Captures the approved direction to prototype the next branch around the
    spreadsheet/NVDA-overlap founder story, X-Ray proof, Policy Score, Research
    screenshots, and verifiable security.
- `docs/superpowers/specs/2026-05-27-seo-geo-launch-design.md`
  - Captures the planned SEO/GEO pass across the landing site, Research public
    routes, and social launch kit.
  - No SEO implementation should start until the implementation plan is written
    and approved.

Before the SEO pass, the current product focus is still the landing page itself:
the page needs more “spark” and a stronger launch feel while staying calm,
premium, and institutional. Treat the SEO plan as queued work, not the active
design task, until approved.

## Founder launch list

The “Get launch updates” form posts to the Vercel serverless route
`/api/waitlist`, which writes to `public.landing_waitlist` in the Aerarium
Supabase project. The public copy frames this as App Store launch updates,
founder pricing notes, and product release news, not gated beta access.

Required Vercel environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_DASHBOARD_PASSWORD`

The service-role key is server-side only. Do not expose it through `VITE_`,
`NEXT_PUBLIC_`, static assets, or client-side code. The table has RLS enabled
and no public read/write policies; submissions go through the Vercel function.

Admin view:

- `/admin/waitlist`
- Protected by `ADMIN_DASHBOARD_PASSWORD`
- Shows latest launch-list signups, referral codes, referred-by attribution,
  and signup referral counts.

Local checks:

```bash
npm test
npm run lint
npm run build
```
