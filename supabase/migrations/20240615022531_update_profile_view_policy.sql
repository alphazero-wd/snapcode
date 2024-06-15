drop policy if exists "Public profiles are visible to everyone." on public.profiles;

create policy "Public profiles are visible to everyone."
on profiles for select
to authenticated, anon         -- the Postgres Role (recommended)
using ( true ); -- the actual Policy
