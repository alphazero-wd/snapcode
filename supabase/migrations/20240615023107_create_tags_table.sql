create table tags (
  id uuid primary key default uuid_generate_v4(),
  name varchar unique
);

create table tags_posts(
  post_id uuid not null references public.posts on delete cascade,
  tag_id uuid not null references public.tags on delete cascade
);
