DROP FUNCTION get_post_upvotes(uuid);
CREATE
OR REPLACE FUNCTION public.get_post_upvotes(id uuid) RETURNS int AS $$
BEGIN
  RETURN (
    SELECT COUNT(voter_id)
    FROM posts_votes
    WHERE id = posts_votes.post_id
    AND vote::text = 'up'
  );
END;
$$ LANGUAGE plpgsql;

drop policy "Authenticated users can vote others' posts" on posts_votes;

create policy "Authenticated users can vote posts"
on posts_votes for insert
to authenticated
with check (true);
