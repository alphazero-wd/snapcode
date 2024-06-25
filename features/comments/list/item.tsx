import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { ProfileAvatar } from "@/features/users/profile/avatar";
import { CommentOptions } from "./options";
import { Comment, EditData } from "../types";
import { EditViewSwitcher } from "./edit-view-switcher";
import { User } from "@supabase/supabase-js";
import { ProfileCard } from "@/features/users/profile/card";
import { Button } from "@/features/ui/button";
import Link from "next/link";
import { VotesReplySwitcher } from "./votes-reply-switcher";
import { createClient } from "@/lib/supabase/client";
import { getAvatarUrl } from "@/features/users/profile/get-avatar-url";
import { Replies } from "../reply/list";
import { RepliesContextProvider } from "../reply/use-context";

interface CommentItem {
  comment: Comment;
  user: User | null;
  editData: EditData | null;
  enableEditComment: (id: string) => void;
  cancelEdit: () => void;
}

export const CommentItem = ({
  comment,
  user,
  editData,
  enableEditComment,
  cancelEdit,
}: CommentItem) => {
  const supabase = createClient();
  return (
    <div className="relative flex gap-x-4 w-full">
      <ProfileAvatar
        avatar={getAvatarUrl(supabase, comment.profiles.avatar)}
        username={comment.profiles.username}
      />
      <div className="space-y-3 w-full">
        <div className="flex flex-row gap-x-4 justify-between items-center">
          <div>
            <ProfileCard
              renderTrigger={() => (
                <Button
                  variant="link"
                  className="p-0 h-fit w-fit line-clamp-1 font-semibold"
                  asChild
                >
                  <Link href={`/user/${comment.profiles.username}`}>
                    {comment.profiles.display_name || comment.profiles.username}
                  </Link>
                </Button>
              )}
              username={comment.profiles.username}
              userId={user?.id}
            />
            <div
              suppressHydrationWarning
              className="text-muted-foreground text-xs line-clamp-1"
            >
              created{" "}
              {formatDistanceToNowStrict(new Date(comment.created_at), {
                addSuffix: true,
              })}
              {comment.updated_at &&
                ` (edited ${formatDistanceToNowStrict(
                  new Date(comment.updated_at),
                  {
                    addSuffix: true,
                  }
                )})`}
            </div>
          </div>
          <CommentOptions
            userId={user?.id}
            id={comment.id}
            commenterId={comment.commenter_id}
            enableEditComment={enableEditComment}
          />
        </div>
        <EditViewSwitcher
          cancelEdit={cancelEdit}
          editData={editData}
          content={comment.content}
          user={user}
          commentId={comment.id}
        />
        <VotesReplySwitcher
          user={user}
          postId={comment.post_id}
          commentId={comment.id}
        />
        {comment.comments[0].count > 0 && (
          <RepliesContextProvider
            commentId={comment.id}
            count={comment.comments[0].count}
          >
            <Replies user={user} />
          </RepliesContextProvider>
        )}
      </div>
    </div>
  );
};
