import { useCallback, useEffect } from "react";

const MINIMUM_DEVIATION = 20;

interface Pagination<T> {
  items: T[];
  hasMore: boolean;
  loading: boolean;
  updateCursor: () => void;
}

export const usePagination = <T>({
  hasMore,
  loading,
  items,
  updateCursor,
}: Pagination<T>) => {
  const onScroll = useCallback(() => {
    if (!hasMore) return;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight < scrollHeight - MINIMUM_DEVIATION || loading)
      return;

    updateCursor();
  }, [items, hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
};
