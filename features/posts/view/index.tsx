"use client";

import { User } from "@supabase/supabase-js";
import { Posts } from "../items";
import { usePostsQuery } from "../query";
import { usePostsStore } from "../store";
import { Empty } from "../../common/empty";

interface PostsViewProps {
  tag?: string;
  user: User | null;
}

export const PostsView = ({ tag, user }: PostsViewProps) => {
  const { loading } = usePostsQuery({ tag });
  const posts = usePostsStore((state) => state.posts);

  if (!loading && posts.length === 0)
    return (
      <Empty
        title="No posts found at the moment"
        description="Please wait for a while, or refresh the page"
      />
    );

  return <Posts user={user} loading={loading} />;
};
