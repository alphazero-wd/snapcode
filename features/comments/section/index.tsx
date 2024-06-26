"use client";

import { useEffect } from "react";
import { useCommentsStore } from "../use-store";
import { CommentForm } from "../create";
import { CommentsList } from "../list";
import { User } from "@supabase/supabase-js";

interface CommentsSectionProps {
  count: number;
  user: User | null;
  postId: string;
}
export const CommentsSection = ({
  count,
  user,
  postId,
}: CommentsSectionProps) => {
  const commentsCount = useCommentsStore((state) => state.count);
  const getCommentsCount = useCommentsStore((state) => state.getCommentsCount);

  useEffect(() => {
    getCommentsCount(count);
  }, [count]);

  return (
    <section id="comments" className="space-y-6">
      <h2 className="text-lg font-bold tracking-tight">
        Comments ({commentsCount})
      </h2>
      <CommentForm postId={postId} user={user} />
      <CommentsList user={user} postId={postId} />
    </section>
  );
};
