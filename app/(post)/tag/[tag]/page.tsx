import { PostsView } from "@/features/posts/view";
import { createClient } from "@/lib/supabase/server";

interface TagPageParams {
  params: {
    tag: string;
  };
}

export default async function TagPage({ params: { tag } }: TagPageParams) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col gap-y-6">
      <PostsView tag={tag} user={user} />
    </div>
  );
}
