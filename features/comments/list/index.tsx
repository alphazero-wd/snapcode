"use client";

import { PAGE_LIMIT } from "@/constants";
import { CommentLoading } from "./loading";
import { useCommentsQuery } from "./use-query";
import { useCommentsStore } from "../use-store";
import { CommentItem } from "./item";
import { User } from "@supabase/supabase-js";

interface CommentsProps {
  postId: string;
  user: User | null;
}

export const Comments = ({ postId, user }: CommentsProps) => {
  const { loading } = useCommentsQuery(postId);
  const comments = useCommentsStore((state) => state.comments);

  return (
    <ul className="space-y-8 w-full">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem user={user} comment={comment} />
        </li>
      ))}
      {loading &&
        Array(PAGE_LIMIT)
          .fill(null)
          .map((_, i) => (
            <li key={i}>
              <CommentLoading />
            </li>
          ))}
    </ul>
  );
};
