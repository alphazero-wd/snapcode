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
  const editData = useCommentsStore((state) => state.editData);
  const enableEditComment = useCommentsStore(
    (state) => state.enableEditComment
  );
  const cancelEditComment = useCommentsStore(
    (state) => state.cancelEditComment
  );
  const deleteComment = useCommentsStore((state) => state.deleteComment);
  const editComment = useCommentsStore((state) => state.editComment);

  return (
    <Comments
      editComment={editComment}
      deleteComment={deleteComment}
      cancelEdit={cancelEditComment}
      enableEditComment={enableEditComment}
      editData={editData}
      comments={comments}
      loading={loading}
      user={user}
    />
  );
};
