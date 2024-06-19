import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { FollowWithProfile } from "../types";

const supabase = createClient();

export const useFollowsQuery = (
  type: "follower" | "following",
  profileId: string
) => {
  const [loading, setLoading] = useState(false);
  const [follows, setFollows] = useState<FollowWithProfile[]>([]);

  const fetchProfiles = async () => {
    const { data } = await supabase
      .from("followed_following")
      .select(
        `
        *,
        profiles!followed_following_${
          type === "follower" ? "following" : "follower"
        }_id_fkey (
          user_id,
          avatar_url,
          display_name,
          username
        )
      `
      )
      .eq(type + "_id", profileId)
      .returns<FollowWithProfile[]>();

    setFollows(data || []);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(fetchProfiles, 2000);
  }, [profileId, type]);
  return { follows, loading };
};
