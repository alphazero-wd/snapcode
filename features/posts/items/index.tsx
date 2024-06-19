"use client";
import { Post } from "./post";
import { PAGE_LIMIT } from "@/constants";
import { PostLoading } from "./loading";
import { User } from "@supabase/supabase-js";
import { usePostsStore } from "../store";

interface PostsProps {
  loading: boolean;
  user: User | null;
}

export const Posts = ({ loading, user }: PostsProps) => {
  const posts = usePostsStore((state) => state.posts);
  return (
    <div className="grid gap-y-4">
      {posts.map((post) => (
        <Post user={user} key={post.id} post={post} />
      ))}
      {loading &&
        Array(PAGE_LIMIT)
          .fill(null)
          .map((_, i) => <PostLoading key={i} />)}
    </div>
  );
};
