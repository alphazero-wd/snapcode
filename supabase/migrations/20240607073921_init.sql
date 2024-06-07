create table posts(
  id uuid primary key default gen_random_uid(),
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz,
  creator_id uuid not null references auth.users
);

create extension if not exists moddatetime schema extensions;

-- This will set the `updated_at` column on every update
create trigger handle_updated_at before update on posts
  for each row execute procedure moddatetime (updated_at);

alter table posts enable row level security;

create policy "Public posts are viewable by everyone"
on posts for select
to authenticated, anon
using ( true );

create policy "Public posts are viewable only by authenticated users"
on posts for insert
to authenticated
with check ( true );

create policy "User can update their own post."
on posts for update
to authenticated                    -- the Postgres Role (recommended)
using ( (select auth.uid()) = creator_id )       -- checks if the existing row complies with the policy expression
with check ( (select auth.uid()) = creator_id ); -- checks if the new row complies with the policy expression

create policy "User can delete their own post."
on posts for delete
to authenticated                     -- the Postgres Role (recommended)
using ( (select auth.uid()) = creator_id );      -- the actual Policy
