import { Navbar } from "@/features/layout/navbar";
import { DesktopSidebar, MobileSidebar } from "@/features/layout/sidebar";
import { DeletePostModal } from "@/features/posts/items/delete-modal";
import React from "react";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <DesktopSidebar />

        <div className="flex flex-col">
          <header className="px-4 lg:px-6 xl:px-12 sticky top-0 h-14 z-50 lg:h-[60px] w-full flex items-center border-b bg-muted/40 backdrop-blur-xl">
            <MobileSidebar />
            <Navbar />
          </header>
          {children}
        </div>
      </div>
      <DeletePostModal />
    </>
  );
}
