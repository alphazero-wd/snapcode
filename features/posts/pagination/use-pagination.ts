import { useState, useCallback, useEffect } from "react";
import { POSTS_LIMIT } from "@/constants";
import { createClient } from "@/lib/supabase/client";
import { Post } from "../types";

const MINIMUM_DEVIATION = 20;
export const usePostsPagination = (tag?: string) => {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const onScroll = useCallback(() => {
    if (!hasMore) return;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight < scrollHeight - MINIMUM_DEVIATION || loading)
      return;

    setCursor(posts.at(-1)?.created_at || null);
  }, [posts, hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("posts")
      .select(
        `
    id,
    content,
    created_at,
    updated_at,
    profiles (
      user_id,
      username
    )
  `
      )
      .limit(POSTS_LIMIT + 1)
      .lt("created_at", cursor || new Date().toISOString())
      .ilike("content", tag ? `%#${tag}%` : "%%")
      .order("created_at", {
        ascending: false,
      })
      .returns<Post[]>();

    return data || [];
  }, [cursor]);

  useEffect(() => {
    if (!hasMore) return;
    setLoading(true);
    setTimeout(
      () =>
        fetchPosts()
          .then((data) => {
            const hasMorePosts = data.length === POSTS_LIMIT + 1;
            const newPosts = !hasMorePosts ? data : data.slice(0, -1);
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setHasMore(hasMorePosts);
          })
          .finally(() => setLoading(false)),
      3000
    );
  }, [fetchPosts, hasMore]);

  return { posts, loading };
};
