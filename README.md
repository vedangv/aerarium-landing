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
