import Link from "next/link";
import { Navbar } from "@/features/layout/navbar";
import { DesktopLogo, MobileLogo } from "@/features/ui/logo";
import React from "react";
import { DeletePostModal } from "@/features/posts/items/delete-modal";
import { TrendingTags } from "@/features/posts/tags/trending";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="h-14 z-50 relative w-full flex items-center shadow backdrop-blur-xl bg-muted/40 lg:h-[60px]">
        <div className="flex items-center justify-between gap-4 max-w-7xl container px-4 lg:px-6">
          <div>
            <Link href="/">
              <div className="hidden md:block">
                <DesktopLogo />
              </div>
              <div className="md:hidden">
                <MobileLogo />
              </div>
            </Link>
          </div>
          <Navbar />
        </div>
      </header>
      <div className="grid relative py-8 container max-w-7xl lg:grid-cols-[1fr_300px] lg:gap-x-16 px-4 lg:px-6">
        <main>{children}</main>
        <aside className="lg:sticky lg:top-8 lg:mt-0 mt-8 h-fit">
          <TrendingTags />
        </aside>
      </div>
      <DeletePostModal />
    </>
  );
}
