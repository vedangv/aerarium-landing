# Aerarium Landing — Content Map (where to edit what)

A plain-English guide to **which file holds which text** on `aerarium.app`, so you
can change copy without hunting. Last updated: 2026-06-02.

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
| 9 | 5 Research web screens (Financials/Segments/Ownership/Smart-money/Macro) | `src/components/ResearchScreens.tsx` (data) + `WebScreen.tsx` (layout) | — |
| 10 | Research closing CTA (source-first scope + Open Research) | `src/components/ResearchCloseCta.tsx` | — |
| 11 | Security ("Security you can verify, not just trust.") | `src/components/SecuritySection.tsx` | `#security` |
| 12 | Founder story ("The spreadsheet stopped answering the real question.") | `src/components/FounderExposureBridge.tsx` | `#founder-story` |
| 13 | Founder email list | `src/components/WaitlistPortal.tsx` | `#waitlist` |
| 14 | Footer (brand, links, copyright) | `src/App.tsx` | — |
| — | Shared layouts/reveal | `CenterStageScreen.tsx` (app screens), `WebScreen.tsx` (web), `useReveal.ts` (the pinned fade-in) | — |
| — | Browser tab title, SEO/social preview text | `index.html` | — |
| — | Colors, fonts, theme | `src/index.css` | — |

> Per-feature copy lives in each screen's component (`HiddenExposureReveal`,
> `PolicyScoreSection`, etc.): the eyebrow, `headline`, `subheader`, the small
> `leftSlot` graphic, and the screenshot import are all right there at the top.

---

## Section detail (exact strings → file)

### 0. Navbar — `src/components/Navbar.tsx`
- **Section links** (centered): **Portfolio, Research, Security, Founder story,
  Founder list** — the `NAV_LINKS` array at the top. Each scrolls to a section
  (`#answer`, `#research-questions`, `#security`, `#founder-story`, `#waitlist`).
- **Two CTA buttons** appear top-right on desktop AND in the mobile drawer
  (change both): cyan **"Open Research"** → research site, emerald **"Join iOS
  Beta"** → TestFlight. On desktop they're hidden on the hero and roll up into
  the bar once you scroll past it.
- Brand word **"Aerarium"** and the logo (`src/assets/logo.png`).

### 1. Hero + Questions — `src/components/HeroQuestionsScene.tsx`
This one file owns the whole opening scroll scene. Inside it:
- **Hero headline / subhead / buttons** → the `HeroCopy()` function.
  - Headline: "Invest with intention, / not impulse."
  - Support line: "You can't follow a plan you can't see. Aerarium helps you…"
  - Buttons: emerald "Get Early Access" (TestFlight) + cyan "Open Research"
    (research site); caption "Free on iOS via TestFlight · Research free in your
    browser"
  - Trust footnote: "For long-term investors — whether you're just starting…"
- **The 6 floating questions** → the `QUESTIONS` array near the top. Each entry
  is `{ text, pos, ... }`; edit `text` to change wording, `pos` to move it.
  The comment beside each says which product feature it sets up.
- **Questions heading** ("Questions worth asking about your own money." +
  "Brokerage screens rarely answer these clearly…") → the `QuestionsCopy()`
  function.
- **Animation pacing** (if a question reveals too fast/slow, or the hero→questions
  transition timing): the constants `CHIP_START`, `CHIP_STAGGER`, `CHIP_WINDOW`,
  the track height `h-[450svh]`, and the `useTransform(...)` lines in `Scene()`.
  See `docs/LANDING-HANDOFF.md` for how that scene works.

### 2–6. The five app feature screens
Each is its own file using the shared `CenterStageScreen.tsx` layout. The copy
(eyebrow pill, `headline`, `subheader`, the small `leftSlot` graphic, the phone
screenshot import) all sits at the top of the component:
- **X-Ray** — `HiddenExposureReveal.tsx` — "You own more than you think."
- **Policy Score** — `PolicyScoreSection.tsx` — "Always know if you're on plan."
- **Goals** — `GoalsSection.tsx` — "See a goal slip before it falls."
- **Trade Checker** — `TradeCheckerSection.tsx` — "Know before you break a rule."
- **Thesis log** — `ThesisSection.tsx` — "Remember why you bought it."

### 7. App CTA bridge — `src/components/CtaBridge.tsx`
- Pill "Aerarium Portfolio", headline "…and so much more.", subheader "Come
  experience the full app — free while it's in beta on TestFlight.", button
  "Get Early Access".
