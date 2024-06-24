import { createClient } from "@/lib/supabase/client";
import { useState, useCallback, useEffect } from "react";
import { PAGE_LIMIT } from "@/constants";
import { usePostsStore } from "../store";
import { Post } from "../types";
import { usePagination } from "../../common/pagination";

interface PostsQueryParams {
  tag?: string;
  profileId?: string;
}

export const usePostsQuery = ({ tag, profileId }: PostsQueryParams) => {
  const supabase = createClient();
  const { reset, posts, updateCursor } = usePostsStore();
  const getPosts = usePostsStore((state) => state.getPosts);
  const cursor = usePostsStore((state) => state.cursor);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  usePagination({ hasMore, loading, items: posts, updateCursor });

  useEffect(() => {
    reset();
  }, []);

  const fetchPosts = useCallback(async () => {
    let query = supabase
      .from("posts")
      .select(
        `
          id,
          content,
          created_at,
          updated_at,
          profiles:fk_creator_id (
            user_id,
            username,
            display_name,
            avatar
          )
        `
      )
      .limit(PAGE_LIMIT + 1)
      .lt("created_at", cursor || new Date().toISOString());

    if (tag) query = query.ilike("content", `%#${tag}%`);
    if (profileId) query = query.filter("profiles.user_id", "eq", profileId);
    const { data } = await query
      .order("created_at", { ascending: false })
      .returns<Post[]>();

    return data || [];
  }, [cursor, tag, profileId]);

  useEffect(() => {
    if (!hasMore) return;
    setLoading(true);
    setTimeout(
      () =>
        fetchPosts()
          .then((data) => {
            const hasMorePosts = data.length === PAGE_LIMIT + 1;
            const newPosts = !hasMorePosts ? data : data.slice(0, -1);
            getPosts(newPosts);
            setHasMore(hasMorePosts);
          })
          .finally(() => setLoading(false)),
      2000
    );
  }, [fetchPosts, hasMore]);

  return { loading };
};
