"use client";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { Avatar, AvatarFallback } from "@/features/ui/avatar";
import { PostOptions } from "./options";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

interface PostHeaderProps {
  id: string;
  username: string;
  created_at: string;
  updated_at: string | null;
  creator_id: string;
}

export const PostHeader = ({
  id,
  username,
  created_at,
  updated_at,
  creator_id,
}: PostHeaderProps) => {
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setCurrentUser(user));
  }, [supabase]);

  return (
    <div className="flex w-full flex-row justify-between items-center">
      <div className="flex gap-x-4 items-center">
        <Avatar>
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold line-clamp-1 text-sm">{username}</div>
          <div className="text-muted-foreground text-xs line-clamp-1">
            created{" "}
            {formatDistanceToNowStrict(new Date(created_at), {
              addSuffix: true,
            })}
            {updated_at &&
              ` (edit ${formatDistanceToNowStrict(new Date(updated_at), {
                addSuffix: true,
              })})`}
          </div>
        </div>
      </div>
      <PostOptions id={id} creator_id={creator_id} user_id={currentUser?.id} />
    </div>
  );
};
