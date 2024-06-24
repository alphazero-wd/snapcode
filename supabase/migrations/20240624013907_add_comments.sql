drop policy if exists "Public posts are viewable only by authenticated users" on posts;
drop policy if exists "Users can create a profile." on profiles;

drop policy if exists "Authenticated users can vote others' posts" on posts_votes;

create policy "Authenticated users can vote posts"
on posts_votes for insert
to authenticated;

create policy "Authenticated users can create posts"
on posts for insert
to authenticated
with check ( true );

ALTER TABLE posts_votes
DROP CONSTRAINT posts_votes_pkey;

ALTER TABLE posts_votes
ALTER COLUMN post_id DROP NOT NULL,
ALTER COLUMN voter_id DROP NOT NULL,
ADD COLUMN vote_id uuid primary key default uuid_generate_v4(),
drop constraint if exists posts_votes_voter_id_fkey,
drop constraint if exists posts_votes_post_id_fkey;

ALTER TABLE posts_votes
ADD CONSTRAINT fk_voter_id
FOREIGN KEY (voter_id)
REFERENCES profiles
ON DELETE SET NULL;

ALTER TABLE posts_votes
ADD CONSTRAINT fk_post_id
FOREIGN KEY (post_id)
REFERENCES posts
ON DELETE SET NULL;

create table comments(
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts on delete set null,
  commenter_id uuid references profiles on delete set null,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz,
  replied_to_id uuid references comments on delete cascade
);

alter table comments enable row level security;

-- This will set the `updated_at` column on every update
create trigger handle_updated_at before update on comments
  for each row execute procedure moddatetime (updated_at);

create policy "Public comments are viewable by everyone"
on comments for select
to authenticated, anon
using ( true );

create policy "Authenticated users can create comments"
on comments for insert
to authenticated
with check ( true );

create policy "User can update their own comment."
on comments for update
to authenticated
using ( (select auth.uid()) = commenter_id )
with check ( (select auth.uid()) = commenter_id );

create policy "User can delete their own comment."
on comments for delete
to authenticated
using ( (select auth.uid()) = commenter_id );

create table comments_votes(
  vote_id uuid primary key,
  comment_id uuid references comments on delete set null,
  voter_id uuid references profiles on delete set null,
  vote vote not null
);

alter table comments_votes enable row level security;

create policy "Upvotes are available to everyone."
on comments_votes for select
to authenticated, anon
using ( vote::text = 'up' );

create policy "Authenticated users can vote comments"
on comments_votes for insert
to authenticated
with check ( true );

create policy "Authenticated users can change their own vote"
on comments_votes for update
to authenticated
using ( (select auth.uid()) = voter_id );

create policy "Users can unvote their votes"
on comments_votes for delete
using ( (select auth.uid()) = voter_id );

CREATE
OR REPLACE FUNCTION public.get_comment_upvotes(id uuid) RETURNS int AS $$
BEGIN
  RETURN (
    SELECT COUNT(voter_id)
    FROM comments_votes
    WHERE id = comments_votes.voter_id
    AND vote::text = 'up'
  );
END;
$$ LANGUAGE plpgsql;

create policy "User can see both their own upvotes and downvotes."
on comments_votes for select
to authenticated
using ( (select auth.uid()) = voter_id );
