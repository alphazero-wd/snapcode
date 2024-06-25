"use client";

import { PAGE_LIMIT } from "@/constants";
import { CommentLoading } from "./loading";
import { useCommentsQuery } from "./use-query";
import { useCommentsStore } from "../use-store";
import { CommentItem } from "./item";
import { User } from "@supabase/supabase-js";
import { Comment, EditData } from "../types";

interface CommentsProps {
  user: User | null;
  comments: Comment[];
  loading: boolean;
  editData: EditData | null;
  enableEditComment: (id: string) => void;
  cancelEdit: () => void;
}

export const Comments = ({
  loading,
  comments,
  user,
  editData,
  enableEditComment,
  cancelEdit,
}: CommentsProps) => {
  return (
    <ul className="space-y-8 w-full">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem
            cancelEdit={cancelEdit}
            editData={editData}
            enableEditComment={enableEditComment}
            user={user}
            comment={comment}
          />
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
