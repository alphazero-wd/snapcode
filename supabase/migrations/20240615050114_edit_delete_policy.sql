alter table tags_posts
add column creator_id uuid references public.profiles on delete cascade;

drop policy "Users can delete their own posts-tags association" on public.tags_posts;

create policy "Users can delete their own posts-tags association"
on tags_posts for delete
to authenticated
using ( (select auth.uid()) = creator_id );
