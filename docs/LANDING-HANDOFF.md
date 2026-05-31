# Aerarium Landing Page — Handoff / Context Doc

Purpose: anyone (Codex, another Claude, a contractor) can read this and be
instantly up to speed on the landing-page redesign — the goal, the decisions,
the architecture, the conventions, and what's done vs. pending.

Last updated: 2026-05-31.

---

## TL;DR

We're redesigning `aerarium.app` (the brand landing page) to feel **calm, airy,
and beginner-friendly** like **luffu.com** and **poly.app**, while staying on the
**dark emerald** theme that matches the actual products. We keep ALL features but
present them with **space and one-idea-per-screen**, not dense panels.

Work happens **section by section, atomic commits, on a feature branch**, with the
founder reviewing each section via live screenshots before moving on. Slower but
intentional.

---

## The two reference sites (study these)

- **Luffu** (luffu.com): hero = one image + headline + 1 subhead + 1 button,
  nothing else. Then a scroll sequence where EACH feature gets its own calm
  full-screen moment (one headline, one line, phone(s), lots of air). Floating
  "question" chips around a centered headline for the empathy beat. Light/cream.
- **Poly** (poly.app): one cinematic product object, 4-word headline, dark but
  airy. Proves dark CAN feel calm — air comes from space + restraint, not from
  being light.

**Principle: don't cut features — cut crowding.** Every feature stays; each gets
room. Calm = fewer ideas per screen + whitespace + predictable scroll.

---

## Brand + positioning (do not change, just align to)

- ONE brand: **Aerarium** (`aerarium.app` umbrella).
- TWO products: **Aerarium Portfolio** (iOS app; portfolio.aerarium.app) and
  **Aerarium Research** (web; research.aerarium.app; formerly "FinSight" — that
  name is retired publicly).
- Portfolio spine: **"Guardrails, not handholding" / "a compliance officer in
  your pocket."** Not a trading app, not a robo-advisor.
- Research spine: **institutional analytics from SEC EDGAR primary sources** —
  a replacement for the $24k/yr Bloomberg terminal and $39–79/mo fiscal.ai.
- Audience: long-term investors who want to invest with intention — BOTH total
  beginners (may not know tickers) AND advanced ("already run a playbook").
  Beginner-inclusive language up top; advanced/ticker-specific stuff lives lower
  once the visitor is engaged.

### Compliance (YMYL — hard rules)
Never imply advice/returns; no "beat the market", "best stocks", "guaranteed".
Always allow "Read-only. No trading. Not financial advice." Full list in
`social-media-kit/MESSAGING.md`.

---

## Locked hero copy (section 1)

- **Headline:** Invest with intention, not impulse.
- **Support:** You can't follow a plan you can't see. Aerarium helps you
  understand what you really own, build your investment plan, and stay
  disciplined for the long term.
- **Target/trust footnote:** For long-term investors — whether you're just
  starting or already run a playbook. · Read-only. No trading. Not financial
  advice.
- **CTA:** Get Early Access · Free on iOS · via TestFlight (single CTA only).

The headline leads with the EMOTIONAL promise (not the NVDA fact). The concrete
**"You thought you owned 8% NVDA → 18.7%"** hook is RELOCATED to a later "Answer"
proof section, where the visitor is already engaged (beginners won't bounce on a
ticker up top).

---

## Page architecture (target)

1. **Hero** — calm, centered, text-only, huge serif, one button, max air. ✅ done.
2. **Questions** ("Questions worth asking about your own money") — investor
   worries floating around a centered headline (empathy beat). No stock faces
   (wrong for finance) — typographic question chips. ✅ done.
   - Each question maps to a feature that answers it later (see `FEATURES.md`).
3. **The Answer** — one calm phone on a warm gradient; THE NVDA / Portfolio X-Ray
   reveal ("You own more than you think" — 8% → 18.7%). ⏳ next.
4. **Feature moments** — existing features re-presented as a SEQUENCE of calm
   one-feature screens (Policy Score, Trade Checker, Goals, Thesis/IPS log,
   Privacy/encryption). All kept, each given air. Replaces the cramped pinned
   tour. Use the feature→problem framings in `FEATURES.md`. ⏳ pending.
5. **Research** — institutional-data angle + Bloomberg/fiscal.ai price anchor;
   calm screens. ⏳ pending (trim copy ~40%).
6. **Security / founder / launch list** — each one calm screen, trimmed. ⏳.

