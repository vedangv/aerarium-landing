# Cross-Brand Strategy: Aerarium (Portfolio) + Aerarium Research

This extends the launch kit to cover **both products under the Aerarium brand**
and answers your questions on single login (SSO), portfolio portability, and
monetization. Read `START-HERE.md` and `SEO-GEO-PLAYBOOK.md` first; this builds
on them.

---

## 1. The brand architecture (get this right and everything else follows)

You have one brand, two products, a clean domain story:

```
                 AERARIUM  (the brand)
                 aerarium.app  ← umbrella site, the "front door"
                  │
        ┌─────────┴───────────┐
        ▼                     ▼
  Aerarium Portfolio     Aerarium Research
  portfolio.aerarium.app  research.aerarium.app
  (iOS app, TestFlight)   (web app — formerly FinSight)
  "see what you own"      "understand the market"
```

**Naming discipline (important):** "FinSight" is the old internal name. Publicly
it is **Aerarium Research** everywhere — App Store copy, social, the site `<title>`,
JSON-LD, llms.txt. Mixed naming confuses both humans and AI (an LLM won't connect
"FinSight" reviews to "Aerarium" unless you tell it they're the same). One name.

**The relationship in one sentence (use everywhere):**
> Aerarium Research tells you what's happening in the market. Aerarium Portfolio
> keeps your real portfolio aligned with your rules. Same brand, same login, two
> sides of one disciplined process.

---

## 2. Why two products is an *advantage*, not double the work

Most solo founders have one top-of-funnel. You have two, and they feed each other:

- **Research is your SEO magnet.** It can rank for thousands of specific,
  low-competition queries people already type ("AAPL revenue segments", "13F
  overlap", "Fed funds curve"). That's free, high-intent traffic the Portfolio
  app could never attract on its own.
- **Portfolio is your monetization + retention.** It's the personal, sticky,
  eventually-paid product.
- **Each promotes the other.** Every Research page carries a soft Portfolio CTA;
  the Portfolio app/landing points power users to Research. One visitor, two
  chances to convert, one brand to remember.

This is the **"product-led growth" loop**: free public data pulls strangers in →
brand trust → app install → (later) paid. Bloomberg, Koyfin, and Morningstar all
run versions of this. You're doing it as a solo founder, which is genuinely strong.

---

## 3. Aerarium Research — its own SEO plan (the big opportunity)

I looked at the Research codebase (Next.js app, S&P 500 + NASDAQ-100, routes for
stocks/funds/macro/earnings/sectors/screener/chart-builder). Findings:

**The good:** it's Next.js (server-rendered — *far* better for SEO than the
Vite SPA landing page), it has genuinely useful data, and it has many route
families. This is a real SEO asset.

**The gaps (all fixable):**
- No `metadata` exports / Open Graph in the layout — pages have no titles or
  descriptions for Google/AI.
- No `robots.ts`, `sitemap.ts`, or `llms.txt`.
- Routes use **query parameters** (`?ticker=AAPL`) rather than path params
  (`/stocks/AAPL`) — a deliberate choice for Vercel routing, but **query-param
  pages are much weaker for SEO**. Google indexes `?ticker=AAPL` poorly and often
  treats them as one page. This is the single biggest SEO limiter on Research.

### Research SEO priorities (in order)
1. **Per-page metadata.** Next.js `generateMetadata()` per route so every
   stock/fund/macro page has a unique title, description, and OG image. Biggest
   win for the least effort. ("AAPL Revenue Segments | Aerarium Research", etc.)
2. **Dynamic `sitemap.ts` + `robots.ts`.** Auto-generate a sitemap from the 531
   companies × key views. This alone exposes thousands of pages to Google.
3. **`llms.txt`** describing Research (mirror the one we shipped on aerarium.app).
4. **The path-vs-query decision.** Long term, real indexable URLs
   (`/stocks/aapl/revenue-segments`) will dramatically outperform query params.
   This is an architecture change (the CLAUDE.md notes path params were avoided
   due to a Vercel `pdx1` routing issue) — worth solving, because programmatic
   SEO across 531 companies is the highest-ceiling growth lever you have. If the
   routing constraint is real, options: static-generate the path-param pages,
   move to the `iad1` region explicitly, or use a rewrite layer. Worth a dedicated
   investigation.
5. **Soft Portfolio CTA** on every Research page: "See how this exposure shows up
   in *your* portfolio → Aerarium Portfolio."
6. **Submit Research to Google Search Console + Bing** as a separate property.

> When you're ready, I can do a "Research SEO Phase 1" pass (metadata + sitemap +
> robots + llms.txt) in that repo, mirroring what we just shipped here — it's a
> bigger job than the landing page because there are many routes, but the
> metadata + sitemap piece is high-leverage and self-contained.

