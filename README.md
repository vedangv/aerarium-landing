# Aerarium Landing

Standalone Vercel project for the Aerarium launch page.

This project is intentionally separate from:

- `website` / FinSight (`https://finsight-beryl.vercel.app/`)
- `Aerarium_Web`
- `Aerarium_Claude` / iOS app source

The landing page may link to FinSight, but it should not be deployed over either existing project.

## Public repo boundary

This repository is safe to keep public only while it remains a marketing surface:

- no Supabase keys or Vercel environment files
- no iOS app source code
- no private product docs or sprint plans
- no user data, screenshots with real personal data, or internal credentials

Current production landing project: `aerarium-landing` on Vercel.
Current iOS beta CTA: `https://testflight.apple.com/join/Xna39VKU`.

## Founder launch list

The “Get launch updates” form posts to the Vercel serverless route
`/api/waitlist`, which writes to `public.landing_waitlist` in the Aerarium
Supabase project. The public copy frames this as App Store launch updates,
founder pricing notes, and product release news, not gated beta access.

Required Vercel environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_DASHBOARD_PASSWORD`

The service-role key is server-side only. Do not expose it through `VITE_`,
`NEXT_PUBLIC_`, static assets, or client-side code. The table has RLS enabled
and no public read/write policies; submissions go through the Vercel function.

Admin view:

- `/admin/waitlist`
- Protected by `ADMIN_DASHBOARD_PASSWORD`
- Shows latest launch-list signups, referral codes, referred-by attribution,
  and signup referral counts.

Local checks:

```bash
npm test
npm run lint
npm run build
```
