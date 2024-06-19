CREATE
OR REPLACE FUNCTION public.get_followers_count(profile_id uuid) RETURNS int AS $$
BEGIN
  RETURN (
    SELECT COUNT(follower_id) AS followers_count
    FROM followed_following
    WHERE follower_id = profile_id
  );
END;
$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION public.get_following_count(profile_id uuid) RETURNS int AS $$
BEGIN
  RETURN (
    SELECT COUNT(following_id)
    FROM followed_following
    WHERE following_id = profile_id
  );
END;
$$ LANGUAGE plpgsql;
