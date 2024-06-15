export interface Post {
  id: string;
  content: string;
  created_at: string;
  updated_at: string | null;
  profiles: {
    user_id: string;
    username: string;
  };
}

export interface TrendingTag {
  name: string;
  count: number;
}
