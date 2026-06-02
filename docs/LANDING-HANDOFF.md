# Aerarium Landing Page — Handoff / Context Doc

Purpose: anyone (Codex, another Claude, a contractor) can read this and be
instantly up to speed on the landing-page redesign.

Last updated: 2026-06-01.

---

## TL;DR

`aerarium.app` is now a **two-product scrollytelling landing page**, calm and
airy like luffu.com / poly.app but on the **dark emerald** theme that matches the
real apps. It tells one story top-to-bottom:

> your worries → **the app answers them** (5 feature screens) → there's more →
> **the companies' worries** → **Research answers those** (5 web screens) → CTAs.

**Two products, color-coded:**
- 🟢 **Emerald = Aerarium Portfolio** — the iOS app (TestFlight beta).
- 🔵 **Cyan = Aerarium Research** — the web product (research.aerarium.app).

---

## Page architecture (current, top to bottom)

Assembled in `src/App.tsx`. Sections marked ✅ are the new calm redesign;
⚠️ marks the OLD dense sections still present but slated for removal.

| Section | Component | Notes |
|---|---|---|
| Navbar | `Navbar.tsx` | fixed; links scroll to sections |
| **Hero + Questions** | `HeroQuestionsScene.tsx` | ✅ pinned scene: hero dissolves → 6 "questions about your own money" reveal one-at-a-time. Hero has TWO CTAs: emerald **Get Early Access** (app) + cyan **Open Research** (web). |
| **1. X-Ray** "You own more than you think." | `HiddenExposureReveal.tsx` | ✅ answers "how concentrated am I?" |
| **2. Policy Score** "Always know if you're on plan." | `PolicyScoreSection.tsx` | ✅ "am I on plan?" |
| **3. Goals** "See a goal slip before it falls." | `GoalsSection.tsx` | ✅ "am I drifting from my goals?" |
| **4. Trade Checker** "Know before you break a rule." | `TradeCheckerSection.tsx` | ✅ "will this trade break my rules?" |
| **5. Thesis log** "Remember why you bought it." | `ThesisSection.tsx` | ✅ "why did I buy this again?" |
| **App CTA bridge** "…and so much more." | `CtaBridge.tsx` | ✅ TestFlight CTA + cyan "…only half of Aerarium ↓" lead-in into the web half |
| **Research intro** "Now ask the same of every company." | `ResearchQuestions.tsx` | ✅ pinned; 6 questions about the companies you research |
| **5 Research web screens** | `ResearchScreens.tsx` → `WebScreen.tsx` | ✅ Financials · Segments · Ownership · Smart-money 13F · Macro. Browser-frame, cyan accent. |
| **Research closing CTA** "Institutional depth, not institutional price." | `ResearchCloseCta.tsx` | ✅ Bloomberg $24k anchor + Open Research → research.aerarium.app |
| Launch status (countdown) | `CountdownTimer.tsx` (wrapped in App) | June 2026 target; kept |
| ⚠️ Product surfaces (2×2) | `AppSurfaceStrip.tsx` | **DUPLICATE — remove** (X-Ray etc. shown calm above) |
| ⚠️ Product proof (Portfolio tour + Research carousel + Security) | `FeatureGrid.tsx` | **DUPLICATE — remove Portfolio+Research; keep/extract Security** |
| Founder story | `FounderExposureBridge.tsx` | restyle to match calm aesthetic |
| Founder email list | `WaitlistPortal.tsx` | under review — may be redundant now |
| Footer | inline in `App.tsx` | brand, links, copyright |

The five app feature screens all use the shared **`CenterStageScreen.tsx`**; the
five web screens use **`WebScreen.tsx`**. Both share the reveal mechanism below.

---

## The pinned reveal mechanism (how the feature screens work)

Every feature screen + CTA is a **pinned, scroll-driven scene**, like the
questions scene:

