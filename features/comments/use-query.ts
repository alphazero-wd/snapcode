import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { Comment } from "./types";
import { usePagination } from "@/features/common/pagination";
import { PAGE_LIMIT } from "@/constants";
import { useCommentsStore } from "./use-store";

export const useCommentsQuery = (postId: string) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { comments, getComments, cursor, reset, updateCursor } =
    useCommentsStore();

  useEffect(() => {
    reset();
  }, [postId]);

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        created_at,
        updated_at,
        profiles:comments_commenter_id_fkey(
          display_name,
          username,
          avatar
        )
      `
      )
      .limit(PAGE_LIMIT + 1)
      .is("replied_to_id", null)
      .eq("post_id", postId)
      .order("created_at", { ascending: false })
      .lt("created_at", cursor || new Date().toISOString())
      .returns<Comment[]>();
    setHasMore(data?.length === PAGE_LIMIT + 1);
    getComments(data || []);
    setLoading(false);
  }, [supabase, postId, cursor]);

  useEffect(() => {
    if (!hasMore) return;
    setLoading(true);
    setTimeout(fetchComments, 2000);
  }, [fetchComments, hasMore]);

  usePagination({ updateCursor, loading, items: comments, hasMore });

  return { loading };
};
