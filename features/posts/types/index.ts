export interface Post {
  id: string;
  content: string;
  created_at: string;
  updated_at: string | null;
  users: {
    id: string;
    raw_user_meta_data: {
      username: string;
    };
  };
}
