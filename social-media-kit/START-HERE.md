# Aerarium Launch Kit — Start Here

You've never run a launch before. That's fine. This kit is written so you can
follow it without a marketing background. Read this page top to bottom once
(~10 min), then work off the calendar.

**Today:** the landing page is live, the iOS beta (TestFlight) is open, Research
is live, and you have an Instagram account. App Store launch target is
**June 9, 2026**.

---

## The one idea behind everything

People don't share features. They share a *moment of surprise*. Yours is:

> **You think you own 8% NVDA. Look through your ETFs and it's actually 18.7%.**

That "wait, what do I *actually* own?" feeling is the single most powerful thing
Aerarium does. Almost every post, ad, and SEO page should lead with a version of
it. Features (Policy Score, IPS, goals) are *proof that you can deliver on the
surprise* — they are not the headline.

If you remember nothing else: **lead with the hidden-exposure surprise, then show
the product is real.**

---

## How traffic actually reaches you (the funnel)

```
   Instagram / LinkedIn / X / Reddit  ──┐
   Google search                        │
   ChatGPT / Perplexity / AI answers  ──┼──►  aerarium.app  ──►  TestFlight (beta)
   Research pages (research.aerarium.app)│                  └─►  Founder launch list
                                         ┘
```

Three "doors" bring people in:
1. **Social** — you posting (this kit). Fast, but only as big as your reach.
2. **Search/AI (SEO/GEO)** — Google and AI assistants recommending you. Slow to
   start, but compounds for free forever. See `SEO-GEO-PLAYBOOK.md`.
3. **Research product** — your public market-data pages pull in people Googling
   "13F overlap" or "Fed funds curve," then point them to the app.

Every link you post is **UTM-tagged** so you can see which door worked. Never
post a bare link. Always copy the tagged version from `LINKS.csv`.

---

## What's in this kit

| File | What it's for | When you use it |
|---|---|---|
| `START-HERE.md` | This orientation | Once, now |
| `MESSAGING.md` | The hook, voice, what you may/can't say (legal-safe) | Before writing anything yourself |
| `LAUNCH-CALENDAR.csv` | Day-by-day: what to post, where, which asset | Every day — your to-do list |
| `CAPTIONS-INSTAGRAM.md` | Ready-to-paste IG captions (your live channel) | Daily posting |
| `CAPTIONS-LINKEDIN.md` | Founder-voice posts (your strongest channel for this product) | 2–3×/week |
| `CAPTIONS-X.md` | Short hooks + threads for X/Twitter | When you add X |
| `CAPTIONS-REDDIT.md` | Value-first posts (Reddit punishes ads) | Carefully, see rules inside |
| `LINKS.csv` | Pre-tagged UTM links to copy-paste | Every time you post a link |
| `REEL-SCRIPTS.md` | Screen-recording video scripts | For Reels (highest reach in 2026) |
| `SEO-GEO-PLAYBOOK.md` | Getting found on Google + AI assistants | Ongoing, separate from social |
| `BRAND-AND-RESEARCH-STRATEGY.md` | Both products (Portfolio + Research), SSO, monetization | When planning the bigger picture |
| `*.png` | The 14 product screenshots | Attached to posts |

---

## Your first week (do exactly this)

You only have an Instagram account today, so week 1 is **Instagram-only + set up
the free foundations.** Don't try to be on every platform at once — that's how
solo founders burn out.

**This week:**
1. Read `MESSAGING.md` (15 min). It keeps you from accidentally saying something
   that sounds like financial advice (which gets you in real trouble).
2. Post the **NVDA hidden-exposure Reel** first (`REEL-SCRIPTS.md` → Script 1).
   It's your best hook. Use the IG caption from `CAPTIONS-INSTAGRAM.md`.
3. Follow `LAUNCH-CALENDAR.csv` for the daily posts.
4. Put your **UTM founder-list link** in your IG bio (from `LINKS.csv`).
5. Optional but high-value: do the 30-minute "Phase 1" technical SEO setup in
   `SEO-GEO-PLAYBOOK.md` so Google and AI can find you while you sleep.

**Don't yet:** run paid ads, buy followers, post the same thing 5×/day, or claim
user numbers you don't have. None of that helps a real beta launch.

---

## Rules that keep you safe (read once, never break)

You're a finance product, which means **YMYL** ("Your Money or Your Life") — the
category Google and Apple scrutinize hardest. Three hard rules:

1. **Never imply advice or returns.** No "beat the market," "best stocks,"
   "guaranteed," "you should buy." You show people *their own data*; you don't
   tell them what to do. (Full banned-words list in `MESSAGING.md`.)
2. **Never fake proof.** No invented user counts, testimonials, or "10,000
   investors trust us." You're a solo founder in beta — your honesty *is* the
   brand. "I built this" beats "thousands love this" at this stage.
3. **Always say what you DON'T do.** "Read-only. Aerarium never places trades."
   This line builds more trust than any feature. Use it often.

---

## How you'll know it's working

You don't need fancy analytics. Watch four numbers weekly (all free):
- **Founder-list signups** (your waitlist dashboard)
- **TestFlight clicks** (Vercel Analytics → events)
- **Which UTM** drove them (Vercel Analytics → filter by `utm_campaign`)
- **Instagram reach/saves** (IG Insights — saves matter more than likes here)

A good week early on isn't "viral." It's *5–20 genuinely interested signups* and
learning which message made them click. That's the whole game right now.

Next: open `MESSAGING.md`.
