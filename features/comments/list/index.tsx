"use client";

import { User } from "@supabase/supabase-js";
import { useCommentsStore } from "../use-store";
import { Comments } from "./items";
import { useCommentsQuery } from "./use-query";

interface CommentsListProps {
  postId: string;
  user: User | null;
}

export const CommentsList = ({ postId, user }: CommentsListProps) => {
  const { loading } = useCommentsQuery(postId);
  const comments = useCommentsStore((state) => state.comments);

  return <Comments comments={comments} loading={loading} user={user} />;
};
