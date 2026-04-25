-- HSG Capital Investment (suggested schema)
-- NOTE: apply via Supabase SQL editor or migrations as needed.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  country text,
  capital_range text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz default now(),
  metadata jsonb
);

create table if not exists landing_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  session_id text,
  event_type text not null,
  event_data jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_created_at on leads(created_at);
create index if not exists idx_events_lead on landing_events(lead_id);
create index if not exists idx_events_type on landing_events(event_type);

