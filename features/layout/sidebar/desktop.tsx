import { DesktopLogo } from "@/features/ui/logo";
import Link from "next/link";
import { SidebarAuth } from "./auth";
import { getUserWithProfile } from "./get-user-with-profile";
import { SidebarLinks } from "./links";

export const DesktopSidebar = async () => {
  const { user, profile } = await getUserWithProfile();

  return (
    <div className="h-screen md:w-[220px] lg:w-[280px] sticky top-0 hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="px-1">
            <DesktopLogo />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <SidebarLinks isMobile={false} profile={profile} />
          </nav>
        </div>
        <SidebarAuth isMobile={false} user={user} />
      </div>
    </div>
  );
};
