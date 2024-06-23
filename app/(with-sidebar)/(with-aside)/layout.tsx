import { ReactNode } from "react";
import { TrendingTags } from "@/features/posts/tags/trending";

export default function WithAsideLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:flex w-full relative py-8 lg:gap-x-8 px-4 lg:px-6 xl:px-12">
      <main className="w-screen lg:flex-1 lg:max-w-2xl md:w-full">
        {children}
      </main>
      <aside className="lg:sticky w-[300px] flex-shrink-0 lg:top-20 lg:mt-0 mt-8 h-fit">
        <TrendingTags />
      </aside>
    </div>
  );
}
