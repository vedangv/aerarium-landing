# Reference — Luffu "solution" screens (the post-questions sequence)

Captured 2026-06-01 from luffu.com as the model for Aerarium's flow:
**hero → questions the user has → a SEQUENCE of calm "solution" screens that
show what the app does and how it answers those questions → brand → founder →
final CTA.**

> The raw PNGs couldn't be auto-copied (macOS protects the screenshot paste-temp
> files). To keep the actual images here, drag them into this folder. The
> descriptions below are the working reference regardless.

The throughline: **one idea per screen, one or a few phones, enormous whitespace,
a big serif headline + one supporting sentence.** Luffu is light/cream; we stay
dark-emerald — but the *structure and restraint* are what we copy.

---

## The 9 screens, in order

### 1. Overview — "An intelligent family care system"
- Big serif headline, a 4-line subhead, then **one hand-held phone** showing the
  family grid ("Continuous monitoring in progress").
- **Aerarium equivalent:** the system overview. Headline like *"One disciplined
  system for everything you own."* + one hand-held phone showing the Portfolio
  cockpit / X-Ray. (This is essentially our **Section 3 "The Answer"** expanded.)

### 2. Insight — "Luffu gathers your family's information… and delivers insights and alerts you can act on."
- Centered headline, **one phone** showing a "Family Retrospective" summary +
  three stat rings + a lifestream.
- **Aerarium equivalent:** *"Aerarium pulls in every account, looks through every
  fund, and gives you one number you can act on."* Phone shows the **Policy Score**
  (0–100) + reasons. Maps to Policy Score.

### 3. Guardrails — "Your family's around-the-clock guardian"
- Headline + subhead, then **THREE phones** side by side, each a portrait with a
  status caption ("Todd's temperature is finally starting to fall", "Activity
  levels increasing", "Ziggy is eating a consistent amount").
- **Aerarium equivalent (high value):** *"Always-on guardrails, not handholding."*
  Three phones, each a check: **concentration alert** (X-Ray), **drift vs target
  bands** (IPS compliance), **Trade Checker** ("this trade would breach your 25%
  cap"). Directly answers the section-2 questions. → FEATURES.md #1/#2/#5.

### 4. Capture — "Effortless health logging for everyone"
- Three cards: **NATURAL LANGUAGE** (log by voice/text), **VISION** (photo), 
  **CONNECT** (apps/wearables).
- **Aerarium equivalent:** *"Get your holdings in, your way."* Cards for
  **CSV import** (privacy-first), **SnapTrade brokerage sync** (auto), and the
  read-only/zero-knowledge promise. Maps to the privacy-flexible sync feature
  (FEATURES.md #3/#4).

### 5. Ask — "Easy health Q&A"
- Centered headline/subhead, one phone ("CONCIERGE") for plain-language questions.
- **Aerarium equivalent (optional / Research-led):** *"Ask the data, get the
  source."* Better fit for **Aerarium Research** (source-first financials) than the
  portfolio app. Use only if the app/Research has a genuine ask feature — don't
  fake it.

### 6. Share — "Involve family & caregivers"
- Two cards (sharing/permissions: "Analyzing and sharing…" / "…and let others know").
- **Aerarium equivalent (low priority):** Aerarium is single-user/private, so a
  "sharing" beat is weak. Could instead become a **thesis-log / discipline-journal**
  beat ("remember why you bought it"). Skip or repurpose.

### 7. Brand name — "Why Luffu? (\"Loo-foo\")"
- Row of circular portraits + a short paragraph on the name's meaning ("lufu" =
  Old English for love).
- **Aerarium equivalent:** *"Why Aerarium?"* — the name is the Roman **public
  treasury**; the brand is disciplined stewardship of what you own. A calm brand beat.

### 8. Founder / mission — "From the founders of Fitbit: Luffu is tech that shares the mental load of family care"
- Logo, big serif headline, two short mission columns, signed.
- **Aerarium equivalent:** the founder beat we already have in
  `FounderExposureBridge.tsx` ("The spreadsheet stopped answering…", CFA
  charterholder, solo founder) — restyled calmer to match.

### 9. Final CTA — "You don't have to carry it all alone."
- Big emotional headline, "future is almost here", one waitlist bar, then footer.
- **Aerarium equivalent:** a calm closing CTA (e.g. *"Invest with intention.
  Start free on iOS."*) feeding the founder list + TestFlight, then the footer.

---

## What this means for our build

Luffu spends **screens 1–4** purely on "here's what it does, here's how it
answers your worries," each its own calm full-screen moment. Today Aerarium
compresses all of that into the dense `FeatureGrid` + `AppSurfaceStrip`. The plan
(see `docs/LANDING-HANDOFF.md`, section 4) is to **un-cram those into a sequence
of calm one-feature screens** modeled on screens 1–4 here:

1. **The Answer / X-Ray** (Section 3 — built; hidden-exposure reveal + phone).
2. **Policy Score** — one number you can act on (screen 2 model).
3. **Guardrails** — three checks: concentration / drift / trade-check (screen 3 model).
4. **Get your holdings in** — CSV / brokerage / private (screen 4 model).

Keep every feature; give each room. See `social-media-kit/FEATURES.md` for the
feature→question mapping that each screen should lead with.
