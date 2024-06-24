export enum Vote {
  Up = "up",
  Down = "down",
}

export interface PostVote extends IVote {
  post_id: string;
}

interface IVote {
  voter_id: string;
  vote: Vote;
}

export interface CommentVote extends IVote {
  comment_id: string;
}
