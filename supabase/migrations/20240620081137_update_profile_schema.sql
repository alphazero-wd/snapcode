alter table profiles
add constraint unique_username unique(username);

alter table profiles
add column location varchar(60);

alter table profiles
add column birthday date;

alter table profiles
rename column avatar_url to avatar;

alter table profiles
rename column banner_url to banner;
