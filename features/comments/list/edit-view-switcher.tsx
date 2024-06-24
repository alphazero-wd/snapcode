"use client";
import { User } from "@supabase/supabase-js";
import { EditCommentForm } from "../edit";
import { CommentContent } from "./content";
import { useCommentsStore } from "../use-store";

interface EditViewSwitcherProps {
  user: User | null;
  content: string;
  commentId: string;
}

export const EditViewSwitcher = ({
  user,
  content,
  commentId,
}: EditViewSwitcherProps) => {
  const editData = useCommentsStore((state) => state.editData);

  if (editData)
    return (
      <EditCommentForm user={user} content={content} commentId={commentId} />
    );

  return <CommentContent content={content} />;
};
