"use client";
import { Button } from "@/features/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeftStartOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { User } from "@supabase/supabase-js";
import { useMemo } from "react";
import { useLogOut } from "./use-log-out";
import { useLoginModal } from "@/features/auth/login";

export const SidebarAuth = ({
  user,
  isMobile = true,
}: {
  user: User | null;
  isMobile?: boolean;
}) => {
  const { onSignOut } = useLogOut();
  const { onOpen } = useLoginModal();

  const onAuthClick = async () => {
    if (user) onSignOut(user);
    else onOpen();
  };

  const Icon = useMemo(
    () => (!user ? LockClosedIcon : ArrowLeftStartOnRectangleIcon),
    [user]
  );

  return (
    <nav className="px-0 mt-auto lg:px-4 pb-4">
      <Button
        onClick={onAuthClick}
        variant="ghost"
        className={cn(
          isMobile
            ? "gap-4 rounded-xl text-lg mx-[-0.65rem]"
            : "gap-3 rounded-lg",
          "flex justify-start w-full items-center px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        {user ? "Log out" : "Log in"}
      </Button>
    </nav>
  );
};
