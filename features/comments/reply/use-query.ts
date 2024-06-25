import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { Comment } from "../types";
import { PAGE_LIMIT } from "@/constants";

interface RepliesQueryPayload {
  count: number;
  commentId: string;
  replies: Comment[];
  appendReplies: (newReplies: Comment[]) => void;
}

export const useRepliesQuery = ({
  count,
  commentId,
  replies,
  appendReplies,
}: RepliesQueryPayload) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  useEffect(() => {
    setHasMore(count > 0);
  }, [count]);

  const fetchReplies = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        created_at,
        updated_at,
        commenter_id,
        profiles:comments_commenter_id_fkey(
          display_name,
          username,
          avatar
        ),
        comments(count)
      `
      )
      .limit(PAGE_LIMIT + 1)
      .eq("replied_to_id", commentId)
      .order("created_at", { ascending: false })
      .lt("created_at", cursor || new Date().toISOString())
      .returns<Comment[]>();
    appendReplies(data || []);
    setHasMore(data?.length === PAGE_LIMIT + 1);
    setLoading(false);
  }, [supabase, commentId, cursor]);

  const updateCursor = () => setCursor(replies.at(-1)?.created_at || null);

  const fetchMoreReplies = () => {
    if (!hasMore) return;
    updateCursor();
    setLoading(true);
    setTimeout(fetchReplies, 2000);
  };

  return { loading, fetchMoreReplies, hasMore };
};
