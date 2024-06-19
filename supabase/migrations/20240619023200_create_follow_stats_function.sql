drop view followed_count;
drop view following_count;

CREATE
OR REPLACE FUNCTION public.get_followers_count(profile_id uuid) RETURNS int AS $$
BEGIN
  SELECT COUNT(follower_id) AS followers_count
  FROM followed_following
  WHERE follower_id = profile_id;
  RETURN followers_count;
END;
$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION public.get_following_count(profile_id uuid) RETURNS int AS $$
BEGIN
  SELECT COUNT(following_id) AS followers_count
  FROM followed_following
  WHERE following_id = profile_id;
  RETURN following_count;
END;
$$ LANGUAGE plpgsql;
