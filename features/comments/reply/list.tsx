import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/features/ui/button";
import { useRepliesQuery } from "./use-query";
import { Comments } from "../list/items";
import { User } from "@supabase/supabase-js";

interface RepliesProps {
  count: number;
  commentId: string;
  user: User | null;
  depth?: number;
}

export const Replies = ({ user, count, commentId }: RepliesProps) => {
  const { loading, updateCursor, replies, fetchMoreReplies, hasMore } =
    useRepliesQuery(count, commentId);

  return (
    <div className="space-y-4">
      <Comments user={user} comments={replies} loading={loading} />
      {hasMore && (
        <Button
          onClick={() => {
            updateCursor();
            fetchMoreReplies();
          }}
          disabled={loading}
          className="w-fit h-8 rounded-full bg-transparent gap-x-2 text-primary hover:bg-primary/10"
          variant="secondary"
        >
          <span>View more replies</span>
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
