"use client";
import { usePostsQuery } from "@/features/posts/query";
import { User } from "@supabase/supabase-js";
import { Posts } from "@/features/posts/items";
import { usePagination } from "@/features/common/pagination";
import { usePostsStore } from "@/features/posts/store";
import { useEffect } from "react";
import { Empty } from "@/features/common/empty";

interface ProfilePostsProps {
  tag?: string;
  user: User | null;
  profileId: string;
}

export const ProfilePosts = ({ tag, user, profileId }: ProfilePostsProps) => {
  const { hasMore, loading } = usePostsQuery({ tag, profileId });
  const { posts, reset, updateCursor } = usePostsStore();
  usePagination({ hasMore, loading, items: posts, updateCursor });
  useEffect(() => {
    reset();
  }, []);

  if (!loading && posts.length === 0)
    return (
      <Empty
        title="No posts found at the moment"
        description={
          (user?.id === profileId ? "You have" : "The user has") +
          " not post anything"
        }
      />
    );

  return <Posts loading={loading} user={user} />;
};