---

## 4. Marketing both at once (without burning out)

You're one person. Don't run two separate marketing machines. Run **one brand
voice, two content streams**, on the same calendar (`LAUNCH-CALENDAR.csv` already
interleaves Portfolio and Research posts).

**Content split that works for a solo founder (~weekly):**
- 60% Portfolio (the monetizable product, the NVDA hook, founder story)
- 30% Research (the SEO magnet — data posts double as social content)
- 10% Brand/founder (build-in-public, the "why two products" story)

**The crossover post is your secret weapon.** Example:
> "I used Aerarium *Research* to see NVDA's weight across the major ETFs. Then
> Aerarium *Portfolio* showed me my real NVDA exposure once you add my direct
> shares. 8% on paper → 18.7% actual. Same login, two halves of one answer."

That single post sells the brand architecture, both products, and the SSO benefit
in one story. Make versions of it a recurring theme.

**Research-specific channels:** Research data (13F, macro, Fed curve) is *perfect*
for FinTwit (X) and r/investing-adjacent subreddits, where people actively want
data, not app pitches. Lead with Research there; let Portfolio follow.

---

## 5. SSO / "one login for both" — yes, and Supabase makes it clean

**Verdict: do this, and it's simpler than feared.** The iOS app already uses
**Supabase Auth** (with an iOS Keychain encryption layer for sensitive fields).
Supabase Auth is explicitly designed for one identity across web + native clients.

**The clean path:** point the **Research web app at the SAME Supabase project** as
the iOS app. The Aerarium_Web repo already has `auth/login/signup` routes — wire
them to the existing Supabase project instead of a separate user store. One
`auth.users` table, one identity, both clients. No Clerk/Auth0/custom needed.

**Why it's worth it:**
- Sign up once, use both → frictionless cross-sell.
- *Portfolio portability* (the moat): user can pull holdings from Portfolio into
  Research to analyze, and push Research watchlists/insights back. Bidirectional.
- **One billing relationship** → one subscription unlocks both (see §6).
- Unified analytics: one user identity across web + iOS.

**Caveats to respect:**
1. **One Supabase project = source of truth.** Don't let Research build its own
   parallel user table you later have to merge. Migrate Research to the app's
   Supabase project *before* it has many web users.
2. **Keep the privacy boundary explicit.** "Private portfolio stays separate from
   public research" is your messaging — shared *identity* is fine, but moving
   private holdings into Research must be **user-initiated and consented**, never
   automatic. Frame it as "your data, you move it."
3. **Carry the encryption layer to web.** The iOS Keychain protects sensitive
   fields on-device; the web app needs an equivalent server-side encryption story
   for any private portfolio data it touches. Worth a security pass before
   connecting them.
4. **Don't block launch on it.** Ship separate logins if needed; unified login is
   a great *later* marketing beat ("One Aerarium account now works across both").

**Recommended sequence:**
1. **Now → launch:** both in beta; separate logins OK if unified isn't ready.
2. **Next:** migrate Research auth onto the app's existing Supabase project.
3. **Then:** ship unified login + RevenueCat/Stripe billing tied to the Supabase
   user (one subscription → both products).
4. **Then:** portfolio portability (move holdings Portfolio↔Research) — the
   feature that most justifies the paid tier.

---

## 6. Monetization — paid is the plan; beta-free is only to find bugs

**Corrected stance (founder is right):** Aerarium is NOT a free-forever product.
- **Research is a real moat.** The data is public, but taming messy EDGAR/13F/macro
  sources into a clean, visually digestible format took *months* per ~500 tickers.
  That work is the product. It gets paid for.
- **The app can't be free** — SnapTrade brokerage sync costs ~$2/user/month, so
  free-forever is economically impossible at the app level.
- **Free now = beta only.** The point of free-during-beta is to attract bug-finders
  and harden both products *before* charging anyone. Free is a testing phase, not a
  business model.

### The one hard constraint to design around
SEO and GEO only work on **crawlable, logged-out** pages. Google can't rank, and
ChatGPT/Perplexity can't cite, anything behind a login or paywall. So the question
is **not** "free vs paid" — it's **"what thin free wedge stays public so strangers
(and AIs) can find you, while the real depth is paid."**

