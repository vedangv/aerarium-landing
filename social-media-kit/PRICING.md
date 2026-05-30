# Aerarium Pricing

Status: **prices decided, not yet public.** App tiers locked 2026-05-30; Research
tiers near-final (one open item on the $5 tier's exact feature line). Free during
beta for both products; billing turns on once the finishing sprints land.

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

The hidden cost stack: **Apple takes 15%** (Small Business Program, <$1M/yr) AND
**SnapTrade costs ~$2/user/mo** on the brokerage tier. Both must clear.

**Decided pricing** (2026-05-30):

| Tier | Monthly | Annual (2 mo free) | What's included |
|---|---|---|---|
| Free | $0 | — | Manual portfolio entry, core X-Ray, basic Policy Score. **Free-tier cap TBD** (see open questions). Zero marginal cost to us. |
| Plus | **$4.99** | **$49/yr** | Manual entry, full Policy Score history, IPS cockpit, thesis tracking, goals. |
| Pro | **$9.99** | **$99/yr** | Everything in Plus **+ SnapTrade brokerage auto-sync**, unlimited accounts. |

### The margin math (why $9.99 for Pro, not $6.99)
The brokerage tier carries a real ~$2/mo SnapTrade cost on top of Apple's 15%:

| Tier | Price | −Apple 15% | −SnapTrade | **Your net** |
|---|---|---|---|---|
| ~~Plus $3.99~~ | 3.99 | 3.39 | — | $3.39 |
| ~~Pro $6.99~~ | 6.99 | 5.94 | −2.00 | $3.94 ← only $0.55 over manual |
| **Plus $4.99** | 4.99 | 4.24 | — | **$4.24** |
| **Pro $9.99** | 9.99 | 8.49 | −2.00 | **$6.49** ← upgrade actually pays you |

At $9.99 the brokerage tier nets ~$6.49 — healthy, still under Qualtrim, and the
"connect your brokerage" upgrade trigger is obvious. Free tier is manual-entry
only, so free users never touch the SnapTrade budget.

### Annual plans
10× monthly ("2 months free"): **Plus $49/yr, Pro $99/yr**. Improves cash flow +
retention; Apple's cut stays 15%.

---

## Aerarium Research (web)

| Tier | Monthly | Annual (2 mo free) | What's included |
|---|---|---|---|
| Free | $0 | — | Logged-out, crawlable **overview wedge**: per-ticker partial data + one chart + description. The discovery engine — must stay public. |
| Starter | **$5** | **$50/yr** | Full charts/history, screener, all data views. **No** AI, **no** portfolio tab, **no** brokerage. (Must have real teeth — see below.) |
| Full | **$10** → $12+ w/ traction | **$100/yr** | Everything **+ AI analysis + portfolio tab + SnapTrade brokerage**. |

### The one risk: the $5 tier must feel like "the real tool"
If $5 is just "free with slightly less crippling," nobody upgrades to it. The
free→$5 jump has to unlock the actual product — the full interactive chart
builder, complete history, the screener across all 528 companies. Gate only AI,
portfolio, and brokerage above it. Then $5→$10 is "add the AI + your portfolio."

### Qualtrim anchor
Your **$10 Full** sits right at Qualtrim's $10 — but you give a free tier *and* a
$5 entry they don't. That's the undercut: more accessible price ladder, same
ceiling. When traction proves the value, the Full tier can move to $12–15.

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
   **Founder/early-bird = founder price locked for the user's first year, then
   rolls to standard** (decided). Frame as "founding member — your first year at
   founder pricing."
4. **Post-traction:** raise Research Full toward $12–15; introduce unified Pro
   after SSO.

## Decisions locked (2026-05-30)
- **App:** Free / $4.99 Plus ($49/yr) / $9.99 Pro ($99/yr, brokerage).
- **Annual depth:** 10× monthly (2 months free) across the board.
- **Founder offer:** first year at founder price, then standard (not lifetime).

## Still open
- **App free-tier cap:** how much to limit it (e.g. 1 account vs unlimited manual)
  — defer until features are closer to done. Leaning "1 account + core features"
  so multiple accounts/full history become the upgrade reason.
- **Research $5 tier feature line:** exactly which views are in $5 vs the $10 tier
  (must give $5 real teeth — full charts/history/screener — gating only AI +
  portfolio + brokerage above it).
