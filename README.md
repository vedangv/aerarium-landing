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
  -> App Store download or founder launch list
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
Current iOS CTA: `https://apps.apple.com/app/aerarium/id6760155168`.
The app is free to download; optional Premium (US$7.99/month) includes brokerage
sync. Research Pro is CA$10/month. Do not add annual or converted prices without
confirmation from the owner.
Canonical launch domain: `https://aerarium.app/`.
Secondary domain: `https://aerariumapp.com/`, intended to redirect to
`https://aerarium.app/`.
Research domain: `https://research.aerarium.app/`.

Product links use `utm_source=landing`, `utm_medium=crosslink`, and
`utm_campaign=app` or `research`; `utm_content` identifies the placement.
React and the static guide renderer share `src/lib/product-links.mjs`. Keep
the raw HTML fallback and crawl links in `index.html` consistent with this
scheme, while keeping canonical URLs and JSON-LD identities free of tracking
parameters. Research stays secondary to the app download action. The homepage
and guides include the Smart App Banner for App Store ID `6760155168`.

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
- `docs/superpowers/plans/2026-06-02-landing-phase-2-static-seo-pages.md`
  - Records the build-time rendering approach for the seven crawlable Portfolio
    guide pages under `aerarium.app`.

The homepage uses compact, immediately visible sections on phones, tablets,
short windows, and when reduced motion is requested. Larger desktop windows
retain the scroll scenes. Keep the static homepage fallback and guide pages
useful, visible, and crawlable when JavaScript cannot load.

## Static Portfolio guides

`npm run build` generates seven flat HTML pages after the Vite app build:

- `/portfolio-x-ray`
- `/investment-policy-statement-app`
- `/policy-score`
- `/methodology`
- `/security`
- `/goals-funding-plan`
- `/investment-thesis-tracker`

The source content and renderer live in `scripts/seo-pages.mjs`. The pages use
stable screenshots from `public/assets/seo/`, are listed in `public/sitemap.xml`,
and are linked from `public/llms.txt`.

## Marketing assets

The original product screenshots remain in `assets/product-tour/`. The three
largest phone images use 720-pixel-wide WebP derivatives in
`src/assets/optimized/`, generated with `cwebp -q 90 -sharp_yuv -resize 720 0`.
Keep the originals when refreshing these derivatives. The navigation and guide
logos reuse the smaller existing Apple touch icon.

The site's four font families are served locally from `public/fonts/`, with
their SIL Open Font Licenses alongside them. These Latin WOFF2 subsets come
from Fontsource 5.3.0; their CSS is in `src/fonts.css`. The hero's serif and body
font are preloaded, and fonts use `font-display: swap`.

The link-preview source is `scripts/og-image.html`. Render it through the local
Vite server at 1200 × 630, after `document.fonts.ready`, to refresh
`public/og-image.png`. Keep the example labelled and subscription claims aligned
with the homepage. This asset is separate from the social-media kit.

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

Both API routes require a JSON object of at most 8 KiB, reject cross-origin
browser submissions, disable caching, and bound database requests to an
eight-second deadline. Database errors and request contents are not logged.
The signup route allows five attempts per client IP per 15 minutes; admin
authentication allows five failed attempts in the same window. The stores
expire entries and cap memory at 4,096 client addresses per function instance.
These are best-effort limits within a warm instance: they do **not** coordinate
across Vercel instances or survive cold starts. An owner-configured edge or
shared rate limiter is still needed for distributed abuse protection.
At capacity the limiter rejects new client addresses until entries expire;
this can temporarily block an owner login too. It deliberately does not bypass
an exhausted limit for a correct password, which would defeat guess throttling.

The existing referral response is retained for compatibility. Looking up an
existing signup by submitting its email does not prove ownership of that email;
email verification is required before this can become a private account view.
New signups return a zero referral count without an extra database query.
For existing signups, referral statistics are best effort: a failed count query
still returns a successful confirmation with `referralCountUnavailable: true`.
The UI labels this state instead of presenting the legacy numeric fallback as
a known zero. Optional statistics must never cause a confirmed insert to retry.

Admin view:

- `/admin/waitlist`
- Protected by `ADMIN_DASHBOARD_PASSWORD`
- Shows latest launch-list signups, referral codes, referred-by attribution,
  and signup referral counts.
- The counts and top referrer describe only the latest 500 rows returned by
  the API, not all-time totals. Refresh failures leave the previous list visible
  with an error. Sign out clears the rows and in-memory password; neither is
  saved in browser storage. Unauthorized refreshes also clear the view.

Local checks:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

`lint` runs the TypeScript check. Browser regressions use Playwright against a
fresh local production build and block all external traffic and unmocked API
requests. Install Chromium with `npx playwright install chromium`, or set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium/Chrome executable.
The suite covers responsive layouts, keyboard navigation, storage and clipboard
failures, mocked signup responses, and axe accessibility scans of the homepage,
mobile menu, and signup confirmation. These scans complement manual browser
checks; they do not certify every screen-reader interaction.

For Safari-engine coverage, install WebKit with `npx playwright install webkit`
and run `npm run test:e2e:webkit`. This runs the same local, network-isolated
suite at phone and desktop widths without changing the default Chromium run.
It is engine coverage, not a substitute for testing on a physical iPhone.
Generated build, browser, and test artifacts are excluded from TypeScript checks.
