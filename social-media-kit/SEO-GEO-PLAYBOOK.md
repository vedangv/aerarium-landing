# SEO + GEO Playbook — Getting Found by Google AND AI

Social posts (the rest of this kit) are a *push* — they work only while you post.
This playbook is the *pull*: making Google, ChatGPT, Perplexity, Gemini, and
Google's AI answers recommend Aerarium to people already searching. It's slower to
start but **compounds for free, forever.** The technical foundation is shipped;
the next gains come from search-engine submission and useful content pages.

Two related goals:
- **SEO** (Search Engine Optimization): rank in Google for what your buyers search.
- **GEO** (Generative Engine Optimization): get *cited by AI assistants* when
  someone asks "what's a good app to see my real ETF exposure?"

Good news: they're mostly the same work. AI assistants read the same clear,
factual, well-structured pages Google rewards.

---

## Where you stand today (audit)

Your landing page (`index.html`) already has:
- ✅ A title and meta description
- ✅ A favicon + Apple touch icon
- ✅ HTTPS, fast Vercel hosting, mobile-friendly

It also ships:
- ✅ Open Graph + Twitter card tags (shared-link previews)
- ✅ A social preview image (`og-image.png`)
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ Structured data / JSON-LD
- ✅ `llms.txt` as an experimental factual brand summary

