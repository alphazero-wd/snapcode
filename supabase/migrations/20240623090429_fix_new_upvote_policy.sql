drop policy if exists "Authenticated users can vote others' posts" on posts_votes;

create policy "User can see both their own upvotes and downvotes."
on posts_votes for select
to authenticated
using ( (select auth.uid()) = voter_id );
