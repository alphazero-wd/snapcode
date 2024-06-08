import { Post } from "@/features/posts/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostHeader } from "@/features/posts/items/header";
import { Button } from "@/features/ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface PostPageParams {
  params: {
    id: string;
  };
}

export default async function PostPage({ params: { id } }: PostPageParams) {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select(
      `
  id,
  content,
  created_at,
  updated_at,
  users (
    id,
    raw_user_meta_data
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
          id={id}
          username={data.users.raw_user_meta_data.username}
          created_at={data.created_at}
          updated_at={data.updated_at}
          creator_id={data.users.id}
        />
      </div>

      <div className="text-foreground sm:ml-12 markdown overflow-hidden text-sm">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>
    </div>
  );
}
