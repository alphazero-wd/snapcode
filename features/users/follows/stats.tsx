"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/features/ui/button";
import { useFollowsStore } from "./use-store";

interface FollowStatsProps {
  profileId: string;
  username: string;
}

const supabase = createClient();
export const FollowStats = ({ profileId, username }: FollowStatsProps) => {
  const followingCountSinceLastRefresh = useFollowsStore(
    (state) => state.followingCount
  );
  const [followedCount, setFollowedCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const fetchFollowStats = async () => {
    const { data: followedData } = await supabase.rpc("get_followers_count", {
      profile_id: profileId,
    });
    setFollowedCount(followedData || 0);

    const { data: followingData } = await supabase.rpc("get_following_count", {
      profile_id: profileId,
    });
    setFollowingCount(followingData || 0);
  };

  useEffect(() => {
    fetchFollowStats();
  }, [profileId]);

  return (
    <div className="flex gap-x-4">
      <Button className="p-0 h-fit w-fit font-normal" variant="link">
        <Link href={`/user/${username}/followers`}>
          <span className="font-semibold">
            {followedCount + followingCountSinceLastRefresh}
          </span>{" "}
          <span>followed</span>
        </Link>
      </Button>
      <Button className="p-0 h-fit w-fit font-normal" variant="link">
        <Link href={`/user/${username}/following`}>
          <span className="font-semibold">{followingCount}</span>{" "}
          <span>following</span>
        </Link>
      </Button>
    </div>
  );
};
