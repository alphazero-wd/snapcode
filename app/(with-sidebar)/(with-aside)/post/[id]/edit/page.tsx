import { Post } from "@/features/posts/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EditPostForm } from "@/features/posts/edit";

interface PostPageParams {
  params: {
    id: string;
  };
}

export const metadata = {
  title: "Edit post",
};

export default async function PostPage({ params: { id } }: PostPageParams) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
  id,
  content,
  created_at,
  updated_at,
  profiles!fk_creator_id (
    user_id,
    username
  )
`
    )
    .eq("id", id)
    .single<Post>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!data) redirect("/not-found");

  return <EditPostForm content={data.content} postId={data.id} user={user} />;
}
