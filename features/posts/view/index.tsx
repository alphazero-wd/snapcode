"use client";

import { User } from "@supabase/supabase-js";
import { Posts } from "../items";
import { usePostsPagination } from "../pagination";

interface PostsViewProps {
  tag?: string;
  user: User | null;
}

export const PostsView = ({ tag, user }: PostsViewProps) => {
  const { posts, loading } = usePostsPagination(tag);
  return <Posts user={user} posts={posts} loading={loading} />;
};
