# Outlier-Inspired Redesign Way Forward

Date: 2026-05-28
Branch: `feat/outlier-inspired-landing`

This plan translates the Firecrawl reference-site research and Gemini critique
into the next landing-page prototype direction.

## Core Positioning

Aerarium should not lead as a generic portfolio tracker, robo-advisor, research
terminal, or trading app.

The primary positioning:

> Aerarium is the discipline layer between market research and your real
> portfolio.

The product moat:

> Aerarium closes the loop between the rules you wrote and the portfolio you
> actually own.

Supporting explanation:

Most tools show balances, holdings, charts, or research. Aerarium connects the
written policy, read-only brokerage data, ETF look-through exposure, goals,
thesis notes, and Policy Score into one system that can tell the user when their
real portfolio has drifted from their own rules.

## Hero Direction

Use the spreadsheet/memory burden as the first emotional hook.

Working headline:

> Stop running your portfolio from memory and spreadsheets.

Working subheadline:

> Aerarium turns your investment policy, brokerage accounts, fund exposure,
> goals, and thesis notes into a private cockpit that keeps your rules visible
> and your true exposure tracked.

Why this works:

- It is concrete and user-recognizable.
- It avoids overclaiming advice or automation.
- It clearly separates Aerarium from trading-first apps.
- It sets up Portfolio X-Ray and Policy Score as natural proof points.

Avoid:

- "All-in-one portfolio platform" because it sounds generic.
- "Automated investing" because it implies robo-advice.
- "Terminal" for the Research product because it overstates the surface.

## Flagship Proof Point

Lead with the "NVDA overlap" moment.

Narrative:

> The spreadsheet breaks when exposure is hidden inside funds and scattered
> across accounts. If the user owns SPY, QQQ, and NVDA directly in different
> accounts, they need one answer: how much NVDA do I actually own?

This should become the first product proof after the hero, not a minor feature
card.

Suggested visual:

- Left side: a compact "spreadsheet/memory" mess with SPY, QQQ, NVDA across
  taxable and retirement accounts.
- Right side: Aerarium Portfolio X-Ray showing direct plus through-funds
  exposure.
- Copy: "SPY + QQQ + direct NVDA become one exposure view."

## Page Architecture

### 1. Burden Hero

- New headline and subheadline above.
- CTAs:
  - Join iOS Beta
  - Get founder launch updates
  - Open Research as secondary
- Trust chips:
  - Read-only sync
  - No trades placed
  - ETF look-through
  - Policy Score
  - Free during beta

### 2. Founder/NVDA Story Bridge

Move the founder story near the top, immediately after the hero.

Draft:

> I built Aerarium because my own investing system kept outgrowing spreadsheets.
> As a CFA charterholder, I knew the rules I wanted to follow. I tracked
> accounts manually, wrote down why I bought things, and watched allocation. But
> when I owned SPY, QQQ, and NVDA across retirement and taxable accounts, the
> spreadsheet stopped answering the question that mattered: how much NVDA
> exposure do I actually have?
>
> Aerarium started there: a private discipline layer for investors who want
> policy, exposure, goals, and thesis notes tracked in one place.
>
> -- Vedang, CFA charterholder and solo founder

### 3. Guided Portfolio Cockpit

Replace the generic feature-grid feel with a chaptered product tour.

Chapters:

1. Understand your portfolio fast.
2. See through your ETFs.
3. Know if you are breaking your own rules.
4. Assign assets to goals.
5. Remember why you bought.
6. Keep private data private.

Mechanic:

- On desktop, use a fixed or anchored iPhone product object with chapter text
  changing beside it.
- On mobile, avoid hard snap behavior that hides the full phone. Use softer
  in-section reveal and allow the user to inspect the screenshot without being
  bounced to a text block.

### 4. Policy Score as the System Proof

Policy Score should be positioned as the "score of whether your portfolio still
matches your rules."

Copy direction:

> Most apps tell you what changed. Aerarium tells you whether the change broke
> your policy.

Show:

- Score.
- Top score drivers.
- One policy violation.
- "No trading. Monitoring only."

### 5. Research as the Public Data Room

Research should not be framed as a "terminal." It is a source-first research
workspace.

Use the new screenshot captures:

- `docs/research/screenshots/research-funds.png`
- `docs/research/screenshots/research-macro.png`
- `docs/research/screenshots/research-aapl.png`
- `docs/research/screenshots/research-nvda.png`
- `docs/research/screenshots/research-earnings.png`

Recommended structure:

- Browser-style product frame.
- Chapter selector similar to the iPhone tour:
  - Fund overlap
  - Macro dashboard
  - Company financials
  - Ownership and insider activity
  - Earnings calendar
- Copy:
  > Research gives you the market context. Portfolio keeps the decision aligned
  > with your policy.

### 6. Security You Can Verify

Security must remain a first-class section, not a footer item.

Cards:

- Read-only brokerage sync.
- Aerarium never places trades.
- Encrypted sensitive fields.
- Export and delete controls.
- Separate private portfolio data from public market research.

Tone:

- Calm and specific.
- No fake social proof.
- No vague "bank-grade" claims unless there is implementation evidence behind
  the claim.

### 7. Founder Launch List

Keep the public UI simple.

Message:

- Free during beta.
- Founder launch list gets App Store launch updates and founder pricing notes.
- Referral tracking can exist behind the scenes, but do not foreground reward
  mechanics yet.

## Visual Direction

Move away from a loud cyber/terminal feel.

Keep:

- Dark premium base.
- Green as a disciplined financial signal.
- Real product screenshots.
- Motion/reveal on scroll.

Reduce:

- Excess grid/glow density.
- Neon/cyber treatment.
- Any visual language that resembles crypto or day-trading products.

Explore:

- "Private library / investment policy room" tone.
- Warmer graphite, dark green, and muted paper tones.
- More editorial section rhythm inspired by Luffu.
- More anchored product choreography inspired by Poly.

## Implementation Sequence

1. Build a local redesign prototype on `feat/outlier-inspired-landing`.
2. Start with hero + founder/NVDA bridge + X-Ray proof scene.
3. Replace the current feature-grid surface with a guided portfolio cockpit.
4. Rebuild the Research section with the new screenshot assets.
5. Tighten security/founder launch list sections.
6. Run desktop/mobile visual QA.
7. Only after approval, deploy a Vercel branch preview or point
   `development.aerarium.app` to the branch.
8. Keep `main` and production `aerarium.app` unchanged until the branch is
   approved.

## Open Decision

Recommended next step:

Build the first prototype around the spreadsheet/NVDA overlap story. If that
scene works, the rest of the page has a clear emotional and product spine.

## Prototype Status

2026-05-28 implementation pass:

- Hero copy now leads with the spreadsheet and memory burden.
- Added a founder/X-Ray bridge near the top of the page:
  - left side shows the spreadsheet-memory problem across accounts;
  - right side shows Aerarium X-Ray combining direct plus fund-derived NVDA
    exposure;
  - bottom rail shows the relief sequence: write the rule, connect holdings,
    look through funds, score the drift.
- Portfolio section now opens with Policy Score as the system proof before the
  feature chapters.
- Visual tone was pulled slightly away from neon/cyber by reducing global glow
  opacity and using warmer graphite/green proof surfaces.

Verification:

- `npm run lint`
- `npm test`
- `npm run build`

Next design refinement:

- Continue closing the gap with the reference sites by improving scroll rhythm,
  staged section reveals, and mobile product-frame inspection before this branch
  is promoted to a preview deployment.
