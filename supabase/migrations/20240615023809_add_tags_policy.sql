alter table tags enable row level security;

create policy "Tags are viewable by everyone"
on tags for select
to authenticated, anon
using ( true );

create policy "Authenticated users can create tags"
on tags for insert
to authenticated
with check ( true );

create policy "Authenticated users can update tags"
on tags for update
to authenticated
with check ( true );

create policy "Authenticated users can delete tags"
on tags for delete
to authenticated;
