import { VotesButton } from "@/features/votes/button";
import { Button } from "@/features/ui/button";
import { useState } from "react";
import { useLoginModal } from "../../auth/login";
import { ReplyForm } from "../reply/form";
import { User } from "@supabase/supabase-js";

interface VotesReplySwitcherProps {
  user: User | null;
  commentId: string;
  postId: string;
}

export const VotesReplySwitcher = ({
  user,
  commentId,
  postId,
}: VotesReplySwitcherProps) => {
  const [isReplyMode, setIsReplyMode] = useState(false);
  const onLoginModalOpen = useLoginModal((state) => state.onOpen);
  const enableReply = () => {
    if (!user) onLoginModalOpen();
    setIsReplyMode(true);
  };

  if (isReplyMode)
    return (
      <ReplyForm
        disableReply={() => setIsReplyMode(false)}
        commentId={commentId}
        user={user}
        postId={postId}
      />
    );

  return (
    <div className="h-8 flex gap-x-4 items-center">
      <VotesButton id={commentId} type="comment" userId={user?.id} />
      <Button
        onClick={enableReply}
        className="rounded-full h-8"
        variant="ghost"
      >
        Reply
      </Button>
    </div>
  );
};
