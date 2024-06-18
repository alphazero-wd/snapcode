"use client";
import { usePostsQuery } from "@/features/posts/query";
import { User } from "@supabase/supabase-js";
import { Posts } from "@/features/posts/items";
import { usePostsPagination } from "@/features/posts/pagination";

interface ProfilePostsProps {
  tag?: string;
  user: User | null;
  profileId: string;
}

export const ProfilePosts = ({ tag, user, profileId }: ProfilePostsProps) => {
  const { hasMore, loading } = usePostsQuery({ tag, profileId });
  usePostsPagination({ hasMore, loading });
  return <Posts loading={loading} user={user} />;
};
