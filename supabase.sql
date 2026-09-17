-- Livro de mensagens do casamento
-- Execute este arquivo no SQL Editor do seu projeto Supabase.

create table if not exists public.guestbook_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now(),
  is_visible boolean not null default true,
  constraint guestbook_name_length check (char_length(btrim(name)) between 1 and 80),
  constraint guestbook_message_length check (char_length(btrim(message)) between 1 and 800)
);

alter table public.guestbook_messages enable row level security;

revoke all on table public.guestbook_messages from anon, authenticated;
grant select, insert on table public.guestbook_messages to anon, authenticated;

-- Evita erro se o script for executado novamente.
drop policy if exists "Public can read visible guestbook messages" on public.guestbook_messages;
drop policy if exists "Public can add guestbook messages" on public.guestbook_messages;

create policy "Public can read visible guestbook messages"
on public.guestbook_messages
for select
to anon, authenticated
using (is_visible = true);

create policy "Public can add guestbook messages"
on public.guestbook_messages
for insert
to anon, authenticated
with check (
  is_visible = true
  and char_length(btrim(name)) between 1 and 80
  and char_length(btrim(message)) between 1 and 800
);

create index if not exists guestbook_messages_created_at_idx
  on public.guestbook_messages (created_at desc);
