CREATE
OR REPLACE FUNCTION public.get_comment_upvotes(id uuid) RETURNS int AS $$
BEGIN
  RETURN (
    SELECT COUNT(voter_id)
    FROM comments_votes
    WHERE id = comments_votes.comment_id
    AND vote::text = 'up'
  );
END;
$$ LANGUAGE plpgsql;
