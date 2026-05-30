# Outlier Landing Page Inspiration

Date: 2026-05-28
Branch: `feat/outlier-inspired-landing`

This research pass uses Firecrawl scrape outputs from four reference sites the
founder selected as design inspiration:

- `firecrawl/luffu.json`
- `firecrawl/poly.json`
- `firecrawl/fluz.json`
- `firecrawl/isomeet.json`

The goal is not to copy these pages. The goal is to extract the page mechanics
that can make Aerarium feel more cinematic, credible, and memorable while
preserving the calm institutional tone.

## Reference Ranking

1. Luffu
   - Strongest emotional arc.
   - Leads with user burden before explaining product mechanics.
   - Best lesson for Aerarium: make the page about reducing the mental load of
     investing discipline, not about listing features.

2. Poly
   - Strongest immersive product-tour mechanics.
   - Uses a product object and chaptered interactions to make the product feel
     alive.
   - Best lesson for Aerarium: keep the real screenshots, but stage them as a
     guided cockpit rather than a static carousel.

3. Fluz
   - Strongest finance trust and ecosystem structure.
   - Uses explicit security, regulated infrastructure, legal, privacy, and trust
     center cues.
   - Best lesson for Aerarium: make read-only sync, no trading, encrypted fields,
     export, and delete controls visible trust primitives.

4. ISO Meet
   - Clean early-access funnel and audience segmentation.
   - Best lesson for Aerarium: early access can feel concrete when the CTA has a
     clear promise and the page explains who the product is for.

## Recommended Blend

Use a `70 / 25 / 5` blend:

- 70% Luffu: emotional burden-to-relief narrative.
- 25% Poly: interactive product choreography.
- 5% Fluz/ISO Meet: trust, segmentation, and launch-list mechanics.

## Stronger Hero Direction

Current strategic direction:

> Your investing rules should not live in your head or a manually updated Excel
> spreadsheet. They should be tracked automatically.

Cleaner hero options to test:

1. Your investing rules should not live in your head.
   Aerarium turns your policy, accounts, fund exposure, and thesis notes into a
   private cockpit that keeps watch for you.

2. Stop running your portfolio from memory and spreadsheets.
   Build an investment policy, connect accounts read-only, and see when your
   actual exposure drifts from the rules you wrote.

3. Your portfolio needs rules that update themselves.
   Aerarium tracks your policy, ETF look-through exposure, goals, and thesis
   check-ins so you can invest with discipline instead of spreadsheet upkeep.

Preferred direction:

> Stop running your portfolio from memory and spreadsheets.
>
> Aerarium turns your investment policy, brokerage accounts, ETF exposure, goals,
> and thesis notes into a private cockpit that keeps your rules visible.

This keeps the spreadsheet pain point, avoids overclaiming full automation, and
positions Aerarium as a discipline cockpit rather than a trading app or
robo-advisor.

## Product Moat

The moat is not one isolated feature. It is the closed loop between:

- Written investment policy.
- Read-only live holdings.
- ETF look-through exposure.
- Cross-account aggregation.
- Policy score and compliance drivers.
- Goals and funding plan.
- Thesis check-ins.
- Research context.

Most tools show a portfolio. Some tools show research. Aerarium connects the
decision, the rule, the live holding, the hidden exposure inside funds, and the
follow-up check-in.

Plain-language moat:

> Aerarium is the discipline layer between market research and your real
> portfolio.

More explicit version:

> Aerarium does what spreadsheets cannot do cleanly: it keeps your policy,
> accounts, funds, exposure, goals, and thesis notes in one live system.

Feature moat copy:

- **See through funds:** SPY, QQQ, VTI, and direct stock positions roll into one
  exposure view, so the user can see true exposure to names like NVDA across
  retirement, taxable, and cash accounts.
- **Rules connected to reality:** IPS guardrails are not static notes; they feed
  the Policy Score and highlight drift.
- **Research before action:** Aerarium Research helps users understand companies,
  funds, macro, and ownership before decisions become holdings.
- **No trading-first incentives:** Aerarium monitors and explains. It does not
  push order flow, confetti, or impulse trading.

