# Aerarium Landing Page — Handoff / Context Doc

Purpose: anyone (Codex, another Claude, a contractor) can read this and be
instantly up to speed on the landing-page redesign.

Last updated: 2026-11-13.

---

## TL;DR

`aerarium.app` is now a **two-product scrollytelling landing page**, calm and
airy like luffu.com / poly.app but on the **dark emerald** theme that matches the
real apps. It tells one story top-to-bottom:

> your worries → **the app answers them** (5 feature screens) → there's more →
> **the companies' worries** → **Research answers those** (5 web screens) → CTAs.

**Two products, color-coded:**
- 🟢 **Emerald = Aerarium Portfolio** — the iOS app (live on the App Store since 2026-07-20; free to download, optional Premium).
- 🔵 **Cyan = Aerarium Research** — the web product (research.aerarium.app).

---

## Page architecture (current, top to bottom)

Assembled in `src/App.tsx`. Sections marked ✅ are the new calm redesign;
⚠️ marks the OLD dense sections still present but slated for removal.

| Section | Component | Notes |
|---|---|---|
| Navbar | `Navbar.tsx` | fixed; **page-centered** section links (Research is a tracked text link); emerald→cyan **scroll-progress bar**; one solid emerald **Get the App** CTA that **rolls up from the hero** once you scroll past it (desktop; inert while hidden); full-screen mobile `<dialog>` menu with retained focus |
| **Hero + Questions** | `HeroQuestionsScene.tsx` | ✅ pinned scene: hero dissolves → 6 "questions about your own money" reveal one-at-a-time. Hero has ONE primary CTA: emerald **Download on the App Store**, with the line "Free to download · Premium US$7.99/month or US$79.99/year" and "Brokerage sync requires Premium." Research is secondary (nav link, closing CTA). |
| **1. X-Ray** "You own more than you think." | `HiddenExposureReveal.tsx` | ✅ answers "how concentrated am I?" |
| **2. Policy Score** "Always know if you're on plan." | `PolicyScoreSection.tsx` | ✅ "am I on plan?" |
| **3. Goals** "See a goal slip before it falls." | `GoalsSection.tsx` | ✅ "am I drifting from my goals?" |
| **4. Trade Checker** "Know before you break a rule." | `TradeCheckerSection.tsx` | ✅ "will this trade break my rules?" |
| **5. Thesis log** "Remember why you bought it." | `ThesisSection.tsx` | ✅ "why did I buy this again?" |
| **App CTA bridge** "…and so much more." | `CtaBridge.tsx` | ✅ App Store CTA + cyan "…only half of Aerarium ↓" lead-in into the web half |
| **Research intro** "Now ask the same of every company." | `ResearchQuestions.tsx` | ✅ pinned; 6 questions about the companies you research |
| **5 Research web screens** | `ResearchScreens.tsx` → `WebScreen.tsx` | ✅ Financials · Segments · Ownership · Smart-money 13F · Macro. Browser-frame, cyan accent. |
| **Research closing CTA** "Institutional depth, not institutional price." | `ResearchCloseCta.tsx` | ✅ Source-first product scope + Open Research → research.aerarium.app |
| **Security** "Security you can verify, not just trust." | `SecuritySection.tsx` | ✅ pinned; 4 verifiable-trust cards cascade in (emerald) |
| **Founder story** "The spreadsheet stopped answering the real question." | `FounderExposureBridge.tsx` | ✅ pinned + restyled calm; "Why I built it" pill |
| Founder email list | `WaitlistPortal.tsx` | ✅ kept — the only owned-audience capture (launch updates); posts to `/api/waitlist` |
| Footer | inline in `App.tsx` | brand, links, copyright |
| Static Portfolio guides | `scripts/seo-pages.mjs` | ✅ seven build-time rendered HTML pages for SEO/GEO discovery |

The five app feature screens all use the shared **`CenterStageScreen.tsx`**; the
five web screens use **`WebScreen.tsx`**. Both share the reveal mechanism below.

> **Removed in the redesign** (don't look for these — they're gone): the dense
> `AppSurfaceStrip.tsx` 2×2 grid, the `FeatureGrid.tsx` Portfolio/Research/Security
> block (Security was extracted to its own pinned `SecuritySection.tsx`), the
> `CountdownTimer.tsx` launch card, and the old `PortfolioCockpitTour` /
> `IosCockpitMockup` mockups. The June 9 launch date now lives only in prose +
> `social-media-kit/`, not a countdown component.

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

**Static layout (2026-11-13):** the pinned scenes only run when the window is
at least 1024 px wide and 760 px tall and reduced motion is not requested
(`src/components/useStaticLayout.ts`). Phones, tablets, short windows, zoomed
pages and reduced-motion users get plain, immediately visible sections with no
scroll-reveal dependency (phone page height went from about 36,900 px to about
13,200 px). Direct links to a section reveal it. Keep both paths working.

---

## Brand + positioning (do not change, just align to)

- ONE brand **Aerarium** (`aerarium.app`). Two products: **Portfolio** (iOS;
  emerald) and **Research** (web, research.aerarium.app; cyan).
- Portfolio spine: "Guardrails, not handholding" / "a compliance officer in your
  pocket." Not a trading app.
