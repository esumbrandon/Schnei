-- Schnei Database Schema for Supabase
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends auth.users)
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  auth_provider text default 'email',
  preferences jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Account connections table
create table if not exists public.account_connections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  provider text not null,
  connection_type text not null check (connection_type in ('oauth', 'email', 'manual', 'card')),
  status text default 'active' check (status in ('active', 'inactive', 'error', 'pending')),
  encrypted_token text,
  last_sync_at timestamp with time zone,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Subscriptions table
create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  account_connection_id uuid references public.account_connections(id) on delete set null,
  service_name text not null,
  plan_name text,
  price numeric(10, 2) not null,
  currency text default 'USD',
  cadence text not null check (cadence in ('daily', 'weekly', 'monthly', 'quarterly', 'annual')),
  next_bill_date date not null,
  status text default 'active' check (status in ('active', 'paused', 'cancelled', 'trial')),
  payment_method_id uuid,
  category text,
  logo_url text,
  website_url text,
  notes text,
  raw_metadata jsonb default '{}'::jsonb,
  verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Payment methods table
create table if not exists public.payment_methods (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  type text not null check (type in ('card', 'bank', 'paypal', 'other')),
  masked_details text not null,
  provider text,
  encrypted_token text,
  is_default boolean default false,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Events/audit log table
create table if not exists public.events (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  action text not null,
  source text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Notifications table
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  type text not null check (type in ('renewal_reminder', 'trial_ending', 'price_increase', 'duplicate_found', 'sync_error')),
  title text not null,
  message text not null,
  subscription_id uuid references public.subscriptions(id) on delete cascade,
  read boolean default false,
  sent_at timestamp with time zone,
  scheduled_for timestamp with time zone,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_subscriptions_status on public.subscriptions(status);
create index if not exists idx_subscriptions_next_bill_date on public.subscriptions(next_bill_date);
create index if not exists idx_account_connections_user_id on public.account_connections(user_id);
create index if not exists idx_payment_methods_user_id on public.payment_methods(user_id);
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_notifications_read on public.notifications(read);
create index if not exists idx_events_user_id on public.events(user_id);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.account_connections enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payment_methods enable row level security;
alter table public.events enable row level security;
alter table public.notifications enable row level security;

-- RLS Policies

-- Users policies
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Account connections policies
create policy "Users can view own connections"
  on public.account_connections for select
  using (auth.uid() = user_id);

create policy "Users can insert own connections"
  on public.account_connections for insert
  with check (auth.uid() = user_id);

create policy "Users can update own connections"
  on public.account_connections for update
  using (auth.uid() = user_id);

create policy "Users can delete own connections"
  on public.account_connections for delete
  using (auth.uid() = user_id);

-- Subscriptions policies
create policy "Users can view own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can insert own subscriptions"
  on public.subscriptions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own subscriptions"
  on public.subscriptions for update
  using (auth.uid() = user_id);

create policy "Users can delete own subscriptions"
  on public.subscriptions for delete
  using (auth.uid() = user_id);

-- Payment methods policies
create policy "Users can view own payment methods"
  on public.payment_methods for select
  using (auth.uid() = user_id);

create policy "Users can insert own payment methods"
  on public.payment_methods for insert
  with check (auth.uid() = user_id);

create policy "Users can update own payment methods"
  on public.payment_methods for update
  using (auth.uid() = user_id);

create policy "Users can delete own payment methods"
  on public.payment_methods for delete
  using (auth.uid() = user_id);

-- Events policies
create policy "Users can view own events"
  on public.events for select
  using (auth.uid() = user_id);

create policy "Users can insert own events"
  on public.events for insert
  with check (auth.uid() = user_id);

-- Notifications policies
create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

-- Functions

-- Function to automatically create user profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, avatar_url, auth_provider)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_app_meta_data->>'provider', 'email')
  );
  return new;
end;
$$;

-- Trigger to create user profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
create trigger handle_users_updated_at before update on public.users
  for each row execute procedure public.handle_updated_at();

create trigger handle_account_connections_updated_at before update on public.account_connections
  for each row execute procedure public.handle_updated_at();

create trigger handle_subscriptions_updated_at before update on public.subscriptions
  for each row execute procedure public.handle_updated_at();

create trigger handle_payment_methods_updated_at before update on public.payment_methods
  for each row execute procedure public.handle_updated_at();
