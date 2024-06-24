import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { ProfileAvatar } from "../users/profile/avatar";
import { Comment } from "./types";
import { Markdown } from "../common/markdown";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";

interface CommentItem {
  comment: Comment;
}

const MAX_CHARS_TO_SHOW = 100;
const MAX_LINES_TO_SHOW = 3;

export const CommentItem = ({ comment }: CommentItem) => {
  const [showMore, setShowMore] = useState(false);

  const lines = useMemo(
    () =>
      [...comment.content.matchAll(/<p>(.*?)<\/p>/g)].map((match) => match[0]),
    [comment.content]
  );

  const shouldTruncateByCharacters = useMemo(
    () => comment.content.length > MAX_CHARS_TO_SHOW,
    [comment.content.length]
  );

  const shouldTruncateByLines = useMemo(
    () => lines.length > MAX_LINES_TO_SHOW,
    [lines]
  );

  const truncatedContent = useMemo(() => {
    if (showMore) return comment.content;
    const truncatedLineIndex = shouldTruncateByLines
      ? MAX_LINES_TO_SHOW + 1
      : lines.length;

    const truncatedCharIndex = shouldTruncateByCharacters
      ? MAX_CHARS_TO_SHOW + 1
      : comment.content.length;

    return lines
      .slice(0, truncatedLineIndex)
      .join("")
      .slice(0, truncatedCharIndex);
  }, [shouldTruncateByCharacters, comment.content, showMore]);

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
          <Markdown content={truncatedContent} />
          {(shouldTruncateByLines || shouldTruncateByCharacters) && (
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="link"
              className="p-0 text-primary underline underline-offset-4 w-fit h-fit"
            >
              Show {!showMore ? "more" : "less"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
