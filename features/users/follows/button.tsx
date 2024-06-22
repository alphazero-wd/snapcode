"use client";

import { Button } from "@/features/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/features/ui/use-toast";
import { useLoginModal } from "@/features/auth/login";
import { PostgrestError } from "@supabase/supabase-js";
import { useFollowsStore } from "./use-store";

const supabase = createClient();

interface FollowButtonProps {
  profileId: string;
  username: string;
  userId?: string;
}

export const FollowButton = ({
  profileId,
  username,
  userId,
}: FollowButtonProps) => {
  const {
    follow,
    unfollow,
    followingIds,
    decrementFollowingCount,
    incrementFollowingCount,
  } = useFollowsStore();
  const onLoginModalOpen = useLoginModal((state) => state.onOpen);
  const { toast } = useToast();

  const checkHasFollowedPreviously = async () => {
    if (!profileId || !userId) return;
    const { data } = await supabase
      .from("followed_following")
      .select()
      .eq("follower_id", profileId)
      .eq("following_id", userId);
    if (data?.length) follow(profileId);
  };

  const followProfile = async () => {
    const { error } = await supabase.from("followed_following").insert({
      follower_id: profileId,
      following_id: userId,
    });
    follow(profileId);
    incrementFollowingCount();
    return error;
  };

  const unfollowProfile = async () => {
    const { error } = await supabase
      .from("followed_following")
      .delete()
      .eq("follower_id", profileId)
      .eq("following_id", userId);
    decrementFollowingCount();
    unfollow(profileId);
    return error;
  };
  const hasFollowed = followingIds.has(profileId);

  const toggleFollowProfile = async () => {
    if (!userId) {
      onLoginModalOpen();
      return;
    }
    let error: PostgrestError | null = null;
    error = await (hasFollowed ? unfollowProfile() : followProfile());
    if (error)
      toast({
        variant: "error",
        title: (hasFollowed ? "Unfollow" : "Follow") + " failed",
        description: error.message,
      });
    else {
      toast({
        variant: "success",
        title: (hasFollowed ? "Unfollow" : "Follow") + " successfully",
        description: `Successfully ${
          hasFollowed ? "unfollow" : "follow"
        } @${username}`,
      });
    }
  };

  useEffect(() => {
    checkHasFollowedPreviously();
  }, [profileId, userId]);

  if (profileId === userId) return;

  return (
    <Button
      onClick={toggleFollowProfile}
      variant={hasFollowed ? "outline" : "default"}
    >
      {hasFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
};
