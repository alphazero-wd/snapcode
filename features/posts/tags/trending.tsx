import { createClient } from "@/lib/supabase/server";
import { Button } from "@/features/ui/button";
import Link from "next/link";
import { TrendingTag } from "../types";

export const TrendingTags = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from("trending_tags")
    .select()
    .order("count", { ascending: false })
    .limit(10)
    .returns<TrendingTag[]>();

  if (!data) return null;

  return (
    <div>
      <h2 className="text-xl tracking-tight font-semibold mb-2">
        Trending Topics
      </h2>
      <div className="flex gap-2 flex-wrap">
        {data.map((tag) => (
          <Button
            className="p-0 h-fit w-fit text-primary"
            variant="link"
            key={tag.name}
            asChild
          >
            <Link href={`/tag/${tag.name}`}>#{tag.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
