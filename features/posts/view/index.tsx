"use client";

import { Posts } from "../items";
import { usePostsPagination } from "../pagination";

interface PostsViewProps {
  tag?: string;
}

export const PostsView = ({ tag }: PostsViewProps) => {
  const { posts, loading } = usePostsPagination(tag);
  return <Posts posts={posts} loading={loading} />;
};
