"use client";
import { Post } from "./post";
import { POSTS_LIMIT } from "@/constants";
import { PostLoading } from "./loading";
import { Post as IPost } from "../types";
import { User } from "@supabase/supabase-js";

interface PostsProps {
  posts: IPost[];
  loading: boolean;
  user: User | null;
}

export const Posts = ({ posts, loading, user }: PostsProps) => {
  return (
    <>
      {posts.map((post) => (
        <Post user={user} key={post.id} post={post} />
      ))}
      {loading &&
        Array(POSTS_LIMIT)
          .fill(null)
          .map(() => <PostLoading />)}
    </>
  );
};
