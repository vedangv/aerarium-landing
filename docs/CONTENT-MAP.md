# Aerarium Landing — Content Map (where to edit what)

A plain-English guide to **which file holds which text** on `aerarium.app`, so you
can change copy without hunting. Last updated: 2026-06-01.

## How to edit text

1. `npm run dev` → open http://localhost:3000 (live-reloads as you save).
2. Find the section below, open the file it names.
3. Search (Cmd/Ctrl-F) for the **exact words** you see on the page — they're in
   the file verbatim. Edit, save, the browser updates.
4. Before committing: `npm run lint` (catches typos that break the build).

Everything lives in `src/`. Page order is assembled in **`src/App.tsx`** — that's
the table of contents; each numbered comment there points at a section's file.

---

## The page, top to bottom

Order is assembled in **`src/App.tsx`**. Two products are colour-coded:
🟢 emerald = the iOS app, 🔵 cyan = Aerarium Research (web).

| # | Section (what you see) | File to edit | Anchor id |
|---|---|---|---|
| 0 | Top nav bar + mobile menu | `src/components/Navbar.tsx` | — |
| 1 | Hero ("Invest with intention…") + floating questions + the **two CTAs** (emerald Get Early Access, cyan Open Research) | `src/components/HeroQuestionsScene.tsx` → `HeroCopy()` | `#hero` |
| 2 | App screen 1 — X-Ray "You own more than you think." | `src/components/HiddenExposureReveal.tsx` | `#answer` |
| 3 | App screen 2 — Policy Score | `src/components/PolicyScoreSection.tsx` | `#policy-score` |
| 4 | App screen 3 — Goals | `src/components/GoalsSection.tsx` | `#goals` |
| 5 | App screen 4 — Trade Checker | `src/components/TradeCheckerSection.tsx` | `#trade-checker` |
| 6 | App screen 5 — Thesis log | `src/components/ThesisSection.tsx` | `#thesis` |
| 7 | App CTA bridge ("…and so much more" + TestFlight) | `src/components/CtaBridge.tsx` | — |
| 8 | Research intro ("Now ask the same of every company") | `src/components/ResearchQuestions.tsx` | `#research-questions` |
| 9 | 5 Research web screens (Financials/Segments/Ownership/Smart-money/Macro) | `src/components/ResearchScreens.tsx` (data) + `WebScreen.tsx` (layout) | `#research-financials` … |
| 10 | Research closing CTA (Bloomberg anchor + Open Research) | `src/components/ResearchCloseCta.tsx` | — |
| — | Shared layouts/reveal | `CenterStageScreen.tsx` (app screens), `WebScreen.tsx` (web), `useReveal.ts` (the pinned fade-in) | — |
| 11 | Launch status / countdown card | `src/components/CountdownTimer.tsx` | — |
| ⚠️ | OLD 2×2 grid — **slated for removal (duplicate)** | `src/components/AppSurfaceStrip.tsx` | `#surfaces` |
| ⚠️ | OLD product proof — **Portfolio+Research slated for removal; Security kept** | `src/components/FeatureGrid.tsx` | `#portfolio` `#research` `#security` |
| 12 | Founder story | `src/components/FounderExposureBridge.tsx` | `#founder-story` |
| 13 | Founder email list (under review) | `src/components/WaitlistPortal.tsx` | `#waitlist` |
| 14 | Footer (brand, links, copyright) | `src/App.tsx` | — |
| — | Browser tab title, SEO/social preview text | `index.html` | — |
| — | Colors, fonts, theme | `src/index.css` | — |

> Per-feature copy lives in each screen's component (`HiddenExposureReveal`,
> `PolicyScoreSection`, etc.): the eyebrow, `headline`, `subheader`, the small
> `leftSlot` graphic, and the screenshot import are all right there at the top.

---

## Section detail (exact strings → file)

### 0. Navbar — `src/components/Navbar.tsx`
- Menu labels: **Portfolio, Research, Security, Early Access, Open Research**.
  The first three are buttons that scroll to `#portfolio` / `#research` /
  `#security`. "Early Access" → TestFlight; "Open Research" → research site.
- The button text **"Join iOS Beta"** (top-right) appears twice (desktop +
  mobile drawer) — change both.
- Brand word **"Aerarium"** and the logo (`src/assets/logo.png`).

### 1. Hero + Questions — `src/components/HeroQuestionsScene.tsx`
This one file owns the whole opening scroll scene. Inside it:
- **Hero headline / subhead / button** → the `HeroCopy()` function.
  - Headline: "Invest with intention, / not impulse."
  - Support line: "You can't follow a plan you can't see. Aerarium helps you…"
  - Button: "Get Early Access" + "Free on iOS · via TestFlight"
  - Trust footnote: "For long-term investors — whether you're just starting…"
- **The 6 floating questions** → the `QUESTIONS` array near the top. Each entry
  is `{ text, pos, ... }`; edit `text` to change wording, `pos` to move it.
  The comment beside each says which product feature it sets up.
- **Questions heading** ("Questions worth asking about your own money." +
  "Most investors can't answer these…") → the `QuestionsCopy()` function.
- **Animation pacing** (if a question reveals too fast/slow, or the hero→questions
  transition timing): the constants `CHIP_START`, `CHIP_STAGGER`, `CHIP_WINDOW`,
  the track height `h-[420svh]`, and the `useTransform(...)` lines in `Scene()`.
  See `docs/LANDING-HANDOFF.md` for how that scene works.

