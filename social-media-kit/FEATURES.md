# Feature → Problem Map (source of truth for landing + social copy)

From the project brain (2026-05-31). These are the **feature → the worry it
answers** pairs — the Luffu format. Use them for landing sections, captions, App
Store copy, and SEO pages. Each maps to a question from the landing "Questions
worth asking" section.

---

## Aerarium Portfolio (iOS) — "Guardrails, not handholding"

Brand line candidates from the brain: **"Guardrails, not handholding"** ·
**"a compliance officer in your pocket"** · acts as an automated compliance
officer, not a trading platform or robo-advisor.

| # | Feature | The problem it solves | Answers the question |
|---|---|---|---|
| 1 | **Policy Score (0–100)** — composite of 6 weighted dimensions: allocation drift, concentration risk, cash runway, goal alignment, speculative compliance, review cadence | Apps obsess over returns (uncontrollable). Policy Score gamifies *discipline* — a metric you can actually optimize. | "Am I still following my own plan?" |
| 2 | **Automated IPS compliance + Trade Checker** — monitors position caps, sector limits, liquidity floors, restricted assets; simulates a hypothetical trade's compliance impact before you execute | Retail investors manage reactively or via error-prone spreadsheets. A "compliance officer in your pocket" stops violations *before* the trade. | "Am I too concentrated?" |
| 3 | **Privacy-flexible sync (SnapTrade OR CSV)** — auto-sync via SnapTrade OAuth (never sees credentials), OR upload a standardized CSV. | Apps force you to surrender brokerage logins. Dual path serves "convenience-first" (auto) AND "privacy-maxi" (CSV, no creds in cloud). | (trust objection) |
| 4 | **Zero-knowledge client-side encryption** — AES-256-GCM via Apple CryptoKit; 16 sensitive columns across 12 tables; keys in iCloud Keychain; encrypted before leaving the device | Removes fear of a SaaS data breach — even the developer can't read your portfolio. | (trust objection) |
| 5 | **Portfolio X-Ray (ETF look-through)** — decomposes ETFs/funds (SPY, QQQ) into underlying constituents for true economic exposure | Hidden concentration: you unknowingly hold huge single-name exposure (AAPL, NVDA) across funds + accounts. | "How much of one stock do I really own?" / "What's hiding inside my ETFs?" |
| 6 | **Immutable IPS versioning + discipline log** — every rule change = new immutable version with a visual diff; attach a thesis to any position + chronological check-ins | Prevents historical revisionism + emotional investing; turns tracking into a living investment journal. | "Why did I buy this again?" / "Did I drift from my goals?" |

> NOTE: the brain calls the free path **CSV upload** (a deliberate privacy
> feature), not "manual entry." This is a *better* free-tier story than a
> crippled tier — see PRICING.md.

---

## Aerarium Research (web) — institutional analytics from SEC primary sources

Positioning from the brain: **institutional-grade analytics built directly from
SEC EDGAR primary sources — a replacement for the $24k/yr Bloomberg terminal and
$39–79/mo services like fiscal.ai.** This price anchor is a weapon: it reframes
the $10 tier from "cheap" to "institutional data for 0.04% of a Bloomberg."

| # | Feature | The problem it solves |
|---|---|---|
| 1 | **Institutional financials w/ exact provenance** — 14 charts × 24 metrics from 48.7M+ filing-level XBRL facts; every datapoint audit-trails to its SEC filing; raw-vs-derived toggle | Distrust of black-box data (Yahoo etc. flatten/miscalculate). Every number is auditable to the primary source. |
| 2 | **Revenue segments & breakdowns** — auto XBRL segment discovery → stacked bars by product/segment/geography (e.g. iPhone vs Mac vs Services) | Tedious to dig 10-K/10-Q for business drivers. Extracts + visualizes dimensional data instantly. |
| 3 | **Macro Dashboard (Market Nerve Center)** — Treasury yield curve w/ overlays, Fed Funds (ZQ) futures curve, mortgage rates + spreads, commodities grid | Fragmented macro: stops the jumping between FRED, futures exchanges, news. Market-priced rate paths in one view. |
| 4 | **Real-time market intelligence feeds** — news marquee (yields/DXY/CPI), Walter Bloomberg breaking news, Truth Social policy feed, analyst upgrade/downgrade feed | Delayed reaction to market-moving news — streams critical events in. |
| 5 | **Alternative data** — short interest, FTDs, daily short volume, 13D/G activists, Form 4 insider trends (cumulative buys vs sells) | Scattered signals across FINRA/SEC/Ortex — aggregated into Trading + Ownership tabs with warning chips. |
| 6 | **"Fast-lane" earnings** — twice-daily pipeline parses 8-K press releases for same-day EPS/revenue actuals + surprise % | Standard platforms wait weeks for the 10-Q/10-K; this captures actuals on earnings day. |
| 7 | **"Smart money" 13F overlap** — 47+ funds/ETFs, stock overlap heatmap, recent QoQ moves, "Also Held By" badges | Opaque institutional activity (usually needs WhaleWisdom etc.) — track smart-money conviction at a glance. |
| 8 | **Stock screener + chart builder** — client-side screener w/ 20 metrics; overlay metrics, common-size (% of revenue), compare up to 4 companies | Competitors paywall screening/charting at $40–80/mo — fast, shareable discovery. |

---

## How to use this on the landing page
- The landing **feature sections** should each pick ONE feature, lead with the
  *problem/question*, then show the feature answering it (Luffu format).
- The **price anchors** (Bloomberg $24k/yr; fiscal.ai $39–79/mo) belong in the
  Research section and pricing comms.
- "Guardrails, not handholding" / "compliance officer in your pocket" is the
  Portfolio section's spine.