- Research spine: source-first public-market research from SEC filings and other
  public data. Do not position it as a Bloomberg terminal replacement.
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
- Verify each change: `npm run lint` (tsc --noEmit), `npm test` (node unit tests
  for `api/` and `scripts/`), `npm run build`, and `npm run test:e2e` (Playwright;
  `npm run test:e2e:webkit` for Safari-engine coverage), plus a screenshot at
  desktop AND mobile. Dev server `npm run dev` → http://localhost:3000/.
- Screenshots of the live Research site live in `assets/screenshots/latest/`
  (captured 2026-06-01; 5 used, rest reference). App screenshots in
  `assets/product-tour/`; the three largest are served as 720 px WebP
  derivatives from `src/assets/optimized/`. Fonts are local (`public/fonts/`).
- Product links go through `src/lib/product-links.mjs` (`appStoreLink`,
  `researchLink`; UTM `landing` / `crosslink`). Do not hard-code the URLs.

---

## What's done vs pending (2026-11-13)

The full two-product redesign **shipped to `main`** (PR #5, merge `fec0821`).

✅ Hero (2 CTAs) + 6-question empathy scene; hero clears the navbar on short phones.
✅ 5 app feature screens (pinned center-stage): X-Ray, Policy Score, Goals,
   Trade Checker, Thesis.
✅ App CTA bridge (pinned) with cyan web lead-in.
✅ Research intro (pinned, 6 questions) + 5 web screens (pinned browser-frame) +
   closing Research CTA (source-first scope).
✅ Color system: emerald = app, cyan = research, throughout.
✅ Removed the duplicated old sections (`AppSurfaceStrip`, `FeatureGrid`,
   `CountdownTimer`); **Security** extracted to its own pinned `SecuritySection`.
✅ **Founder story** + **Security** restyled into the calm pinned template.
✅ Kept the **email/waitlist CTA** — it's the only owned-audience capture.
✅ Footer reviewed (anchors valid).
✅ Navbar finished: centered links, scroll-progress bar, hero→bar CTA roll-up,
   solid cyan/emerald CTAs, opaque full-height mobile drawer.
✅ Waitlist attribution: the API records bounded UTM fields after the draft
   migration is reviewed and applied; until then it safely falls back to the
   legacy schema.
✅ Private admin dashboard: `/admin/waitlist` shows signups, referral counts,
top referrer, and campaign attribution. Access requires
`ADMIN_DASHBOARD_PASSWORD`.
✅ Phase 2 static Portfolio guide wedge: seven crawlable, screenshot-backed
pages generated at build time from `scripts/seo-pages.mjs`.

✅ **2026-11-13 landing audit and improvements** (PR #11, merge `7ba07f9`):
   - Phone layout compacted and readable without scroll reveals; hash links
     reveal their section; faded hero links no longer intercept pointer input.
   - One primary call to action; Premium US$7.99/month or US$79.99/year and
     Research Pro CA$10/month stated consistently; brokerage sync disclosed as
     paid. Do not add converted prices or introductory offers without owner
     confirmation.
   - Tracked App Store / Research links in nav, footer, sections and guides;
     Smart App Banner (`apple-itunes-app`, ID 6760155168) on the homepage and
     guides.
   - Accessibility: keyboard navigation and visible focus (including static
     pages via `public/static-accessibility.css`), skip links, contrast,
     reduced motion, Safari menu focus.
   - Assets: images cut from 3.15 MB to 198 KB, local fonts, refreshed
     `public/og-image.png` (source `scripts/og-image.html`).
   - Waitlist API and admin hardening: 8 KiB JSON bodies, origin checks,
     per-instance throttling, 8-second database deadlines, Unicode-safe optional
     text, signup confirmed even if referral statistics fail, visible and
     recoverable admin errors.
   - Browser regression suite in `tests/` (Chromium and WebKit, axe scans).
✅ Dependency advisories cleared (PR #12, merge `31cf04a`): Vite 6.4.5 and
   transitive updates, no major upgrades; `npm audit` 7 advisories (5 high) to 0.
   Internal launch notes now state the current prices.

🔜 Font experiment (backlog).
🔜 Open items from the 2026-11-13 review:
   - Submitting an existing email still returns that person's referral details;
     needs email ownership verification before becoming a private view.
   - Throttling is per Vercel instance and best effort; an owner-configured edge
     or shared limiter is still needed. A saturated limiter can temporarily
     block admin login.
   - Deployed Vercel/Supabase behaviour and physical devices were not verified
     in the audit.
🔜 Review and explicitly approve
   `supabase/migrations/20260602000000_landing_waitlist_attribution.sql` before
   applying it to production. No migration has been applied by this repo pass.

See `social-media-kit/FEATURES.md` for the feature→question mapping that drives
every section's copy.

### Static Portfolio guide URLs

- `/portfolio-x-ray`
- `/investment-policy-statement-app`
- `/policy-score`
- `/methodology`
- `/security`
- `/goals-funding-plan`
- `/investment-thesis-tracker`

The guides are build-time rendered rather than runtime SSR because the content
is evergreen. `npm run build` runs Vite first, then
`scripts/build-seo-pages.mjs`. The initial HTML response contains the complete
copy, metadata, screenshot reference, FAQs, FAQ JSON-LD, and internal links.
