import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { ProfileAvatar } from "../../users/profile/avatar";
import { CommentOptions } from "./options";
import { Comment } from "../types";
import { EditViewSwitcher } from "./edit-view-switcher";
import { User } from "@supabase/supabase-js";
import { ProfileCard } from "../../users/profile/card";
import { Button } from "../../ui/button";
import Link from "next/link";
import { VotesButton } from "../../votes/button";

interface CommentItem {
  comment: Comment;
  user: User | null;
}

export const CommentItem = ({ comment, user }: CommentItem) => {
  return (
    <div className="relative flex gap-x-4 w-full">
      <ProfileAvatar username={comment.profiles.username} />
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
          />
        </div>
        <EditViewSwitcher
          content={comment.content}
          user={user}
          commentId={comment.id}
        />
        <VotesButton id={comment.id} type="comment" userId={user?.id} />
      </div>
    </div>
  );
};
