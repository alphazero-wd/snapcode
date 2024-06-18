import { Navbar } from "@/features/layout/navbar";
import { DesktopSidebar, MobileSidebar } from "@/features/layout/sidebar";
import { DeletePostModal } from "@/features/posts/items/delete-modal";
import { TrendingTags } from "@/features/posts/tags/trending";
import React from "react";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DesktopSidebar />

      <div className="flex flex-col">
        <header className="px-4 lg:px-6 xl:px-12 sticky top-0 h-14 z-50 lg:h-[60px] w-full flex items-center border-b bg-muted/40 backdrop-blur-xl">
          <MobileSidebar />
          <Navbar />
        </header>
        <div className="grid relative py-8 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_400px] lg:gap-x-8 px-4 lg:px-6 xl:px-12">
          <main>{children}</main>
          <aside className="lg:sticky lg:top-20 lg:mt-0 mt-8 h-fit">
            <TrendingTags />
          </aside>
        </div>
      </div>
      <DeletePostModal />
    </div>
  );
}