- The cyan pivot lead-in into the web half: "And your portfolio is only half of
  Aerarium." + the down arrow.

### 8. Research intro — `src/components/ResearchQuestions.tsx`
- Heading "Now ask the same of every company." + its subhead, and the **6
  research questions** (the array near the top: profitable / trust the numbers /
  revenue drivers / who owns it / growth real / market pricing in).

### 9. Research web screens — `src/components/ResearchScreens.tsx`
- The **5 web screens** (title / subheader / screenshot) live in the array here:
  Financials · Segments · Ownership · Smart-money 13F · Macro. Layout is
  `WebScreen.tsx` (the cyan browser-frame). Screenshots come from
  `assets/screenshots/latest/`.

### 10. Research closing CTA — `src/components/ResearchCloseCta.tsx`
- Headline "Institutional depth, not institutional price.", the source-first
  Research subheader, and the "Open Research" button.

### 11. Security — `src/components/SecuritySection.tsx`
- Pill "Security", heading "Security you can verify, not just trust." + its
  subhead, and the **4 trust cards** (the `ITEMS` array at the top: read-only,
  encrypted fields, export & delete, private portfolio / public research).

### 12. Founder story — `src/components/FounderExposureBridge.tsx`
- Pill "Why I built it", headline "The spreadsheet stopped answering the real
  question.", the two story paragraphs (`P1`, `P2`), the tags (`TAGS` array),
  and the signature "— Vedang, CFA charterholder & solo founder" (links to
  LinkedIn).

### 13. Founder email list — `src/components/WaitlistPortal.tsx`
- Form heading "Founder launch list", subhead "Get App Store launch updates…",
  the 3 chips, and the submit button "Get launch updates".
- Post-signup ticket text ("You're on the founder list", "Launch Pass", "Share
  launch updates", etc.) is lower in the same file.
- Validation/error messages are the `setError("…")` strings.
- Signups capture referral and UTM attribution through `api/waitlist.js`.
- The private `/admin/waitlist` route renders `AdminWaitlist.tsx`. The API falls
  back to the legacy table shape until the draft attribution migration is
  explicitly approved and applied.

### 14. Footer — `src/App.tsx`
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
| The big hero headline / buttons | `HeroQuestionsScene.tsx` → `HeroCopy()` |
| Wording of a floating question | `HeroQuestionsScene.tsx` → `QUESTIONS` array |
| A question shows up too fast on scroll | `HeroQuestionsScene.tsx` → `CHIP_STAGGER` / `h-[450svh]` |
| A feature screen's headline / graphic | that screen's file (e.g. `PolicyScoreSection.tsx`) |
| Nav links / the two top CTAs | `Navbar.tsx` (`NAV_LINKS` + the CTA `<a>` tags) |
| The "Join iOS Beta" / TestFlight link | search **all files** for `testflight.apple.com/join/Xna39VKU` |
| The Research site link | search for `research.aerarium.app` |
| Founder name / bio | `FounderExposureBridge.tsx` |
| Security card copy | `SecuritySection.tsx` (`ITEMS` array) |
| Footer links / copyright | `App.tsx` |
| Browser tab title / Google & social preview | `index.html` |
| Brand colors or fonts | `src/index.css` (the `@theme` block at top) |
| The Instagram link | `App.tsx` (footer) |

## Shared values that appear in many files (change every copy)
- **TestFlight URL:** `https://testflight.apple.com/join/Xna39VKU`
- **Research URL:** `https://research.aerarium.app/`
- **Launch date:** June 9, 2026 — now prose only (no countdown component); grep
  `June 2026` / `June 9` across `index.html` + `social-media-kit/`.
- **Founder name:** "Vedang" (founder story).

## Images / assets
- App screenshots used on the page: `assets/product-tour/`.
- Research web screenshots: `assets/screenshots/latest/`.
- Logo: `src/assets/logo.png`. Social share image: `public/og-image.png`.
- To swap a screenshot, replace the file (keep the name) or update the `import`
  at the top of the component that uses it.

---

For *how the page is built* (stack, the scroll-scene mechanics, design rules,
what's done vs pending), see **`docs/LANDING-HANDOFF.md`**. For messaging rules
and the feature→question mapping, see **`social-media-kit/FEATURES.md`** and
**`social-media-kit/MESSAGING.md`**.
