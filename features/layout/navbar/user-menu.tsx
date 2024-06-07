"use client";

import { createClient } from "@/lib/supabase/client";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/features/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "@/features/ui/button";
import { useToast } from "@/features/ui/use-toast";
import { useRouter } from "next/navigation";

const supabase = createClient();
export const UserMenu = ({ user }: { user: User | null }) => {
  const { toast } = useToast();
  const router = useRouter();
  if (!user) return null;
  const onSignOut = async () => {
    await supabase.auth.signOut();
    const { dismiss } = toast({
      variant: "success",
      title: "Sign out successfully!",
    });
    setTimeout(dismiss, 3000);
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full flex-shrink-0"
        >
          <UserCircleIcon className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>@{user.user_metadata.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${user.user_metadata.username}/profile`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${user.user_metadata.username}/settings`}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
