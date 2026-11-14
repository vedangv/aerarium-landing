# App Store launch-day flip checklist

> **Status (2026-11-13): done.** The CTA flip shipped on 2026-07-20 (`f4e351f`).
> `src/`, `index.html`, `public/llms.txt` and `scripts/seo-pages.mjs` no longer
> mention TestFlight or beta, and the `apple-itunes-app` Smart App Banner
> (App Store ID `6760155168`) is on the homepage and the static guides. Current
> copy: "Download on the App Store", "Free to download · Premium US$7.99/month or
> US$79.99/year", "Brokerage sync requires Premium." The checklist below is kept
> as history. Still open from it: resubmit the sitemap in Google Search Console.

When the iOS app is approved and live, make these changes in one commit.
Everything TestFlight/beta-related was deliberately KEPT until then
(decision 2026-07-08). Grep check after editing: `grep -rn "TestFlight\|beta" src/ index.html public/llms.txt scripts/seo-pages.mjs`

## CTAs (swap TestFlight → App Store)
- `src/components/HeroQuestionsScene.tsx` — hero microcopy "Free on iOS via TestFlight · …" → "Free on the App Store · …"; "Get Early Access" CTA → "Download on the App Store" pointing at the App Store URL.
- `src/components/Navbar.tsx` — "Join iOS Beta" button → "Download" (App Store URL).
- `src/components/CtaBridge.tsx` + `src/components/MobileSnapBeat.tsx` — "Come experience the full app — free while it's in beta on TestFlight" → premium-honest copy: "Free to download — Aerarium Premium unlocks everything (US$7.99/month or US$79.99/year)".
- `src/components/WaitlistPortal.tsx` — "Immediate iOS Beta" quick-link → App Store badge; consider retiring the waitlist section entirely or repurposing as newsletter.
- Footer (`src/App.tsx`) — "TestFlight" link → "App Store".

## Metadata
- `index.html` — OG/Twitter descriptions still say "Free iOS beta" → replace with App Store framing; add `MobileApplication` JSON-LD with the App Store URL + `aggregateRating` once reviews exist.
- `public/llms.txt` — "available through TestFlight during beta" → App Store link.
- `scripts/seo-pages.mjs` — grep for TestFlight/beta phrasing in the static page definitions ("Join iOS Beta" nav CTA appears on all SEO subpages).

## Apple smart banner
- Add `<meta name="apple-itunes-app" content="app-id=APP_ID">` to index.html once the App Store ID exists — iOS Safari then shows the native install banner.

## After the flip
- `npm run lint && npm test && npm run build`, verify locally, push (Vercel auto-deploys).
- Re-run the IndexNow submit on research.aerarium.app is NOT needed (different site); but resubmit this site's sitemap in GSC.
