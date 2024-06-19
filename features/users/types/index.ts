export interface Profile {
  user_id: string;
  username: string;
  bio?: string;
  avatar_url?: string;
  display_name?: string;
  created_at: string;
}

export interface FollowWithProfile {
  profiles: Omit<Profile, "bio">;
}
