import { Profile } from "@/features/users/types";

export interface Comment {
  id: string;
  post_id: string;
  commenter_id: string;
  content: string;
  created_at: string;
  updated_at?: string;
  replied_to_id?: string;
  profiles: Profile;
  comments: [{ count: number }];
}

export interface EditData {
  id: string;
  content: string;
}

export interface EditPayload {
  id: string;
  content: string;
  updatedAt: string;
  commenterId: string;
}
