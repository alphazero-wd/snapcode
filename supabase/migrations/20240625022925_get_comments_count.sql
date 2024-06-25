CREATE
OR REPLACE FUNCTION public.get_comments_count(pid uuid) RETURNS int AS $$
BEGIN
  RETURN (
    SELECT COUNT(id)
    FROM comments
    WHERE pid = comments.post_id
    AND reply_to_id IS NULL
  );
END;
$$ LANGUAGE plpgsql;
