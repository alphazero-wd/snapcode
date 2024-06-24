ALTER TABLE posts_votes
DROP CONSTRAINT fk_voter_id,
ADD CONSTRAINT fk_voter_id
FOREIGN KEY (voter_id)
REFERENCES profiles
ON DELETE CASCADE;

ALTER TABLE posts_votes
DROP CONSTRAINT fk_post_id,
ADD CONSTRAINT fk_post_id
FOREIGN KEY (post_id)
REFERENCES posts
ON DELETE CASCADE;

ALTER TABLE comments_votes
DROP CONSTRAINT comments_votes_voter_id_fkey,
ADD CONSTRAINT fk_voter_id
FOREIGN KEY (voter_id)
REFERENCES profiles
ON DELETE CASCADE;

ALTER TABLE comments_votes
DROP CONSTRAINT comments_votes_comment_id_fkey,
ADD CONSTRAINT fk_comment_id
FOREIGN KEY (comment_id)
REFERENCES comments
ON DELETE CASCADE;

ALTER TABLE posts_votes
DROP COLUMN vote_id,
ALTER COLUMN post_id SET NOT NULL,
ALTER COLUMN voter_id SET NOT NULL,
ADD PRIMARY KEY (post_id, voter_id);

ALTER TABLE comments_votes
DROP COLUMN vote_id,
ALTER COLUMN comment_id SET NOT NULL,
ALTER COLUMN voter_id SET NOT NULL,
ADD PRIMARY KEY (comment_id, voter_id);
