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

## 5. Your SSO / "one login for both" idea — strong, with caveats

**Verdict: yes, do this — it's the right strategic bet.** A shared account is
what turns "two products" into "one platform," and it's the backbone of your
future paid tier. The Research repo already has `auth/login/signup` routes, so you
have a foundation.

**Why it's right:**
- Removes friction (sign up once, use both).
- Enables the killer feature you described — *portfolio portability*: pull holdings
  from Portfolio into Research to analyze them, and push Research insights/watchlists
  back to Portfolio. That bidirectional flow is a genuine moat.
- Gives you **one billing relationship** later (one subscription unlocks both).
- Unifies analytics: one user identity across web + iOS.

**The caveats (real ones, plan for them):**
1. **Identity architecture first.** You need a single source of truth for accounts
   — one auth provider (e.g. Clerk, Supabase Auth, Auth0, or your own) that BOTH
   the iOS app and the Research web app authenticate against. Don't build two user
   tables you later have to merge — that's painful. Decide the shared identity
   layer *before* you have many users on each side.
2. **The privacy boundary is a feature, not an afterthought.** Your own messaging
   says "private portfolio stays separate from public research." Shared login must
   not blur that: Research is public-data; Portfolio is private holdings. The SSO
   shares *identity*, and *optionally* lets the user move their portfolio across —
   but it must be explicit, user-initiated, and clearly consented. Frame it as
   "your data, you move it," never automatic.
3. **Scope creep risk.** SSO + portfolio sync is a real engineering project. Don't
   let it block the June 9 launch. Launch both products with separate logins if
   needed; introduce unified login as a *milestone feature* (great launch beat for
   later: "One Aerarium account now works across both products").
4. **Security/YMYL.** Two surfaces sharing auth = bigger attack surface for a
   finance product. Read-only sync, encryption, and the "never places trades"
   stance must hold across both. Worth a security pass before you connect them.

**Recommended sequence:**
1. **Now:** launch both in beta, separate logins OK. Don't block on SSO.
2. **Next:** pick the shared identity provider; migrate both to it.
3. **Then:** ship unified login (one Aerarium account → both products). Market it
   as a launch moment.
4. **Later:** portfolio portability (move holdings Portfolio↔Research) — this is
   the feature that justifies a paid tier.

---

## 6. Monetization sequencing (you said both go paid eventually)

You don't need pricing live now, but decisions you make today affect it. Guidance:

**Stay free through beta — but instrument everything now.** The UTM tracking +
analytics we set up is exactly what tells you *what people value* before you
charge. Watch which features drive retention; those become the paid tier.

**A natural model for a two-product brand (consider, don't commit yet):**
- **Free forever:** basic Research (public data — keep this free; it's your SEO
  engine and you *want* it crawled and shared). A limited Portfolio (e.g. 1
  brokerage connection, core X-Ray).
- **Aerarium Pro (one subscription, unlocks both):** unlimited accounts, full
  Policy Score history, advanced Research (saved screens, alerts, deeper data),
  and the cross-product portfolio portability. *One price, both products* is the
  whole reason SSO matters.

**Important:** keep enough of Research permanently free and public that it stays a
discovery engine. If you paywall the data pages, you kill the SEO/GEO traffic that
feeds the whole funnel. Monetize *depth, personalization, and the portfolio side* —
not public market facts.

**Don't, yet:** announce prices, add "premium" badges, or gate beta features. At
beta stage, "free" is a feature and honesty is the brand. Charging too early on an
unproven solo product loses more trust than it makes in revenue.

---

## 7. Concrete next steps (pick what you want)

| Step | Effort | Payoff | Who |
|---|---|---|---|
| Ship landing SEO Phase 1 (DONE in this PR) | done | link previews + Google/AI baseline | ✅ |
| Rename FinSight → "Aerarium Research" everywhere public | small | brand + AI clarity | you/me |
| Research SEO Phase 1 (metadata + sitemap + robots + llms.txt) | medium | thousands of pages indexable | me, when ready |
| Decide shared identity provider | small (decision) | unblocks SSO cleanly | you |
| Submit both sites to Search Console + Bing | small | indexing + AI (Bing→ChatGPT) | you (I can guide) |
| Investigate Research path-param URLs | medium-large | highest SEO ceiling | me, when ready |

---

## Open questions for you

1. **Shared identity:** do you already use an auth provider (Supabase? Clerk?
   custom) in the Research app or iOS app? That determines the cleanest SSO path.
2. **Research SEO:** want me to do the Research SEO Phase 1 pass next (in the
   finsight repo), the same way I just did the landing page?
3. **The FinSight → Aerarium Research rename:** is that already done in the live
   product's UI/title, or is "FinSight" still user-visible anywhere? If so, that's
   a quick, high-value cleanup.
4. **Monetization timeline:** rough idea of when you want to introduce paid — that
   changes how aggressively we instrument and what we tease in marketing now.