This is exactly how stockanalysis.com, Koyfin, TIKR, and Morningstar operate:
**metered freemium.**

### Recommended model

**Aerarium Research**
- **Free / public / indexable (the wedge):** a per-ticker *overview* page with
  partial data — headline metrics + one chart + a description. Enough to rank for
  "AAPL revenue segments" and get cited by AI; *not* enough to replace the tool.
  Treat these as marketing pages that happen to live in the product.
- **Paid (the months-of-work depth):** full interactive chart builder, full
  history, the 13F/funds tooling, screener, macro suite, saved views, exports,
  alerts. This is correctly gated — you're not giving away the tamed beast, just
  leaving a teaser crawlable.

**Aerarium Portfolio**
- **Free tier:** *manual* portfolio entry + core X-Ray/Policy Score. Manual entry
  has zero marginal cost to you, so free users don't bleed the SnapTrade budget.
- **Paid:** **brokerage auto-sync (SnapTrade)** — the obvious upgrade trigger,
  which conveniently maps to your real per-user cost — plus unlimited accounts,
  full Policy Score history, thesis tooling.

**Aerarium Pro (one subscription, both products):** the reason SSO matters. One
price unlocks paid Research + paid Portfolio + cross-product portability. Simplest
to communicate, highest perceived value, single billing on the shared Supabase user.

### Sequencing (founder wants this "sooner rather than later")
A few sprints of finishing touches remain on both, then monetize. So:
1. **These sprints:** finish features AND build the paywall boundary now — decide
   per-feature what's free-wedge vs paid, and keep the free Research overview pages
   logged-out and crawlable. Don't accidentally wall off your SEO surface.
2. **Instrument before charging:** the UTM + analytics setup tells you which
   features drive retention → those anchor the paid tier. Watch it during beta.
3. **Pre-pricing comms (now, honest):** "Free during beta" + "founder pricing for
   early users" on the launch list. Sets the expectation that paid is coming and
   makes early signups feel rewarded — without naming a price yet.
4. **Turn on billing** (RevenueCat for iOS, Stripe for web, both keyed to the
   Supabase user) when features are ready. Honor founder-list/early-user pricing.

**The only "keep free" rule that survives:** the **logged-out Research overview
pages** — not for generosity, but because they're your discovery engine. Everything
with real depth is paid.

**Don't, yet:** name a specific price or turn on billing mid-beta. But DO say
"free during beta, founder pricing for early users" — that signals paid-is-coming
and rewards early signups without committing to a number.

---

## 7. Concrete next steps

Founder decisions captured (2026-05-30):
- **Auth:** iOS app already on **Supabase** (+ Keychain encryption). SSO path =
  point Research at the same Supabase project. ✅ decided.
- **Monetization:** both products WILL be paid; free is beta-only (to find bugs
  before charging). App must be paid (SnapTrade ~$2/user/mo); Research is a real
  moat (months of data-taming work). Timeline: **sooner rather than later** — a
  few finishing sprints, then monetize.
- **Rename:** FinSight → Aerarium Research UI rename already done. ✅

| Step | Effort | Payoff | Who |
|---|---|---|---|
| Ship landing SEO Phase 1 (DONE) | done | link previews + Google/AI baseline | ✅ |
| Research SEO Phase 1 (metadata + sitemap + robots + llms.txt) | medium | thousands of indexable pages | me, when ready |
| Migrate Research auth onto the app's Supabase project | medium | unlocks SSO + unified billing | you/me |
| Define the free-wedge vs paid boundary per feature | small (decision) | protects SEO surface while monetizing | you + me |
| Keep logged-out Research overview pages crawlable | design | preserves discovery engine | engineering |
| Submit both sites to Search Console + Bing | small | indexing + AI (Bing→ChatGPT) | you (I can guide) |
| Investigate Research path-param → path URLs | medium-large | highest SEO ceiling | me, when ready |
| Wire billing (RevenueCat iOS + Stripe web) to Supabase user | medium | turn on revenue | later |

---

## Open question still pending

- **Research SEO Phase 1:** want me to do this pass next in the finsight repo
  (per-page `generateMetadata`, dynamic `sitemap.ts`, `robots.ts`, `llms.txt`) —
  the same way I just did the landing page? It's the highest-leverage next move
  and is self-contained. The path-param URL question can follow as its own
  investigation.
