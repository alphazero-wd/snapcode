alter table profiles
add column banner_url varchar;

alter table profiles
alter column bio TYPE varchar(200);

create table followed_following(
  follower_id uuid not null references profiles(user_id),
  following_id uuid not null references profiles(user_id)
);
alter table followed_following add primary key (follower_id, following_id);
