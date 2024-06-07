import { Post } from "@/features/posts/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostHeader } from "@/features/posts/items/header";
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
      <PostHeader
        username={data.users.raw_user_meta_data.username}
        created_at={data.created_at}
        updated_at={data.updated_at}
        creator_id={data.users.id}
      />
      <div className="text-foreground prose max-w-full overflow-hidden text-sm">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>
    </div>
  );
}
