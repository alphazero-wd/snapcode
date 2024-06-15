
drop policy if exists "Authenticated users can update tags" on tags;

drop policy if exists "Authenticated users can delete tags" on tags;

create policy "Users can delete their own posts-tags association"
on tags_posts for delete
to authenticated;                     -- the Postgres Role (recommended)