- A tall track (`h-[250svh]`) wraps a `sticky top-0 h-[100svh]` frame with
  `pt-20` (clears the fixed navbar). `useScroll({ target, offset:["start
  start","end end"] })` gives `scrollYProgress`.
- The **eyebrow pill is the pinned anchor** (always visible). The other elements
  fade + lift in over their own slices of scroll via the shared
  **`useReveal(progress, [start,end])`** hook (`src/components/useReveal.ts`) —
  full-range keyframes so motion/react holds, doesn't extrapolate.
- The app (phone / browser frame) resolves in **last**, then a dwell before the
  scene releases.
- **`CenterStageScreen`** (app): pill → headline → graphic (left) → subheader
  (right) → phone (center). On mobile it stacks and the small graphic CROSS-FADES
  OUT as the phone fades in (a phone + graphic can't both fit one screen).
- **`WebScreen`** (web): pill → headline → subheader → browser frame. Frame is
  height-clamped + object-cover on desktop (fits one screen); full natural-aspect
  dashboard on mobile.
- Every component has a **reduced-motion fallback** (plain static section).

Global scroll-snap is removed (it fought the sticky scenes).

---

## Brand + positioning (do not change, just align to)

- ONE brand **Aerarium** (`aerarium.app`). Two products: **Portfolio** (iOS;
  emerald) and **Research** (web, research.aerarium.app; cyan).
- Portfolio spine: "Guardrails, not handholding" / "a compliance officer in your
  pocket." Not a trading app.
- Research spine: institutional analytics from SEC EDGAR primary sources — a
  replacement for a $24k/yr Bloomberg terminal (the price anchor closes the web
  section).
- Audience: long-term investors, beginner-inclusive up top, advanced/ticker
  specifics lower once engaged.

### Compliance (YMYL — hard rules)
Never imply advice/returns. The NVDA 8% → 18.7% figure and the Trade-Checker
breach are labeled ILLUSTRATIVE examples. Always allow "Read-only. No trading.
Not financial advice." Full list in `social-media-kit/MESSAGING.md`.

---

## Tech / conventions

- Vite + React 19 + TS + Tailwind v4 (`@theme` in `src/index.css`) + `motion/react`
  + lucide-react.
- Fonts: `--font-editorial` = Instrument Serif (display), `--font-sans` = Inter,
  `--font-display` = Space Grotesk, `--font-mono` = JetBrains Mono.
- Accent: emerald (app) + cyan (research). Warm near-black slate overrides.
  Helpers `.ambient-warm`, `.warm-hairline` in `index.css`.
- Verify each change: `npm run lint` (tsc --noEmit) + screenshot at desktop AND
  mobile before committing. Dev server `npm run dev` → http://localhost:3000/.
- Screenshots of the live Research site live in `assets/screenshots/latest/`
  (captured 2026-06-01; 5 used, rest reference). App screenshots in
  `assets/product-tour/`.

---

## What's done vs pending (2026-06-01)

✅ Hero (2 CTAs) + 6-question empathy scene.
✅ 5 app feature screens (pinned center-stage): X-Ray, Policy Score, Goals,
   Trade Checker, Thesis.
✅ App CTA bridge (pinned) with cyan web lead-in.
✅ Research intro (pinned, 6 questions) + 5 web screens (pinned browser-frame) +
   closing Research CTA (Bloomberg anchor).
✅ Color system: emerald = app, cyan = research, throughout.

🔜 Remove the duplicated old sections (`AppSurfaceStrip`, the Portfolio+Research
   parts of `FeatureGrid`); keep/restyle **Security**.
🔜 Restyle **Founder story** + **Security** to match the calm aesthetic.
🔜 Decide whether the **email/waitlist CTA** is still needed.
🔜 Footer review (anchor links, copy).
🔜 Font experiment (backlog).

See `social-media-kit/FEATURES.md` for the feature→question mapping that drives
every section's copy.
