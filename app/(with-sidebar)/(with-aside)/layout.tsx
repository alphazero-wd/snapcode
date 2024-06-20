import { ReactNode } from "react";
import { TrendingTags } from "@/features/posts/tags/trending";

export default function WithAsideLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid relative py-8 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_400px] lg:gap-x-8 xl:gap-x-16 px-4 lg:px-6 xl:px-12">
      <main>{children}</main>
      <aside className="lg:sticky lg:top-20 lg:mt-0 mt-8 h-fit">
        <TrendingTags />
      </aside>
    </div>
  );
}
