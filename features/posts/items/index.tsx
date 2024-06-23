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
    <ul className="space-y-4 w-full">
      {posts.map((post) => (
        <li key={post.id}>
          <Post user={user} post={post} />
        </li>
      ))}
      {loading &&
        Array(PAGE_LIMIT)
          .fill(null)
          .map((_, i) => (
            <li key={i}>
              <PostLoading />
            </li>
          ))}
    </ul>
  );
};
