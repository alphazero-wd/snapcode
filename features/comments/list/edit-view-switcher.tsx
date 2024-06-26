"use client";
import { User } from "@supabase/supabase-js";
import { EditCommentForm } from "../edit";
import { EditData } from "../types";
import { Markdown } from "@/features/common/markdown";

interface EditViewSwitcherProps {
  user: User | null;
  content: string;
  commentId: string;
  editData: EditData | null;
  cancelEdit: () => void;
  editComment: (id: string, content: string, updatedAt: string) => void;
}

export const EditViewSwitcher = ({
  user,
  content,
  commentId,
  editData,
  cancelEdit,
  editComment,
}: EditViewSwitcherProps) => {
  if (editData && commentId === editData.id)
    return (
      <EditCommentForm
        editComment={editComment}
        cancelEdit={cancelEdit}
        user={user}
        content={content}
        commentId={commentId}
      />
    );

  return <Markdown content={content} />;
};
