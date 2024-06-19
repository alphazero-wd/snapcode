alter table followed_following enable row level security;

create policy "Anyone users can view others' followers"
on followed_following for select
to authenticated, anon
using ( true );

create policy "Authenticated users can follow OTHER authenticated users"
on followed_following for insert
to authenticated
with check ( follower_id <> following_id ); -- checks if the new row complies with the policy expression

create policy "Authenticated users can unfollow"
on followed_following for delete
to authenticated;
