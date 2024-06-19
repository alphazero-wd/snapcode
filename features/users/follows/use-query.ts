import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { FollowWithProfile } from "../types";
import { PAGE_LIMIT } from "@/constants";

export const useFollowsQuery = (
  type: "follower" | "following",
  profileId: string
) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [follows, setFollows] = useState<FollowWithProfile[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProfiles = async () => {
    const joinType = type === "follower" ? "following" : "follower";
    const { data } = await supabase
      .from("followed_following")
      .select(
        `
        profiles:followed_following_${joinType}_id_fkey!inner (
          user_id,
          avatar_url,
          display_name,
          username,
          created_at
        )
      `
      )
      .limit(PAGE_LIMIT + 1)
      .eq(type + "_id", profileId)
      .lt("profiles.created_at", cursor || new Date().toISOString())
      .order("profiles(created_at)", {
        ascending: false,
      })
      .returns<FollowWithProfile[]>();

    const follows = data || [];
    const hasMoreFollows = follows.length === PAGE_LIMIT + 1;
    const newFollows = hasMoreFollows ? follows.slice(0, -1) : follows;
    setFollows((prev) => [...prev, ...newFollows]);
    setHasMore(hasMoreFollows);
    setLoading(false);
  };

  const updateCursor = () => {
    setCursor(follows.at(-1)?.profiles.created_at || null);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(fetchProfiles, 2000);
  }, [profileId, type, cursor]);
  return { follows, loading, hasMore, updateCursor };
};
