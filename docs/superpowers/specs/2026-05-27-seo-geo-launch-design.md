# Aerarium SEO/GEO Launch Design

Date: 2026-05-27
Status: Queued after landing-page creative polish
Repo: aerarium-landing

## Goal

Make Aerarium discoverable through Google, AI/LLM answer surfaces, social sharing, and product-led research traffic without turning the launch page into a noisy keyword page.

The brand architecture is:

- `aerarium.app`: brand umbrella, conversion hub, founder launch list, TestFlight CTA, trust/security story, and product education for Aerarium Portfolio and Aerarium Research.
- Aerarium Portfolio iOS app: primary product and monetization destination. This is where users activate the private portfolio discipline workflow: brokerage sync, IPS, Policy Score, Portfolio X-Ray, goals/funding, thesis check-ins, and privacy controls.
- `research.aerarium.app`: public research product and organic traffic engine through indexable data, explainers, and source-first market views.
- `aerariumapp.com`: redirect-only secondary domain that should consolidate into `aerarium.app`.

The landing page is not the app. It should make the app feel real, trustworthy, and worth installing, while also routing curious users into Research.

The intended funnel is:

```text
Google / AI search / social / Research route
  -> aerarium.app
  -> TestFlight, App Store, or founder launch list
  -> Aerarium Portfolio iOS app activation
```

Research can also route visitors directly back to the app story:

```text
research.aerarium.app public data page
  -> contextual Portfolio CTA
  -> aerarium.app
  -> iOS app install or launch list
```

## Positioning

Aerarium is not a brokerage, robo-advisor, or trading app. The SEO language should emphasize discipline, visibility, source-first research, and user-controlled data.

Core phrases to own:

- investment policy statement app
- IPS portfolio app
- portfolio policy score
- ETF look-through exposure
- portfolio X-Ray
- goals-based portfolio funding
- investment thesis tracker
- 13F overlap heatmap
- macro dashboard
- Fed funds curve
- revenue segment charts

Avoid:

- guaranteed returns
- beat the market
- AI stock picks
- best stocks to buy
- get rich language
- fake social proof or inflated user counts

## Design Principles

1. Keep `aerarium.app` conversion-first.
   The landing page should tell the story quickly, prove the product is real through screenshots, and route visitors to TestFlight, Research, or the founder launch list.

2. Use Research as the content engine.
   `research.aerarium.app` has the stronger long-tail search surface because it can answer specific market-data queries with real pages.

3. Build for humans first, then crawlers.
   Every searchable page needs useful visible text, screenshots/charts, clear headings, and a direct CTA. Structured data should describe visible content only.

4. Treat AI-search optimization as disciplined SEO.
   LLMs need clear entity pages, definitions, FAQs, source methodology, and crawlable text. `llms.txt` is useful as an emerging convention, but it is not a substitute for good content.

5. Do not let SEO flatten the landing-page personality.
   The page still needs launch energy and visual “spark.” SEO work should reinforce the product story, not replace it with generic keyword blocks.

## Current Conversation Capture

The current product decision is to handle SEO as a planned pass, but pause implementation until the landing page itself feels stronger.

Decisions captured so far:

- Use `aerarium.app` for the brand umbrella.
- Keep Aerarium Portfolio as the iOS app and primary conversion destination.
- Use `research.aerarium.app` for the Research web product.
- Use Research as the public, indexable traffic engine where appropriate.
- Redirect `aerariumapp.com` to `aerarium.app` unless the domain strategy changes later.
- Keep the social media kit direction and expand it into launch assets, UTMs, and a campaign calendar.
- Do not implement SEO before the landing-page creative direction is revisited.
- The next landing-page design pass should look at outside web references and ask whether the current page has enough premium launch energy.

## Scope

### Phase 1: Technical SEO Foundation

Add foundational search and sharing artifacts to `aerarium.app`:

- canonical URL for `https://aerarium.app/`
- Open Graph metadata
- Twitter card metadata
- favicon and Apple touch icon confirmation
- social preview image using the strongest product composite
- `robots.txt`
- `sitemap.xml`
- JSON-LD for:
  - `Organization`
  - `SoftwareApplication` for Aerarium Portfolio
  - `WebApplication` for Aerarium Research
- `llms.txt` with a factual brand and product summary
- noindex protection for admin-only surfaces such as `/admin/waitlist`

Vercel/domain setup:

- `aerarium.app` is canonical.
- `www.aerarium.app` redirects to `aerarium.app`.
- `aerariumapp.com` redirects to `aerarium.app`.
- `research.aerarium.app` remains the Research product.

### Phase 2: Landing-Site Content Pages

Add a small set of high-quality static content pages under `aerarium.app`.

Recommended first pages:

