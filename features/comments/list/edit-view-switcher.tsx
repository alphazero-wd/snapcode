"use client";
import { User } from "@supabase/supabase-js";
import { EditCommentForm } from "../edit";
import { CommentContent } from "./content";
import { EditData } from "../types";

interface EditViewSwitcherProps {
  user: User | null;
  content: string;
  commentId: string;
  editData: EditData | null;
  cancelEdit: () => void;
}

export const EditViewSwitcher = ({
  user,
  content,
  commentId,
  editData,
  cancelEdit,
}: EditViewSwitcherProps) => {
  if (editData)
    return (
      <EditCommentForm
        cancelEdit={cancelEdit}
        user={user}
        content={content}
        commentId={commentId}
      />
    );

  return <CommentContent content={content} />;
};
