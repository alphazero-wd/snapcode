import { useCallback, useEffect } from "react";
import { usePostsStore } from "../store";

const MINIMUM_DEVIATION = 20;

interface PostsPagination {
  hasMore: boolean;
  loading: boolean;
}

export const usePostsPagination = ({ hasMore, loading }: PostsPagination) => {
  const posts = usePostsStore((state) => state.posts);
  const updateCursor = usePostsStore((state) => state.updateCursor);
  const reset = usePostsStore((state) => state.reset);

  const onScroll = useCallback(() => {
    if (!hasMore) return;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight < scrollHeight - MINIMUM_DEVIATION || loading)
      return;

    updateCursor();
  }, [posts, hasMore, loading]);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
};
