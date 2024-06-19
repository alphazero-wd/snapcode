import { Markdown } from "@/features/common/markdown";
import { Avatar, AvatarFallback } from "@/features/ui/avatar";
import { Button } from "@/features/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/features/ui/hover-card";
import { Skeleton } from "@/features/ui/skeleton";
import { Profile } from "@/features/users/types";
import { createClient } from "@/lib/supabase/client";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns/format";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FollowButton } from "@/features/users/follow/button";
import { ProfileBasicInfo } from "../../users/profile";

interface ProfileCardProps {
  username: string;
  userId?: string;
}
const content = `Software dev @DavidPatelSF | Java, Python, C++ | Agile, Docker, Kubernetes | Stanford CS alum | Built personal project mgmt tool with React & Node.js | Reading, chess, hiking`;

const supabase = createClient();
export const ProfileCard = ({ username, userId }: ProfileCardProps) => {
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
        avatar_url
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
      <HoverCardTrigger asChild>
        <Button
          asChild
          variant="link"
          className="p-0 w-fit h-fit font-semibold line-clamp-1 text-sm"
        >
          <Link href={`/user/${username}/profile`}>{username}</Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="grid w-[320px] md:w-[350px] overflow-hidden gap-y-3 relative">
        <div className="grid gap-y-1">
          <div className="flex items-center justify-between">
            {profile ? (
              <>
                <Avatar>
                  <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                {profile.user_id !== userId && (
                  <FollowButton
                    profileId={profile.user_id}
                    username={profile.username}
                    userId={userId}
                  />
                )}
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
              <ProfileBasicInfo
                displayName={profile.display_name || username}
                username={username}
              />
              <div className="text-muted-foreground flex items-center text-sm gap-x-2">
                <CalendarDaysIcon className="w-4 h-4" />
                Joined {format(new Date(profile.created_at), "MMMM y")}
              </div>
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
        </div>
        {profile ? (
          <div className="h-fit">
            <Markdown content={profile.bio || content} />
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
