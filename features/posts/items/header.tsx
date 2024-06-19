"use client";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { Avatar, AvatarFallback } from "@/features/ui/avatar";
import { PostOptions } from "./options";
import { User } from "@supabase/supabase-js";
import { ProfileCard } from "@/features/users/profile/card";
import { Button } from "@/features/ui/button";
import Link from "next/link";

interface PostHeaderProps {
  id: string;
  username: string;
  created_at: string;
  updated_at: string | null;
  creator_id: string;
  user: User | null;
}

export const PostHeader = ({
  id,
  username,
  created_at,
  updated_at,
  creator_id,
  user,
}: PostHeaderProps) => {
  return (
    <div className="flex w-full gap-x-4 flex-row justify-between items-center">
      <div className="flex gap-x-4 items-center">
        <Avatar>
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <ProfileCard
            renderTrigger={(profile) => (
              <Button
                asChild
                variant="link"
                className="p-0 w-fit h-fit font-semibold line-clamp-1 text-sm"
              >
                <Link href={`/user/${username}/profile`}>
                  {profile?.display_name || username}
                </Link>
              </Button>
            )}
            userId={user?.id}
            username={username}
          />
          <div
            suppressHydrationWarning
            className="text-muted-foreground text-xs line-clamp-1"
          >
            created{" "}
            {formatDistanceToNowStrict(new Date(created_at), {
              addSuffix: true,
            })}
            {updated_at &&
              ` (edited ${formatDistanceToNowStrict(new Date(updated_at), {
                addSuffix: true,
              })})`}
          </div>
        </div>
      </div>
      <PostOptions id={id} creator_id={creator_id} user_id={user?.id} />
    </div>
  );
};
