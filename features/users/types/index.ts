export interface Profile {
  user_id: string;
  username: string;
  bio?: string;
  avatar?: string;
  display_name?: string;
  created_at: string;
  banner?: string;
  location?: string;
}

export interface FollowWithProfile {
  profiles: Omit<Profile, "bio">;
}
