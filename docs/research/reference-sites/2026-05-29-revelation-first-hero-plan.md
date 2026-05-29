# Revelation-First Landing Page Plan

Date: 2026-05-29
Branch: `feat/outlier-inspired-landing`

This plan captures the next messaging and visual refinement pass after the
outlier-inspired prototype. The technical structure is close, but the first
five seconds should lead with the product revelation rather than the founder
story or a general spreadsheet complaint.

## Core Shift

Move the landing page from:

> Spreadsheets are annoying, and Aerarium is a better cockpit.

to:

> Aerarium finds portfolio exposure your spreadsheet missed.

The strongest working hook:

> You thought you owned 8% NVDA. You actually own 18.7%.

Why this is stronger:

- It creates an immediate "wait, that could be me" moment.
- It proves the Portfolio X-Ray value before explaining the broader system.
- It gives sophisticated investors a concrete reason to care.
- It makes the founder/spreadsheet story support the product proof instead of
  leading the page.

## Positioning Spine

Aerarium is the discipline layer that connects:

- what the investor believes they own;
- what they actually own through accounts, stocks, ETFs, and funds;
- the rules they wrote in their IPS;
- the policy score that tells them when reality has drifted from those rules.

The emotional hook is not "tracking is tedious." The hook is:

> Your exposure can be wrong even when your spreadsheet is up to date.

## Hero Plan

### Hero Message

Recommended primary headline options:

1. `You thought you owned 8% NVDA. You actually own 18.7%.`
2. `Your portfolio has hidden exposure. Aerarium finds it.`
3. `See what you actually own before concentration risk builds up.`

Recommended subheadline:

> Aerarium looks through ETFs and accounts, then ties the real exposure back to
> your investment policy, goals, and score.

### Hero Surface

Use the real Portfolio X-Ray screenshot as the proof object.

Required screenshot:

- `src/assets/ss1.png`

Why:

- It shows direct holdings and through-fund exposure in one place.
- It is the most concrete and differentiated iOS proof point.
- It makes the "hidden exposure" claim visually defensible.

The current founder/NVDA bridge can stay on the page, but it should be moved
below the revelation hero and framed as origin/trust context.

### Hero CTAs

Reduce CTA competition above the fold.

Primary:

- `Join iOS Beta`

Secondary:

- `Open Research`

Avoid repeating multiple beta and waitlist CTAs in the hero. The founder launch
list can stay later in the page.

### Proof Chips

Use fewer chips above the fold.

Recommended:

- `ETF look-through`
- `Read-only sync`
- `Policy Score`

Move extra trust claims into the security section.

## Visual Direction

Keep the strong parts of the current branch:

- Real product screenshots.
- Scroll-driven product tour.
- Research screenshots in a sticky browser frame.
- Calm dark institutional base.
- Luffu/Poly-inspired section rhythm.

Reduce:

- Cyber-grid density.
- Decorative mono labels that do not represent data.
- Glow/orb effects that make the page feel like a generic AI or crypto product.
- Above-the-fold proof density.

Improve:

- Larger hero type.
- More air around the first message.
- Warmer graphite/green tone.
- Body text at or above 16px on mobile.
- Clear focus-visible states for interactive controls.

## Founder Story Placement

The founder story remains valuable, but it should support the proof point.

New role:

> After the visitor understands the hidden-exposure problem, explain why the
> product was built by a CFA charterholder who had the same problem.

Recommended placement:

1. Hero revelation.
2. Product proof with X-Ray screenshot.
3. Short founder origin note.
4. Guided product tour.

Recommended founder section headline:

> The spreadsheet stopped answering the real question.

Recommended body:

> I built Aerarium because my own investing system kept outgrowing spreadsheets.
> As a CFA charterholder, I knew the rules I wanted to follow. But when SPY,
> QQQ, and NVDA lived across retirement and taxable accounts, the spreadsheet
> stopped answering the question that mattered: how much NVDA exposure do I
> actually have?
>
> -- Vedang, CFA charterholder and solo founder

## Product Tour Plan

Keep the scroll-driven Poly-style tour, but make sure each screen matches the
benefit copy.

Critical mappings:

- `See Through Your ETFs` must use `src/assets/ss1.png`.
- `Stop Drifting From Your Plan` should show IPS or policy-score context.
- `Know Portfolio Health at a Glance` should show the score sheet or dashboard.
- `Assign Assets to Goals` should show the funding-plan/goals view.
- `Never Forget Why You Bought` should show thesis or trade-checker flow.

The tour should let the final screen linger before releasing into the next
section. Mobile should allow the visitor to inspect the full phone frame rather
than being bounced immediately to the next snap point.

## Research Section Plan

Research should remain the second pillar, but the visual hierarchy should make
Portfolio the main launch conversion surface.

Research copy:

> Research gives you source-first market context. Portfolio keeps the decision
> aligned with your policy.

Use larger, clearer screenshots from the rebranded Research app:

- Fund overlap heatmap.
- Macro dashboard.
- Company financials and segment charts.
- Ownership and insider/alternative data.
- Earnings calendar.

Do not call Research a "terminal" in primary copy. "Workspace" is more
accurate.

## Security And Trust

Security should stay explicit and concrete.

Claims to keep:

- Read-only brokerage sync.
- Aerarium never places trades.
- Encrypted sensitive fields.
- Export and delete controls.
- Portfolio data and public-market research remain separate surfaces.

Avoid:

- Fake social proof.
- "Bank-grade" language unless backed by precise implementation details.
- Overly defensive copy.

## Implementation Sequence

1. Preserve the current branch and preview as the baseline.
2. Refactor the hero to lead with the hidden-exposure revelation.
3. Move founder story below the hero proof.
4. Reduce hero CTAs and proof chips.
5. Tighten typography and remove decorative mono where it weakens the premium
   feel.
6. Reduce cyber-grid/glow intensity.
7. Verify feature-to-screenshot mapping, especially X-Ray.
8. Run desktop and mobile QA for scroll rhythm and product-frame inspection.
9. Ask Gemini and Claude for critique before promoting to production.

## Acceptance Criteria

The next pass is successful when:

- A new visitor understands the hidden-exposure value in five seconds.
- The first major visual is a real product proof, not a generic mockup.
- The page feels calmer and more premium without losing product substance.
- The founder story adds trust without stealing the hero.
- Mobile users can inspect the phone/product screenshots without scroll-snap
  fighting them.
- The Research section supports the brand umbrella without competing with the
  iOS beta CTA.

## Non-Goals

- Do not merge the landing, iOS, and Research repos.
- Do not replace Research with static marketing only; it should remain linked as
  the live public workspace.
- Do not add unverified testimonials or fake user counts.
- Do not define final monetization here; keep "free during beta" and founder
  launch pricing language until monetization is ready.

## Implementation Notes

2026-05-29 first pass:

- Hero copy now leads with the hidden-exposure revelation:
  `You thought you owned 8% NVDA. You actually owned 18.7%.`
- The hero visual now uses the real Portfolio X-Ray holdings screenshot
  (`src/assets/ss1.png`) as the flagship product proof.
- The hero proof chips were reduced to the three most relevant claims:
  ETF look-through, read-only sync, and Policy Score.
- `Open Research` was demoted to a quiet secondary link so the iOS beta remains
  the primary conversion path.
- The former founder/NVDA bridge was rewritten as a quieter origin and trust
  section, so the first proof point is the product revelation rather than the
  founder narrative.
- The founder section now explains the closed loop across exposure, policy, and
  discipline without repeating the same phone screenshot from the hero.
