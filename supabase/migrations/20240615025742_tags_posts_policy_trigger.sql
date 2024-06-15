alter table tags_posts enable row level security;

create policy "Tags-posts association are viewable by everyone"
on tags_posts for select
to authenticated, anon
using ( true );

create policy "Authenticated users can create tags-posts association"
on tags_posts for insert
to authenticated
with check ( true );
