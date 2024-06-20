ALTER TABLE public.profiles
DROP CONSTRAINT fk_user_id,
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES auth.users (id)
ON DELETE CASCADE;

ALTER TABLE followed_following
DROP CONSTRAINT followed_following_following_id_fkey,
ADD CONSTRAINT fk_following_id
FOREIGN KEY (following_id)
REFERENCES profiles(user_id)
ON DELETE CASCADE;

ALTER TABLE followed_following
DROP CONSTRAINT followed_following_follower_id_fkey,
ADD CONSTRAINT fk_follower_id
FOREIGN KEY (follower_id)
REFERENCES profiles(user_id)
ON DELETE CASCADE;