### 2. Launch status — `src/components/CountdownTimer.tsx`
- **The launch date** is set in code: line ~8, `targetDate = new Date("2026-06-09…")`.
  Change it there AND the visible strings: "App Store launch target: June 2026",
  "Target date: June 09, 2026", and the "Beta is live now" pill.
- Pre/post-launch copy: "Portfolio is free during beta. Join the founder list…"
  and the launched banner "AERARIUM PORTFOLIO & RESEARCH LIVE".
- Buttons: "Join beta", "Founder list".

### 3. "Questions the app answers" grid — `src/components/AppSurfaceStrip.tsx`
- Badge "Questions the app answers", heading "The portfolio keeps asking better
  questions.", and its paragraph → the JSX near the bottom (~line 65-73).
- The 3 short bullets ("Exposure before allocation." etc.) → the inline array ~line 75.
- The **4 cards** (title / label / body / which screenshot) → the `surfaces`
  array at the top (~line 10). `image` + `objectPosition` control the crop.

### 4. Product proof — `src/components/FeatureGrid.tsx`
Three sub-sections in one file:
- **Portfolio** (`#portfolio`): badge "Aerarium Portfolio", heading "Your policy
  should move with your portfolio.", subhead "Most apps tell you what changed…",
  and the 3 feature cards (inline array ~line 162: "Exposure first", "Score with
  reasons", "Built for restraint").
- **Research** (`#research`): badge "Aerarium Research", heading "Source-first
  market context before the next decision." The 7 carousel slides (title / label /
  description / image) → the `RESEARCH_SHOWCASES` array at the top (~line 23).
- **Security** (`#security`): heading "Security you can verify, not just trust.",
  the "Founder note" paragraph, and the security cards array (~line 476:
  "Read-only brokerage sync", etc.).

### 5. Founder story — `src/components/FounderExposureBridge.tsx`
- Badge "Built from a real portfolio problem", heading "The spreadsheet stopped
  answering the real question.", the two story paragraphs, and the signature
  "- Vedang, CFA charterholder and solo founder".
- Right-hand card: "Closed-loop discipline" / "Most apps show what changed…",
  the 3 points (`systemPoints` array ~line 5: Exposure / Policy / Discipline),
  and the "See the product tour" link.

### 6. Founder email list — `src/components/WaitlistPortal.tsx`
- Form heading "Founder launch list", subhead "Get App Store launch updates…",
  the 3 chips, and the submit button "Get launch updates".
- Post-signup ticket text ("You're on the founder list", "Launch Pass", "Share
  launch updates", etc.) is lower in the same file.
- Validation/error messages are the `setError("…")` strings.

### 7. Footer — `src/App.tsx`
- Footer links (Privacy, Terms, Security, Founder list, TestFlight, Research,
  Instagram) and the copyright line "© 2026 Aerarium. High-end tools for rules-
  based personal investing and public-market research." → bottom of `App.tsx`.

### Browser tab title + social preview — `index.html`
- `<title>` (the browser tab text), the meta description, and the Open
  Graph / Twitter tags (the title + image shown when the link is shared).
- The JSON-LD blocks (structured data for Google/AI) are also here.
- The share image itself: `public/og-image.png`.

---

## Common edits — quick lookup

| I want to change… | Go to |
|---|---|
| The big hero headline / button | `HeroQuestionsScene.tsx` → `HeroCopy()` |
| Wording of a floating question | `HeroQuestionsScene.tsx` → `QUESTIONS` array |
| A question shows up too fast on scroll | `HeroQuestionsScene.tsx` → `CHIP_STAGGER` / `h-[420svh]` |
| The launch date | `CountdownTimer.tsx` (the `targetDate` line + visible strings) |
| The "Join iOS Beta" / TestFlight link | search **all files** for `testflight.apple.com/join/Xna39VKU` |
| The Research site link | search for `research.aerarium.app` |
| Founder name / bio | `FounderExposureBridge.tsx` and `FeatureGrid.tsx` (Founder note) |
| Footer links / copyright | `App.tsx` |
| Browser tab title / Google & social preview | `index.html` |
| Brand colors or fonts | `src/index.css` (the `@theme` block at top) |
| The Instagram link | `App.tsx` (footer) |

## Shared values that appear in many files (change every copy)
- **TestFlight URL:** `https://testflight.apple.com/join/Xna39VKU`
- **Research URL:** `https://research.aerarium.app/`
- **Launch date:** June 9, 2026 (code date in `CountdownTimer.tsx`, prose in
  several spots — grep `June 2026` / `June 09`).
- **Founder name:** "Vedang" (founder story + security founder note).

## Images / assets
- App screenshots used on the page: `assets/product-tour/` and `assets/screenshots/`.
- Logo: `src/assets/logo.png`. Social share image: `public/og-image.png`.
- To swap a screenshot, replace the file (keep the name) or update the `import`
  at the top of the component that uses it.

---

For *how the page is built* (stack, the scroll-scene mechanics, design rules,
what's done vs pending), see **`docs/LANDING-HANDOFF.md`**. For messaging rules
and the feature→question mapping, see **`social-media-kit/FEATURES.md`** and
**`social-media-kit/MESSAGING.md`**.
