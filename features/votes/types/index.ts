export enum Vote {
  Up = "up",
  Down = "down",
}

export interface Updoot {
  post_id: string;
  voter_id: string;
  vote: Vote;
}
