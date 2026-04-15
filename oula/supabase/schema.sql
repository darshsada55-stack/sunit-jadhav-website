-- ────────────────────────────────────────────────────────────────────────────
-- Oula – Supabase Database Schema
-- Run this in the Supabase SQL editor to set up your project.
-- ────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension (already enabled in Supabase by default)
create extension if not exists "pgcrypto";

-- ── Tables ──────────────────────────────────────────────────────────────────

create table public.users (
  id           uuid primary key default gen_random_uuid(),
  auth_id      uuid references auth.users(id) on delete cascade,
  name         text not null,
  email        text,
  avatar_url   text,
  invite_code  text unique not null,
  expo_push_token text,
  created_at   timestamptz default now() not null
);

create table public.connections (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references public.users(id) on delete cascade not null,
  connected_user_id  uuid references public.users(id) on delete cascade not null,
  created_at         timestamptz default now() not null,
  unique(user_id, connected_user_id)
);

create table public.voice_notes (
  id           uuid primary key default gen_random_uuid(),
  sender_id    uuid references public.users(id) on delete cascade not null,
  recipient_id uuid references public.users(id) on delete cascade not null,
  audio_url    text not null,
  duration     integer not null default 0,
  played       boolean not null default false,
  play_count   integer not null default 0,
  created_at   timestamptz default now() not null
);

-- ── Storage ─────────────────────────────────────────────────────────────────
-- Create a 'voice-notes' storage bucket in Supabase Dashboard > Storage
-- Set it to public so audio URLs can be accessed without auth tokens
-- (or use signed URLs if you prefer stricter access control)

-- ── Indexes ──────────────────────────────────────────────────────────────────

create index idx_connections_user_id          on public.connections(user_id);
create index idx_connections_connected_user   on public.connections(connected_user_id);
create index idx_voice_notes_sender           on public.voice_notes(sender_id);
create index idx_voice_notes_recipient        on public.voice_notes(recipient_id);
create index idx_voice_notes_created          on public.voice_notes(created_at);
create index idx_users_invite_code            on public.users(invite_code);
create index idx_users_auth_id               on public.users(auth_id);

-- ── Row-Level Security ───────────────────────────────────────────────────────

alter table public.users         enable row level security;
alter table public.connections   enable row level security;
alter table public.voice_notes   enable row level security;

-- Users: anyone authenticated can read any user (for profile lookups by invite code)
create policy "Users are readable by authenticated users"
  on public.users for select
  to authenticated
  using (true);

create policy "Users can insert their own profile"
  on public.users for insert
  to authenticated
  with check (auth.uid() = auth_id);

create policy "Users can update their own profile"
  on public.users for update
  to authenticated
  using (auth.uid() = auth_id);

-- Connections: users can read/insert their own connections
create policy "Users can read their connections"
  on public.connections for select
  to authenticated
  using (
    user_id in (select id from public.users where auth_id = auth.uid())
    or connected_user_id in (select id from public.users where auth_id = auth.uid())
  );

create policy "Users can create connections"
  on public.connections for insert
  to authenticated
  with check (
    user_id in (select id from public.users where auth_id = auth.uid())
  );

-- Voice notes: sender or recipient can read; only sender can insert
create policy "Participants can read voice notes"
  on public.voice_notes for select
  to authenticated
  using (
    sender_id in (select id from public.users where auth_id = auth.uid())
    or recipient_id in (select id from public.users where auth_id = auth.uid())
  );

create policy "Authenticated users can send voice notes"
  on public.voice_notes for insert
  to authenticated
  with check (
    sender_id in (select id from public.users where auth_id = auth.uid())
  );

create policy "Recipient can mark voice notes as played"
  on public.voice_notes for update
  to authenticated
  using (
    recipient_id in (select id from public.users where auth_id = auth.uid())
  );

-- ── Realtime ─────────────────────────────────────────────────────────────────
-- Enable realtime on voice_notes so the chat screen gets live updates
alter publication supabase_realtime add table public.voice_notes;
alter publication supabase_realtime add table public.connections;
