# Aerarium Pricing (working draft)

Status: **draft / not public.** Numbers below are starting points to pressure-test,
not committed prices. Free during beta for both products; this defines what paid
looks like once the finishing sprints land.

Strategy note: **undercut Qualtrim now, raise later with traction.** Qualtrim is
flat $10/mo, no free tier, 10k+ paying users, $1M+/yr — but its acquisition is a
large YouTube channel (Joseph Carlson). We don't have that channel, so **our free
tier IS our acquisition** (SEO/GEO discovery). Price under $10 while building
proof; revisit upward once retention + traction are real.

---

## Two products, separate billing for now

App (iOS, App Store/RevenueCat) and Research (web, Stripe) are billed separately
until logins merge. A unified "Aerarium Pro" comes after SSO (see
`BRAND-AND-RESEARCH-STRATEGY.md`). Keeping them separate now is the right call —
different platforms, different value, no premature billing complexity.

---

## Aerarium Portfolio (iOS)

> **Refinement (project brain, 2026-05-31):** the free path is **CSV upload**, not
> "manual entry." Per the brain, CSV is a deliberate privacy feature ("privacy
> maxis" who won't put brokerage creds in the cloud) — so the free tier is a
> *choice*, not a crippled tier. Reframe: **Free = CSV import + core X-Ray +
> Policy Score; Paid = SnapTrade brokerage auto-sync** (which also carries the
> ~$2/user/mo cost). See FEATURES.md.

The hidden cost stack: **Apple takes 15%** (Small Business Program, <$1M/yr) AND
**SnapTrade costs ~$2/user/mo** on the brokerage tier. Both must clear.

| Tier | Founder's spitball | My suggestion | What's included |
|---|---|---|---|
| Free | (beta) | **Free** | **1 portfolio** via CSV import, core X-Ray, basic Policy Score. Capped at one portfolio to nudge Plus. Zero marginal cost to us. |
| Plus | $3.99 | **$4.99** | Manual entry, full Policy Score history, IPS cockpit, thesis tracking, goals. |
| Pro | $6.99 | **$9.99** | Everything in Plus **+ SnapTrade brokerage auto-sync**, unlimited accounts. |

### Why I'd widen the gap (the margin math)
Your $3.99 / $6.99 leaves the brokerage tier — which has a real $2 cost — netting
barely more than manual:

| Tier | Price | −Apple 15% | −SnapTrade | **Your net** |
|---|---|---|---|---|
| Plus $3.99 | 3.99 | 3.39 | — | **$3.39** |
| Pro $6.99 | 6.99 | 5.94 | −2.00 | **$3.94** ← only $0.55 more for more value + real cost |
| **Plus $4.99** | 4.99 | 4.24 | — | **$4.24** |
| **Pro $9.99** | 9.99 | 8.49 | −2.00 | **$6.49** ← upgrade actually pays you |

At $6.99 the upgrade barely rewards you for the cost and convenience you deliver.
At $9.99 the brokerage tier nets ~$6.49 — healthy, still under Qualtrim, and the
"connect your brokerage" upgrade trigger is obvious. If $9.99 feels steep pre-
traction, **$8.99** is a fine middle ($7.64 → $5.64 net).

### Add annual plans
~10× monthly ("2 months free"): Plus ~$49/yr, Pro ~$99/yr. Improves cash flow +
retention, and Apple's cut stays 15%. Manual-entry free tier means free users
never touch the SnapTrade budget — good.

---

## Aerarium Research (web)

| Tier | Founder's spitball | My take | What's included |
|---|---|---|---|
| Free | Free SEO/GEO layer | **Keep** | Logged-out, crawlable **overview wedge**: per-ticker partial data + one chart + description. This is the discovery engine — must stay public. |
| Starter | $5 | **$5 — but give it teeth** | Full charts/history, screener, all data views. **No** AI, **no** portfolio tab, **no** brokerage. |
| Full | $10–12 | **$10** (raise to $12+ with traction) | Everything **+ AI analysis + portfolio tab + SnapTrade**. |

### The one risk: the $5 tier must feel like "the real tool"
If $5 is just "free with slightly less crippling," nobody upgrades to it. The
free→$5 jump has to unlock the actual product — the full interactive chart
builder, complete history, the screener across all 528 companies. Gate only AI,
portfolio, and brokerage above it. Then $5→$10 is "add the AI + your portfolio."

### Qualtrim anchor
Your **$10 Full** sits right at Qualtrim's $10 — but you give a free tier *and* a
$5 entry they don't. That's the undercut: more accessible price ladder, same
ceiling. When traction proves the value, the Full tier can move to $12–15.

### The bigger price anchor (project brain, 2026-05-31)
Research is positioned as **institutional-grade analytics built from SEC EDGAR
primary sources — a replacement for the $24k/yr Bloomberg terminal and $39–79/mo
fiscal.ai.** Use this in copy + pricing comms: $10 reframes from "cheap" to
"institutional data for ~0.04% of a Bloomberg terminal." It justifies raising
Full toward $12–15 with traction without ever feeling expensive. See FEATURES.md
for the full provenance/feature list that backs the claim.

### SnapTrade double-cost warning (for the merge phase)
If a user pays for brokerage on **both** app and Research separately, that's
SnapTrade ×2 = ~$4/mo cost to you. The future unified **Aerarium Pro** should be
**one shared brokerage connection** across both products (cost $2 once) — a
concrete reason the merged login matters, and why Pro should carry a premium.

---

## Future: unified "Aerarium Pro" (post-SSO)

Once logins merge (Supabase, see strategy doc), one subscription unlocks paid
Research + paid Portfolio + one shared brokerage connection + cross-product
portfolio portability. Likely **$14.99–$19.99/mo** — priced above the sum's cost
floor (it carries one $2 SnapTrade, not two) and below buying both separately.
This is the eventual flagship tier; exact shape TBD once both products are paid
and we see what users actually bundle.

---

## Sequencing (founder wants paid "sooner rather than later")

1. **Finishing sprints (now):** build the paywall boundary as you finish features.
   Decide per-feature free-wedge vs paid. Keep Research overview pages logged-out
   and crawlable — do not wall off the SEO surface.
2. **Pre-pricing comms:** "Free during beta + founder pricing for early users" on
   the launch list. Signals paid-is-coming, rewards early signups, names no price.
3. **Turn on billing:** RevenueCat (iOS) + Stripe (web) when features are ready.
   Honor founder/early-user pricing (e.g. lock early users at the lower rate).
4. **Post-traction:** raise Research Full toward $12–15; introduce unified Pro
   after SSO.

## Locked decisions (2026-06-02)
- **Annual discount: 10× monthly** (2 months free) across all paid tiers —
  Plus ~$49/yr, Pro ~$99/yr, Research Starter ~$50/yr, Full ~$100/yr.
- **Founder / early-bird: first year at founder rate, then standard.** NOT a
  lifetime lock — rewards early users without permanently capping LTV or future
  price raises.
- **App free tier caps at 1 portfolio** (CSV import + core X-Ray + basic Policy
  Score). A second portfolio is the upgrade trigger to Plus.

## Still open (smaller)
- Exact founder discount %  (e.g. 30% off year one) — pick at billing turn-on.
- Research Starter $5: final per-view free/paid line — being specified in the
  paywall plan (must keep the logged-out overview wedge crawlable).
