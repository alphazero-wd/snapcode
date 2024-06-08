import Link from "next/link";
import { Navbar } from "@/features/layout/navbar";
import { DesktopLogo, MobileLogo } from "@/features/ui/logo";
import React from "react";
import { DeletePostModal } from "@/features/posts/items/delete-modal";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="h-14 w-full flex items-center shadow backdrop-blur-xl bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <div className="flex items-center justify-between gap-4 max-w-7xl container">
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
      <main className="grid py-8 container max-w-7xl lg:grid-cols-[1fr_300px] lg:gap-x-6 px-4 lg:px-6">
        <div>{children}</div>
      </main>
      <DeletePostModal />
    </>
  );
}
