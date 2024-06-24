import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { ProfileAvatar } from "../users/profile/avatar";
import { Comment } from "./types";
import { Markdown } from "../common/markdown";

interface CommentItem {
  comment: Comment;
}

export const CommentItem = ({ comment }: CommentItem) => {
  return (
    <div className="relative flex gap-x-4 w-full">
      <ProfileAvatar username={comment.profiles.username} />
      <div className="space-y-3 w-full">
        <div className="flex flex-row gap-x-4 justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <div>
              <div className="line-clamp-1 text-sm font-semibold text-foreground">
                {comment.profiles.display_name || comment.profiles.username}
              </div>
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
          </div>
        </div>
        <div className="w-full">
          <Markdown content={comment.content} />
        </div>
      </div>
    </div>
  );
};
