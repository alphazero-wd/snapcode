"use client";

import { Button } from "@/features/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/features/ui/use-toast";
import { useLoginModal } from "@/features/auth/login";
import { PostgrestError } from "@supabase/supabase-js";

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
  const [hasFollowed, setHasFollowed] = useState(false);
  const onLoginModalOpen = useLoginModal((state) => state.onOpen);
  const { toast } = useToast();

  const checkHasFollowedPreviously = async () => {
    if (!profileId || !userId) return;
    const { data } = await supabase
      .from("followed_following")
      .select()
      .eq("follower_id", profileId)
      .eq("following_id", userId);
    setHasFollowed(!!data?.length);
  };

  const follow = async () => {
    const { error } = await supabase.from("followed_following").insert({
      follower_id: profileId,
      following_id: userId,
    });
    return error;
  };

  const unfollow = async () => {
    const { error } = await supabase
      .from("followed_following")
      .delete()
      .eq("follower_id", profileId)
      .eq("following_id", userId);

    return error;
  };

  const toggleFollowProfile = async () => {
    if (!userId) {
      onLoginModalOpen();
      return;
    }
    let error: PostgrestError | null = null;
    error = await (hasFollowed ? unfollow() : follow());
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
      setHasFollowed(!hasFollowed);
    }
  };

  useEffect(() => {
    checkHasFollowedPreviously();
  }, [profileId, userId]);

  return (
    <Button
      onClick={toggleFollowProfile}
      variant={hasFollowed ? "outline" : "default"}
    >
      {hasFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
};