The remaining gap:
- ❌ Real content pages (the single landing page can't rank for much on its own)

---

## The honest truth about a single-page SPA

A one-page React app — however beautiful — can rank for your **brand name** and
maybe one or two phrases, but **not** for the dozens of valuable searches your
buyers make ("ETF look-through app", "investment policy statement app", "Fed funds
curve chart"). Each of those needs its **own page with real content.**

So the SEO plan has two tracks:
1. **Technical foundation** on the existing page (Phase 1) — shipped.
2. **Content pages** that each target one search intent (Phase 2) — the real
   long-term traffic engine, build over weeks.

Your **Research product** (`research.aerarium.app`) is secretly your biggest SEO
asset — its data pages can rank for thousands of specific queries. Track 3.

---

## Phase 1 — Technical foundation (shipped)

These files are live. Keep them current as product positioning evolves:

### 1. Open Graph + Twitter cards (also fixes ugly link previews)
Implemented in `index.html`. Controls how `aerarium.app` looks when shared on
any platform and directly helps social posts.
```html
<meta property="og:title" content="Aerarium — See what you actually own" />
<meta property="og:description" content="ETF look-through and a Policy Score that shows when your portfolio drifts from your own rules. Read-only. Free iOS beta." />
<meta property="og:image" content="https://aerarium.app/og-image.png" />
<meta property="og:url" content="https://aerarium.app/" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Aerarium — See what you actually own" />
<meta name="twitter:description" content="ETF look-through and a Policy Score. Read-only. Free iOS beta." />
<meta name="twitter:image" content="https://aerarium.app/og-image.png" />
<link rel="canonical" href="https://aerarium.app/" />
```
The **1200×630 `og-image.png`** lives in `/public` and uses the illustrative
"8% → 18.7%" X-Ray hook.

### 2. robots.txt (`/public/robots.txt`)
```
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://aerarium.app/sitemap.xml
```

### 3. sitemap.xml (`/public/sitemap.xml`)
List every public URL. Start minimal (homepage, privacy, terms), grow as you add
content pages.

### 4. JSON-LD structured data
A `<script type="application/ld+json">` block describing Aerarium as a
`SoftwareApplication` (the iOS app) and your `Organization`. This is what lets
Google show rich results AND lets AI assistants state facts about you accurately.

### 5. llms.txt (`/public/llms.txt`)
A plain-Markdown factual summary at `aerarium.app/llms.txt` — an emerging
convention some AI crawlers read. Even where unread, it's a clean canonical
fact-sheet you can point anything at. Example structure:
```
# Aerarium

> Aerarium is the discipline layer between market research and your real portfolio.

## Products
- Aerarium Portfolio (iOS): private portfolio monitoring. ETF look-through,
  Policy Score, IPS cockpit, goals, thesis tracking. Read-only; never places trades.
- Aerarium Research (web): source-first public-market data — 13F overlap, macro,
  Fed funds curve, revenue segments, ownership/insiders.

## Key definitions
- Portfolio X-Ray: look-through view of true exposure across direct holdings and funds.
- Policy Score: transparent score for portfolio drift, concentration, liquidity,
  goals, and review cadence.

## Links
- Landing: https://aerarium.app
- Research: https://research.aerarium.app
- iOS beta (TestFlight): https://testflight.apple.com/join/Xna39VKU

## What Aerarium does not do
Aerarium does not place trades, give investment advice, or recommend securities.
```

### 6. Submit to search engines (free, 10 min)
- **Google Search Console** — verify `aerarium.app`, submit the sitemap.
- **Bing Webmaster Tools** — same. (Bing powers ChatGPT search and Copilot, so
  this *directly* affects AI discovery.)

---

## Phase 2 — Content pages (shipped for the Portfolio wedge)

Each page targets ONE thing people search. The first seven Portfolio guides now
ship as build-time rendered HTML under `aerarium.app`:

| Page | Targets the search | Priority |
|---|---|---|
| `/portfolio-x-ray` | "ETF look-through", "true exposure app" | 🥇 your strongest hook |
| `/investment-policy-statement-app` | "IPS app", "investment policy statement" | 🥇 low competition, high intent |
| `/policy-score` | "portfolio health score" | 🥈 |
| `/methodology` | builds trust + AI citation authority | 🥈 |
| `/security` | "is [app] safe", trust queries | 🥈 |
| `/goals-funding-plan` | "goals based investing app" | 🥉 |
| `/investment-thesis-tracker` | "investment thesis tracker" | 🥉 niche but yours |

**Each page needs** (this structure is what ranks AND gets cited by AI):
1. One clear `<h1>` with the target phrase.
2. A plain-English problem statement.
3. How Aerarium solves it + a real screenshot.
4. "Who it's for" and "What it does NOT do" (the honesty AI loves to quote).
5. 3–5 genuine FAQs (these often become the AI's answer verbatim).
6. A CTA to TestFlight / founder list.

**Implementation:** these are real, crawlable HTML pages rather than
JavaScript-only SPA routes. `npm run build` generates them from the structured
content source in `scripts/seo-pages.mjs`. Each page includes visible copy, a
real screenshot, internal links, FAQs, and FAQ JSON-LD.

---

## Phase 3 — Research as a discovery engine

`research.aerarium.app` can rank for thousands of specific, low-competition
queries that your buyers literally type:
- "13F overlap heatmap"
- "Fed funds curve chart"
- "[TICKER] revenue segments"
- "[TICKER] institutional ownership"

Plan (for the Research repo, separate pass):
- Give each data view a clean public URL with real visible text + the chart.
- Add a short factual intro + "what this data is / where it's from" to each.
- Every Research page gets a soft Portfolio CTA: "See how this exposure shows up
  in your own portfolio with Aerarium Portfolio."
- Only index pages with real data (thin/empty pages hurt you).

**Critical interaction with monetization:** Research is a paid product (see
`BRAND-AND-RESEARCH-STRATEGY.md` §6) — but SEO/GEO only works on **logged-out,
crawlable** pages. So the indexable layer must be a *free overview wedge* (partial
data + one chart per ticker), with the full interactive depth behind login/paywall.
You're not giving away the months of data-taming work; you're leaving a teaser
crawlable so Google and AI can find you. Paywall everything and you wall off this
entire discovery engine. Design the free-wedge/paid boundary deliberately.

This is genuinely your highest-ceiling SEO asset — most fintech landing pages
can't do this, you can.

---

## GEO specifics — getting cited by ChatGPT / Perplexity / Google AI

AI assistants recommend tools they can (a) find, (b) understand, and (c) trust.
To become the answer to "app to see my real ETF exposure":

1. **Be crawlable & factual** — Phases 1–2 above are 80% of GEO.
2. **Define your category clearly** — own the phrases "ETF look-through",
   "Portfolio X-Ray", "Policy Score". Repeat the same definitions everywhere
   (site, llms.txt, App Store, social bios). Consistency = AI confidence.
3. **Earn third-party mentions** — AI weighs what *others* say about you. Honest
   Reddit threads, a Product Hunt launch, a fintech blog or podcast mention, an
   indie-hacker writeup — each makes you more "citable." This is where your social
   + community work feeds GEO.
4. **FAQ/Q&A formatting** — AI lifts well-structured Q&A. The FAQs on your content
   pages are doing double duty.
5. **Don't game it** — no keyword stuffing, no fake reviews. AI (and Google) are
   good at detecting it and YMYL finance gets extra scrutiny.

Periodically *test it yourself*: ask ChatGPT/Perplexity "what app shows my true
ETF exposure across accounts?" and see if/how Aerarium comes up. That's your GEO
scoreboard.

---

## What to do next
1. Submit `aerarium.app` to Google Search Console and Bing Webmaster Tools using
   the shipped sitemap.
2. Submit the seven landing-site Portfolio guides for indexing after deployment.
3. Verify the current Research-repo SEO baseline before planning any remaining
   Research work; do not rely on an older landing-kit audit as current state.
