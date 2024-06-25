import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/features/ui/button";
import { Comments } from "../list/items";
import { User } from "@supabase/supabase-js";
import { useRepliesContext } from "./use-context";

interface RepliesProps {
  user: User | null;
}

export const Replies = ({ user }: RepliesProps) => {
  const {
    hasMore,
    replies,
    loading,
    fetchMoreReplies,
    editData,
    enableEditReply,
    cancelEditReply,
    deleteReply,
    editReply,
  } = useRepliesContext();

  return (
    <div>
      <Comments
        editComment={editReply}
        deleteComment={deleteReply}
        editData={editData}
        cancelEdit={cancelEditReply}
        enableEditComment={enableEditReply}
        user={user}
        comments={replies}
        loading={loading}
      />
      {hasMore && (
        <Button
          onClick={fetchMoreReplies}
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
