CREATE TYPE vote AS ENUM ('up', 'down');
create table posts_votes(
  post_id uuid not null references posts,
  voter_id uuid not null references profiles,
  vote vote not null,
  primary key (post_id, voter_id)
);

alter table posts_votes enable row level security;

create policy "Upvotes are available to everyone."
on posts_votes for select
to authenticated, anon
using ( vote::text = 'up' );

create policy "Authenticated users can vote others' posts"
on posts_votes for insert
to authenticated
with check ( (select creator_id from posts inner join posts_votes on post_id = posts.id) <> voter_id );

create policy "Authenticated users can change their own vote"
on posts_votes for update
to authenticated
using ( (select auth.uid()) = voter_id );

create policy "Users can unvote their votes"
on posts_votes for delete
using ( (select auth.uid()) = voter_id );

CREATE
OR REPLACE FUNCTION public.get_post_upvotes(post_id uuid) RETURNS int AS $$
BEGIN
  RETURN (
    SELECT COUNT(voter_id)
    FROM posts_votes
    WHERE post_id = posts_votes.post_id
    AND vote::text = 'up'
  );
END;
$$ LANGUAGE plpgsql;
