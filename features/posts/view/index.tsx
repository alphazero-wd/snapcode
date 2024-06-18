"use client";

import { User } from "@supabase/supabase-js";
import { Posts } from "../items";
import { usePostsPagination } from "../pagination";
import { usePostsStore } from "../store";

interface PostsViewProps {
  tag?: string;
  user: User | null;
}

export const PostsView = ({ tag, user }: PostsViewProps) => {
  const { loading } = usePostsPagination(tag);
  const posts = usePostsStore((state) => state.posts);

  return <Posts user={user} posts={posts} loading={loading} />;
};
