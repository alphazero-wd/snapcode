drop policy "Authenticated users can unfollow" on followed_following;

create policy "Users can unfollow their own followers"
on followed_following for delete
to authenticated
using ((select auth.uid()) = following_id);

create view followed_count as
select count(follower_id)
from followed_following;

create view following_count as
select count(following_id)
from followed_following;
