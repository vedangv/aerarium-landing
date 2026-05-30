# Tracking — How You'll Know What's Working

You already have Vercel Analytics wired into the site, and the waitlist API
records signups. The missing piece was **knowing which post drove which click.**
UTM tags fix that. This page explains them simply.

---

## What a UTM link is (60-second version)

A UTM link is just your normal link with a few labels stuck on the end:

```
https://aerarium.app/?utm_source=instagram&utm_medium=social&utm_campaign=beta_launch&utm_content=nvda_hook
```

The labels don't change where the link goes. They just tell your analytics:
"this click came from **Instagram**, from a **social** post, during the
**beta_launch** campaign, specifically the **nvda_hook** post."

When 12 people click it, you can later see "12 came from the NVDA hook on
Instagram" instead of just "12 people showed up from somewhere."

**You never make these by hand.** They're all pre-built in `LINKS.csv` — just
copy the right row.

---

## The four labels (our convention)

| Label | Means | Our values |
|---|---|---|
| `utm_source` | which platform | `instagram`, `linkedin`, `x`, `reddit`, `bio` |
| `utm_medium` | the kind of placement | `social` (a post), `profile` (bio link), `dm` |
| `utm_campaign` | the launch phase | `beta_launch`, `app_store_launch`, `research_launch` |
| `utm_content` | which specific post/asset | `nvda_hook`, `policy_score`, `founder_story`, `funds_heatmap`, … |

Consistency matters more than cleverness. `instagram` always lowercase, always
spelled the same, or analytics will split it into two buckets.

---

## How to read results (free, no setup)

1. Go to your Vercel project → **Analytics**.
2. Look at **Events** — you already fire `founder_list_signup`,
   `outbound_testflight_click`, and `outbound_research_click`.
3. Use the **filters / referrer + query params** to group by `utm_campaign` and
   `utm_content`.
4. Weekly, ask one question: *which `utm_content` produced the most signups?*
   Make more of that. Drop what got zero.

Tip: also check **Instagram Insights** natively (reach, saves, profile taps,
link taps). On IG, **saves and shares** predict reach better than likes.

---

## Destinations you'll link to

| Where you send people | URL base | When |
|---|---|---|
| Landing page / founder list | `https://aerarium.app/` | Most posts; top-of-funnel |
| Founder list section | `https://aerarium.app/#waitlist` | "Join the launch list" posts |
| TestFlight beta | `https://testflight.apple.com/join/Xna39VKU` | "Try it now" posts |
| Research workspace | `https://research.aerarium.app/` | Research/data posts |

**Note on TestFlight links:** Apple's TestFlight URLs don't always preserve UTM
parameters into analytics. So the convention is: **send most social traffic to
`aerarium.app` (which tracks cleanly), and let the landing page's buttons carry
people to TestFlight** — those button clicks already fire `outbound_testflight_click`.
Only link TestFlight directly when the whole point of the post is "install right
now."

---

## Your bio link (set this once)

Instagram allows one link in your bio. Use:

```
https://aerarium.app/?utm_source=instagram&utm_medium=profile&utm_campaign=beta_launch&utm_content=bio
```

Every "link in bio" caption then points here, and you'll see all bio-driven
traffic grouped under `utm_content=bio`. If you later use a link-in-bio tool
(Linktree etc.), put UTM links *inside* it too.

---

## See `LINKS.csv`

Every link you'll need, pre-tagged, ready to copy. Columns:
`platform, campaign, asset, destination, full_url`. Find your row, copy
`full_url`, paste. Done.
