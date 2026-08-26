create table if not exists public.faqs (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.faqs enable row level security;

drop policy if exists "Public read published faqs" on public.faqs;

create policy "Public read published faqs"
  on public.faqs for select to anon, authenticated
  using (published = true);

grant select on table public.faqs to anon, authenticated;
grant all on table public.faqs to service_role;