## Founder Story Draft

Draft copy:

> I built Aerarium because my own investing system kept outgrowing
> spreadsheets.
>
> As a CFA charterholder, I knew the rules I wanted to follow. I tracked my
> accounts manually, wrote down why I bought things, and watched my allocations.
> But the moment I owned SPY, QQQ, and NVDA across retirement and taxable
> accounts, the spreadsheet stopped answering the simple question that mattered:
> how much NVDA exposure do I actually have?
>
> Aerarium started from that frustration. It is a private discipline layer for
> investors who want their policy, exposure, goals, and thesis notes tracked in
> one place without turning investing into another trading feed.
>
> -- Vedang, CFA charterholder and solo founder

Shorter page version:

> I built Aerarium because my own investing system kept outgrowing spreadsheets.
> I could write rules and track accounts manually, but I still could not easily
> answer questions like: how much NVDA do I really own across SPY, QQQ, and
> direct shares in different accounts? Aerarium is the discipline layer I wanted:
> policy, exposure, goals, and thesis notes in one private cockpit.
>
> -- Vedang, CFA charterholder and solo founder

## New Page Architecture

1. Burden hero
   - Lead with the spreadsheet/head-memory problem.
   - CTA: Join iOS Beta / Get founder launch updates.
   - Secondary CTA: Open Research.

2. Guided cockpit scene
   - Keep the iPhone 17 Pro style product object.
   - Use feature chapters as the control surface.
   - Each chapter should show the problem solved, not just the feature name.

3. True exposure scene
   - Make Portfolio X-Ray the flagship proof point.
   - Show direct plus fund-derived exposure.
   - Explain ETF look-through simply: "SPY + QQQ + direct shares become one
     exposure view."

4. Policy enforcement scene
   - IPS + Policy Score + allocation drift.
   - Show why this is not just a dashboard.

5. Goals and thesis scene
   - Position as the behavior loop.
   - "What is this money for?" and "Why did I buy this?"

6. Research scene
   - Use larger, newer Aerarium Research screenshots.
   - Show heatmap, macro dashboard, company segments, ownership/insider views.
   - Research should feel like the public market data room feeding the private
     portfolio cockpit.

7. Security/founder scene
   - Read-only brokerage sync.
   - Aerarium never places trades.
   - Encrypted sensitive fields.
   - Export/delete controls.
   - Founder story.

8. Founder launch list
   - Clean email capture.
   - "Free during beta" and "Founder pricing notes" reassurance.

## What Not To Copy

- Do not copy Luffu's family-care emotional specifics.
- Do not copy Poly's louder playful/sci-fi visual density.
- Do not copy Fluz's candy-like decorative objects.
- Do not add fake social proof.
- Do not overstate automation. "Tracked automatically" is acceptable only when
  attached to connected holdings and policy monitoring, not investment advice.

## Open Creative Questions

- Should the next prototype be more cinematic and emotional, or more
  product-tour heavy?
- Should the hero lead with the spreadsheet pain directly, or make it a second
  line after a broader policy/discipline statement?
- Should the Research section become a desktop mockup carousel parallel to the
  iPhone tour?

## Gemini Review Status

First attempted Gemini review with:

```bash
gemini --model gemini-3.1-pro-preview
```

That command returned a quota exhaustion error.

Second review was run without the explicit model flag:

```bash
gemini -p "<landing redesign review prompt>"
```

Useful Gemini critique:

- The moat is not brokerage sync or ETF look-through alone. The moat is the
  closed loop between the written rule and live portfolio reality.
- Aerarium should be framed as a personal compliance layer: most tools tell the
  user what they have; Aerarium tells them whether they are breaking their own
  rules.
- Policy Score should become the primary proof metric, similar to a credit score
  for investment discipline.
- The hero should lead with the memory/spreadsheet burden.
- The CFA founder + NVDA-overlap story is strong enough to move near the top of
  the page instead of being buried in a generic founder section.
- The next prototype should reduce cyber/neon cues and shift toward a calmer
  wealth-management tone.
