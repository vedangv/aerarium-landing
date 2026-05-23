create table if not exists public.landing_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  referral_code text not null unique,
  referred_by text,
  source text not null default 'landing',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.landing_waitlist enable row level security;

comment on table public.landing_waitlist is
  'Public launch-page waitlist. Writes are performed by the Vercel serverless API using server-side Supabase credentials.';

comment on column public.landing_waitlist.email is
  'Lowercased, trimmed email captured from the Aerarium landing page.';

comment on column public.landing_waitlist.referral_code is
  'Public referral token shown to the user after registration.';
