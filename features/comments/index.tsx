"use client";

import { PAGE_LIMIT } from "../../constants";
import { Skeleton } from "../ui/skeleton";
import { CommentItem } from "./item";
import { CommentLoading } from "./loading";
import { useCommentsQuery } from "./use-query";
import { useCommentsStore } from "./use-store";

interface CommentsProps {
  postId: string;
}

export const Comments = ({ postId }: CommentsProps) => {
  const { loading } = useCommentsQuery(postId);
  const comments = useCommentsStore((state) => state.comments);

  return (
    <ul className="space-y-4 w-full">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
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
