# Aerarium Landing — Content Map (where to edit what)

A plain-English guide to **which file holds which text** on `aerarium.app`, so you
can change copy without hunting. Last updated: 2026-11-13.

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
| 1 | Hero ("Invest with intention…") + floating questions + the **primary CTA** (emerald Download on the App Store) | `src/components/HeroQuestionsScene.tsx` → `HeroCopy()` | `#hero` |
| 2 | App screen 1 — X-Ray "You own more than you think." | `src/components/HiddenExposureReveal.tsx` | `#answer` |
| 3 | App screen 2 — Policy Score | `src/components/PolicyScoreSection.tsx` | `#policy-score` |
| 4 | App screen 3 — Goals | `src/components/GoalsSection.tsx` | `#goals` |
| 5 | App screen 4 — Trade Checker | `src/components/TradeCheckerSection.tsx` | `#trade-checker` |
| 6 | App screen 5 — Thesis log | `src/components/ThesisSection.tsx` | `#thesis` |
| 7 | App CTA bridge ("…and so much more" + App Store) | `src/components/CtaBridge.tsx` | — |
| 8 | Research intro ("Now ask the same of every company") | `src/components/ResearchQuestions.tsx` | `#research-questions` |
| 9 | 5 Research web screens (Financials/Segments/Ownership/Smart-money/Macro) | `src/components/ResearchScreens.tsx` (data) + `WebScreen.tsx` (layout) | — |
| 10 | Research closing CTA (source-first scope + Open Research) | `src/components/ResearchCloseCta.tsx` | — |
| 11 | Security ("Security you can verify, not just trust.") | `src/components/SecuritySection.tsx` | `#security` |
| 12 | Founder story ("The spreadsheet stopped answering the real question.") | `src/components/FounderExposureBridge.tsx` | `#founder-story` |
| 13 | Founder email list | `src/components/WaitlistPortal.tsx` | `#waitlist` |
| 14 | Footer (brand, links, copyright) | `src/App.tsx` | — |
| — | Static Portfolio guide pages | `scripts/seo-pages.mjs` | `/portfolio-x-ray`, `/policy-score`, and five related paths |
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
  Launch updates** — the `NAV_LINKS` array at the top. Portfolio, Security,
  Founder story and Launch updates scroll to a section (`#answer`, `#security`,
  `#founder-story`, `#waitlist`); Research opens the research site in a new tab.
- **One CTA button**, emerald **"Get the App"** → App Store, top-right on
  desktop AND in the mobile drawer (change both). On desktop it is hidden on the
  hero and rolls up into the bar once you scroll past it.
- Brand word **"Aerarium"** and the logo (`src/assets/logo.png`).

### 1. Hero + Questions — `src/components/HeroQuestionsScene.tsx`
This one file owns the whole opening scroll scene. Inside it:
- **Hero headline / subhead / buttons** → the `HeroCopy()` function.
  - Headline: "Invest with intention, / not impulse."
  - Support line: "You can't follow a plan you can't see. Aerarium helps you…"
  - Button: emerald "Download on the App Store"; captions "Free to download ·
    Premium US$7.99/month or US$79.99/year" and "Brokerage sync requires
    Premium."
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
- Pill "Aerarium Portfolio", headline "…and so much more.", button "Download
  on the App Store" with the line "Free to download · Premium US$7.99/month or
  US$79.99/year".
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
- Footer links (Privacy, Terms, Support, Methodology, Portfolio X-Ray, Security,
  Launch updates, App Store, Research, Instagram) and the copyright line "© 2026 Aerarium. High-end tools for rules-
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
| Nav links / the top CTA | `Navbar.tsx` (`NAV_LINKS` + the CTA `<a>` tags) |
| The App Store / Research links | `src/lib/product-links.mjs` (`APP_STORE_URL`, `RESEARCH_URL`, `appStoreLink()`, `researchLink()`); raw HTML links in `index.html` and `scripts/seo-pages.mjs` must match |
| The Research site link | search for `research.aerarium.app` |
| Founder name / bio | `FounderExposureBridge.tsx` |
| Security card copy | `SecuritySection.tsx` (`ITEMS` array) |
| Footer links / copyright | `App.tsx` |
| Browser tab title / Google & social preview | `index.html` |
| Brand colors or fonts | `src/index.css` (the `@theme` block at top) |
| The Instagram link | `App.tsx` (footer) |
| Static SEO guide titles, copy, FAQs, screenshots, or related links | `scripts/seo-pages.mjs` |

## Shared values that appear in many files (change every copy)
- **App Store URL:** `https://apps.apple.com/app/aerarium/id6760155168` (App Store ID `6760155168`, also in the `apple-itunes-app` meta tag)
- **Research URL:** `https://research.aerarium.app/`
- **Premium prices:** US$7.99/month, US$79.99/year; Research Pro CA$10/month (hero, CTA bridge, `index.html`, guides, `public/llms.txt`)
- **Launch date:** the app is live on the App Store (flip done 2026-07-20); the
  old June 9, 2026 date may remain in `social-media-kit/` only.
- **Founder name:** "Vedang" (founder story).

## Images / assets
- App screenshots used on the page: `assets/product-tour/`.
- Stable screenshots used by the generated static guide pages:
  `public/assets/seo/`.
- Research web screenshots: `assets/screenshots/latest/`.
- Logo: `src/assets/logo.png`. Social share image: `public/og-image.png`.
- To swap a screenshot, replace the file (keep the name) or update the `import`
  at the top of the component that uses it.

---

For *how the page is built* (stack, the scroll-scene mechanics, design rules,
what's done vs pending), see **`docs/LANDING-HANDOFF.md`**. For messaging rules
and the feature→question mapping, see **`social-media-kit/FEATURES.md`** and
**`social-media-kit/MESSAGING.md`**.
