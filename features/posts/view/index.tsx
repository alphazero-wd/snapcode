"use client";

import { User } from "@supabase/supabase-js";
import { Posts } from "../items";
import { usePostsPagination } from "../pagination";
import { usePostsQuery } from "../query";

interface PostsViewProps {
  tag?: string;
  user: User | null;
}

export const PostsView = ({ tag, user }: PostsViewProps) => {
  const { hasMore, loading } = usePostsQuery({ tag });
  usePostsPagination({ hasMore, loading });

  return <Posts user={user} loading={loading} />;
};
