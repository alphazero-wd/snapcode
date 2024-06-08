"use client";
import { Post } from "./post";
import { POSTS_LIMIT } from "@/constants";
import { PostLoading } from "./loading";
import { Post as IPost } from "../types";

interface PostsProps {
  posts: IPost[];
  loading: boolean;
}

export const Posts = ({ posts, loading }: PostsProps) => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading &&
        Array(POSTS_LIMIT)
          .fill(null)
          .map(() => <PostLoading />)}
    </>
  );
};
