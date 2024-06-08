import { Post } from "@/features/posts/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/features/ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { EditPostForm } from "@/features/posts/edit";

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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!data) redirect("/not-found");

  return <EditPostForm content={data.content} id={data.id} user={user} />;
}
