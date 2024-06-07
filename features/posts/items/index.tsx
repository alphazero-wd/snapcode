import { createClient } from "@/lib/supabase/server";
import { PostItem } from "./item";
import { Post } from "../types";

export const Posts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
  id,
  content,
  created_at,
  updated_at,
  users (
    id,
    raw_user_meta_data
  )
`
    )
    .limit(10)
    .order("created_at", {
      ascending: false,
    })
    .returns<Post[]>();
  if (error || !data) return null;
  return data.map((post) => <PostItem post={post} />);
};
