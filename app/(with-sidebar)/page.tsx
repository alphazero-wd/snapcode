import { CreatePost } from "@/features/posts/create";
import { createClient } from "@/lib/supabase/server";
import { PostsView } from "@/features/posts/view";

export const metadata = {
  title: "Hub for developers to connect",
};

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-y-6">
      <CreatePost user={user} />
      <PostsView user={user} />
    </div>
  );
}
