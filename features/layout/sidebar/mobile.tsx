import { Button } from "@/features/ui/button";
import { DesktopLogo } from "@/features/ui/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/features/ui/sheet";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getUserWithProfile } from "./get-user-with-profile";
import { SidebarLinks } from "./links";
import { SidebarAuth } from "./auth";

export const MobileSidebar = async () => {
  const { profile, user } = await getUserWithProfile();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Bars3Icon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link href="/">
            <DesktopLogo />
          </Link>
          <SidebarLinks profile={profile} />
        </nav>
        <SidebarAuth user={user} />
      </SheetContent>
    </Sheet>
  );
};
