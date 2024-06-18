import { Post } from "@/features/posts/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostHeader } from "@/features/posts/items/header";
import { Button } from "@/features/ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Markdown } from "@/features/common/markdown";

interface PostPageParams {
  params: {
    id: string;
  };
}

export default async function PostPage({ params: { id } }: PostPageParams) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("posts")
    .select(
      `
  id,
  content,
  created_at,
  updated_at,
  profiles (
    user_id,
    username
  )
`
    )
    .eq("id", id)
    .single<Post>();
  if (!data) redirect("/not-found");

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex items-center flex-1 w-full gap-x-4">
        <Button
          size="icon"
          className="hidden md:inline-flex rounded-full flex-shrink-0 w-8 h-8 items-center"
          variant="outline"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </Button>
        <PostHeader
          user={user}
          id={id}
          username={data.profiles.username}
          created_at={data.created_at}
          updated_at={data.updated_at}
          creator_id={data.profiles.user_id}
        />
      </div>

      <div className="text-foreground sm:ml-12 markdown text-sm">
        <Markdown content={data.content} />
      </div>
    </div>
  );
}
