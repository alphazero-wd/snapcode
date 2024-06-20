import { Markdown } from "@/features/common/markdown";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/features/ui/hover-card";
import { Skeleton } from "@/features/ui/skeleton";
import { Profile } from "@/features/users/types";
import { createClient } from "@/lib/supabase/client";
import { ReactNode, useEffect, useState } from "react";
import { FollowButton } from "@/features/users/follows/button";
import {
  ProfileAvatar,
  ProfileBasicInfo,
  ProfileExtraInfo,
} from "@/features/users/profile";
import { FollowStats } from "../follows/stats";

interface ProfileCardProps {
  username: string;
  renderTrigger: (profile?: Profile | null) => ReactNode;
  userId?: string;
}

const supabase = createClient();
export const ProfileCard = ({
  username,
  userId,
  renderTrigger,
}: ProfileCardProps) => {
  const [profile, setProfile] = useState<Profile | null>();

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select(
        `
        user_id,
        username,
        created_at,
        bio,
        avatar,
        display_name,
        location
      `
      )
      .eq("username", username)
      .single<Profile>();

    setProfile(data);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchProfile();
    }, 2000);
  }, [username]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{renderTrigger(profile)}</HoverCardTrigger>
      <HoverCardContent className="grid w-[320px] md:w-[350px] overflow-hidden gap-y-3 relative">
        <div className="grid gap-y-1">
          <div className="flex items-center justify-between">
            {profile ? (
              <>
                <ProfileAvatar
                  username={profile.username}
                  imageUrl={profile.avatar}
                />
                <FollowButton
                  profileId={profile.user_id}
                  username={profile.username}
                  userId={userId}
                />
              </>
            ) : (
              <>
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </>
            )}
          </div>
          {profile ? (
            <>
              <div className="flex flex-wrap gap-x-3 items-baseline">
                <ProfileBasicInfo
                  displayName={profile.display_name}
                  username={username}
                />
              </div>

              <ProfileExtraInfo
                createdAt={profile.created_at}
                location={profile.location}
              />
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-x-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-32" />
            </>
          )}
          {profile ? (
            <FollowStats
              profileId={profile.user_id}
              username={profile.username}
            />
          ) : (
            <div className="flex gap-x-4">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-2.5 w-20" />
            </div>
          )}
        </div>
        {profile ? (
          <div className="h-fit">
            <Markdown content={profile.bio || ""} />
          </div>
        ) : (
          <div className="space-y-1">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-1/2" />
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
