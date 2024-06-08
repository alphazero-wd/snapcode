"use client";
import {
  EllipsisHorizontalIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/features/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface PostOptionsProps {
  creator_id: string;
}

export const PostOptions = ({ creator_id }: PostOptionsProps) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisHorizontalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LinkIcon className="w-4 h-4 text-muted-foreground" />
            Share link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {creator_id === user?.id && (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PencilIcon className="w-4 h-4 text-muted-foreground" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive hover:text-destructive">
              <TrashIcon className="w-4 h-4 text-destructive" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
