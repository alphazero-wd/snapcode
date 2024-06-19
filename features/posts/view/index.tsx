"use client";

import { User } from "@supabase/supabase-js";
import { Posts } from "../items";
import { usePagination } from "@/features/common/pagination";
import { usePostsQuery } from "../query";
import { usePostsStore } from "../store";
import { useEffect } from "react";
import { Empty } from "../../common/empty";

interface PostsViewProps {
  tag?: string;
  user: User | null;
}

export const PostsView = ({ tag, user }: PostsViewProps) => {
  const { hasMore, loading } = usePostsQuery({ tag });
  const { reset, posts, updateCursor } = usePostsStore();
  usePagination({ hasMore, loading, items: posts, updateCursor });

  useEffect(() => {
    reset();
  }, []);

  if (!loading && posts.length === 0)
    return (
      <Empty
        title="No posts found at the moment"
        description="Please wait for a while, or refresh the page"
      />
    );

  return <Posts user={user} loading={loading} />;
};
