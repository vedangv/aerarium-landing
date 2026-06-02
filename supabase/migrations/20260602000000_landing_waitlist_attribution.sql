alter table public.landing_waitlist
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text;

comment on column public.landing_waitlist.utm_source is
  'Traffic platform captured from the landing page query string.';

comment on column public.landing_waitlist.utm_medium is
  'Traffic medium captured from the landing page query string.';

comment on column public.landing_waitlist.utm_campaign is
  'Launch campaign captured from the landing page query string.';

comment on column public.landing_waitlist.utm_content is
  'Specific post or asset identifier captured from the landing page query string.';