Open experiment: a **hero→questions scroll transition** (foreground hero fades
out, blurred questions background sharpens into focus). Built in
`HeroQuestionsScene.tsx` but UNDER REVIEW — it slightly muddies the hero by
overlapping two headlines mid-scroll. Alternative if rejected: revert to plain
stacked sections + add a **warm ambient glow** behind the hero (the `ambient-warm`
CSS class already exists) so the dark bg feels lit, not empty.

---

## Tech / conventions

- **Stack:** Vite + React 19 + TypeScript + Tailwind v4 (`@theme` tokens in
  `src/index.css`) + `motion/react` (Framer Motion) + lucide-react icons.
- **Fonts (theme tokens):** `--font-editorial` = Instrument Serif (display
  headlines), `--font-display` = Space Grotesk, `--font-sans` = Inter,
  `--font-mono` = JetBrains Mono. A font experiment is on the backlog.
- **Theme:** warm near-black tokens override slate (`--color-slate-950: #080b09`
  etc.). Accent = emerald. There's a `.ambient-warm` radial-glow helper and a
  `.warm-hairline` divider in `index.css`.
- **Motion:** prefer `whileInView` reveal (fade-up, ~0.6s easeOut, stagger
  ~0.06–0.08s). ALWAYS provide a `prefers-reduced-motion` fallback for anything
  scroll-driven (see HeroQuestionsScene for the pattern).
- **Responsive:** verify at desktop 1440×900 AND mobile 390×844. Mobile must
  degrade gracefully (e.g. floating layouts → stacked).
- **Accessibility:** focus-visible rings on CTAs; don't blur real text into
  unreadability; keep contrast ≥4.5:1 for body.
- **Verify each change:** `npm run lint` (tsc --noEmit) + screenshot desktop &
  mobile before committing.
- **Dev server:** `npm run dev` → http://localhost:3000/. Build: `npm run build`
  (output to `dist/`; static files like robots/sitemap/llms/og-image live in
  `/public`).

## Key files

- `src/App.tsx` — page composition / section order.
- `src/components/HeroQuestionsScene.tsx` — hero + questions scroll scene (under
  review). Contains the plain-hero fallback too.
- `src/components/InvestorQuestions.tsx` — the floating-questions section.
- `src/components/FeatureGrid.tsx` — Portfolio tour + Research carousel
  (scroll-pinned; SLATED for the "one feature = one calm screen" redesign).
- `src/components/PortfolioCockpitTour.tsx` — the pinned iPhone tour.
- `src/components/AppSurfaceStrip.tsx` — the 2×2 "questions the app answers" grid.
- `src/components/FounderExposureBridge.tsx`, `CountdownTimer.tsx`,
  `WaitlistPortal.tsx`, `Navbar.tsx` — supporting sections.
- `index.html` — SEO/OG/JSON-LD (SEO Phase 1 already shipped).

## Source-of-truth docs (in `social-media-kit/`)

- `FEATURES.md` — feature→problem map for BOTH products (from the project brain).
  Use this for every feature section's copy. Has the brand lines + price anchors.
- `MESSAGING.md` — voice, the NVDA hook, YMYL banned/approved phrases, hashtags.
- `PRICING.md` — tier decisions (App Free[CSV]/$4.99/$9.99; Research free/$5/$10),
  margin math, qualtrim/Bloomberg anchors. Two items still open.
- `BRAND-AND-RESEARCH-STRATEGY.md` — two-product brand, SSO (Supabase; iCloud
  Keychain blocker), monetization sequencing, Research SEO plan.
- `SEO-GEO-PLAYBOOK.md`, `LAUNCH-CALENDAR.csv`, `LINKS.csv`, caption files.

## Git / workflow

- Branch per workstream; **atomic commits per section**; PR to `main`; founder
  reviews. Commit message co-author line:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Current landing branch: `feat/calmer-emotional-hero` (hero + questions done).
- Merged already on main: redesign (#1), launch kit + SEO Phase 1 (#2), tour
  layout fixes + pricing doc (#3).

## What's done vs pending (snapshot 2026-05-31)

- ✅ Section 1 hero (calm, centered, text-only).
- ✅ Section 2 questions (floating empathy beat).
- 🔬 Hero→questions blur-parallax transition (built, under founder review).
- ⏳ Section 3 "The Answer" / NVDA X-Ray reveal.
- ⏳ Section 4 feature moments redesign (un-cram the tour, one feature per screen).
- ⏳ Research / security / founder / launch trims.
- ⏳ Font experiment.
- ⏳ Warm ambient glow on hero (the fallback if parallax is rejected).