- `/methodology`: Aerarium philosophy, IPS discipline, why the product exists, founder/CFA context.
- `/security`: read-only sync, no trading, encrypted sensitive fields, export/delete controls.
- `/portfolio-x-ray`: ETF look-through and true exposure.
- `/policy-score`: what the score means and how it is calculated at a high level.
- `/investment-policy-statement-app`: IPS creation, versioning, and review cadence.
- `/goals-funding-plan`: central goal sleeve assignment and funding visibility.
- `/investment-thesis-tracker`: thesis capture, review loop, and decision hygiene.

Each page should include:

- one primary keyword theme
- concise page title and meta description
- product screenshot or visual proof
- plain-English problem statement
- feature explanation
- who it is for
- what Aerarium does not do
- 3-5 FAQs where genuinely useful
- CTA to TestFlight, Research, or founder list

### Phase 3: Research Public Route Planning

Plan public, crawlable Research routes as the product-led growth surface.

Priority route families:

- `/funds/overlap-heatmap`
- `/macro`
- `/macro/fed-funds-curve`
- `/stocks/:ticker/revenue-segments`
- `/stocks/:ticker/financial-charts`
- `/stocks/:ticker/ownership-insiders`
- `/earnings`

Each Research page should expose enough public content to be useful without requiring login. The page should have a clear Research CTA and, where appropriate, a Portfolio CTA:

> Analyze how this exposure shows up in your own portfolio with Aerarium Portfolio.

Research pages should avoid thin generated content. If a page is mostly empty, stale, or missing data, it should not be submitted for indexing.

### Phase 4: Social Media Kit Expansion

Use the current `social-media-kit` as the launch asset base, then make it operational.

Current kit:

- 7 Portfolio screenshots and captions
- 7 Research screenshots and captions

Add:

- UTM-tagged links for each campaign, platform, and feature
- caption variants for LinkedIn, X, Instagram, and Reddit
- a campaign calendar
- generated OG/social preview images for each content page
- short video/script prompts for screen recordings
- a `CAPTIONS.csv` or similar table for easier scheduling

Campaign structure:

- Week 1: portfolio discipline and drift pain
- Week 2: ETF look-through and portfolio X-Ray
- Week 3: Research proof points: 13F, macro, revenue segments
- Week 4: founder list, TestFlight, App Store launch target

## LLM/GEO Strategy

The goal is to make Aerarium easy for AI systems to understand, summarize, and cite accurately.

Add:

- `/llms.txt`: concise Markdown entity file with product definitions and canonical links.
- `/methodology`: authoritative explanation of the product philosophy.
- `/security`: clear trust and data-handling claims.
- FAQ sections on feature pages.
- source methodology pages for Research where data provenance matters.

Key definitions should be consistent across all pages:

- Aerarium Portfolio: iOS app for private portfolio discipline and policy monitoring.
- Aerarium Research: web workspace for source-first public market research.
- Policy Score: transparent portfolio health score based on drift, concentration, liquidity, goals, and review cadence.
- Portfolio X-Ray: look-through view of direct and fund-derived exposure.
- IPS Cockpit: policy control room for rules, versions, reviews, and exceptions.

## Social And Search Measurement

Track:

- landing page visits
- TestFlight clicks
- Research outbound clicks
- founder list signups
- referral codes
- campaign UTMs
- feature-page conversion rates
- Research route entrances

UTM naming convention:

- `utm_source`: instagram, linkedin, x, reddit, direct_share
- `utm_medium`: social, profile, founder_post, launch_post
- `utm_campaign`: beta_launch, app_store_launch, research_launch
- `utm_content`: feature slug such as `portfolio_xray`, `policy_score`, `funds_heatmap`

## Risks

- Single-page SPA ceiling: the current landing page alone will not rank for many meaningful keywords.
- YMYL scrutiny: financial content should be sober, sourced, and not framed as advice.
- Duplicate domain risk: `.com` and `.app` must not serve duplicate independent copies.
- Thin content risk: do not create many pages before they have useful visible content.
- AI crawler hype risk: `llms.txt` is worth adding, but it should be treated as experimental.
- Social proof risk: do not claim user counts, testimonials, or traction unless verified.

## Non-Goals

- No paid ads plan in this sprint.
- No fake testimonial generation.
- No investment advice content.
- No programmatic ticker SEO until Research public routes are stable.
- No merging of landing, iOS app, and Research repos.
- No immediate SEO implementation before the landing page creative pass is approved.

## Acceptance Criteria

The SEO/GEO launch work is successful when:

- `aerarium.app` has correct canonical metadata, social cards, sitemap, robots, structured data, and `llms.txt`.
- `aerariumapp.com` redirects to `aerarium.app`.
- Search Console and Bing Webmaster Tools can submit and inspect the site.
- The first content pages are crawlable and useful without JavaScript-only hidden content.
- The social kit includes UTM-tagged captions and a reusable launch calendar.
- Research public-route plan is documented clearly enough for a separate implementation pass.

## Recommended Next Step

After the landing-page creative direction is revisited, create an implementation plan with four workstreams:

1. Landing technical SEO artifacts.
2. Landing content page structure and copy.
3. Social kit automation and UTM expansion.
4. Research public-route SEO plan for the Research repo.
