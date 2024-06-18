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
import { cn } from "@/lib/utils";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns/format";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProfileCardProps {
  username: string;
}

const supabase = createClient();
export const ProfileCard = ({ username }: ProfileCardProps) => {
  const [profile, setProfile] = useState<Profile | null>();

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select(
        `
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

  const linesCount = (profile?.bio || "").split("\n").length;

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
      <HoverCardContent
        className={cn(
          "max-h-80",
          "grid overflow-hidden w-[320px] sm:w-[350px] gap-y-3 relative"
        )}
      >
        {linesCount >= 5 && (
          <div className="absolute rounded-b-xl h-16 bottom-0 w-full bg-gradient-to-b from-transparent to-muted/70 backdrop-blur-sm" />
        )}
        <div className="grid gap-y-1">
          <div className="flex items-center justify-between">
            {profile ? (
              <>
                <Avatar>
                  <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button>Follow</Button>
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
                <div className="text-xl line-clamp-1 font-semibold text-foreground">
                  {profile.display_name || username}
                </div>
                <div className="text-muted-foreground line-clamp-1 text-sm">
                  @{username}
                </div>
              </div>
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
