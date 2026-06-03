# Google Search Console — indexing checklist

A do-this-then-watch-that guide for getting Aerarium indexed. No code; this is
your operational checklist.

## Two properties (both should exist in GSC)
- **`aerarium.app`** — the marketing site. Sitemap = 10 URLs (home, privacy,
  terms, and 7 Portfolio guides). ✅ added + submitted.
- **`research.aerarium.app`** — the research engine. Sitemap = **~3,616 URLs**.
  This is the one that matters. ✅ added + submitted (2026-06-02).

> Reality check: the first landing-site Portfolio wedge now ships as build-time
> rendered HTML. Meaningful indexing/ranking gains on the Research pages still
> come after the Research SSR/ISR pass ships.

## One-time: seed the priority pages
In the `research.aerarium.app` property → **URL Inspection** (top search bar) →
paste the URL → **Request Indexing**. Do this for ~15 high-search tickers (the
rest follow via the sitemap):

```
https://research.aerarium.app/stocks/AAPL
https://research.aerarium.app/stocks/MSFT
https://research.aerarium.app/stocks/NVDA
https://research.aerarium.app/stocks/GOOGL
https://research.aerarium.app/stocks/AMZN
https://research.aerarium.app/stocks/META
https://research.aerarium.app/stocks/TSLA
https://research.aerarium.app/stocks/AVGO
https://research.aerarium.app/stocks/JPM
https://research.aerarium.app/stocks/LLY
https://research.aerarium.app/stocks/V
https://research.aerarium.app/stocks/UNH
https://research.aerarium.app/stocks/XOM
https://research.aerarium.app/stocks/WMT
https://research.aerarium.app/stocks/COST
```
(NVDA is your landing hook — prioritize it.) GSC limits manual requests per day;
just do a handful daily. You do **not** need to request all 3,616 — the sitemap
handles the long tail.

## One-time: validate structured data
- **Rich Results Test** (search.google.com/test/rich-results) on a stock URL →
  confirm **BreadcrumbList** parses with no errors.
- GSC → **Enhancements → Breadcrumbs** will populate over time.

## Weekly (first month), then monthly
| Where in GSC | What to look for | Good sign |
|---|---|---|
| **Pages (Indexing)** | "Indexed" count climbing; size of "Discovered – not indexed" / "Crawled – not indexed" | Indexed trends up week over week |
| **Performance → Search results** | Impressions, clicks, **top queries**, **top pages** | Impressions appear, then grow; real queries show up |
| **Enhancements → Breadcrumbs** | Valid items, 0 errors | Breadcrumbs detected |
| **Sitemaps** | "Success", discovered URL count ≈ 3,616 | No fetch errors |

## Triage — what the "not indexed" states mean
| State | Meaning | Fix |
|---|---|---|
| **Discovered – currently not indexed** | Google knows the URL but hasn't crawled it (crawl budget) | Normal early; improve internal linking; the SSR build + more content help; wait |
| **Crawled – currently not indexed** | Crawled but judged thin/low-value | The SSR/ISR + per-view content (Phase 2/3) directly fixes this — unique, substantial content per page |
| **Alternate page with proper canonical** | Google chose the canonical (e.g. path vs query param) | Expected; confirm canonical points to the path URL |
| **Page with redirect** | URL redirects | Check it's intentional |

## Don't bother with
- Requesting indexing for all 3,616 URLs (sitemap does it).
- Daily checking after month one — indexing is slow; monthly is enough.
- Worrying about early "not indexed" buckets — they shrink as content quality
  (SSR + GEO content) lands.
