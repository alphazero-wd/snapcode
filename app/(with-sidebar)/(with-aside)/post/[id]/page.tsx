import { Post } from "@/features/posts/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostHeader } from "@/features/posts/items/header";
import { Button } from "@/features/ui/button";
import {
  ChatBubbleOvalLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Markdown } from "@/features/common/markdown";
import { VotesButton } from "@/features/votes/button";
import { DeleteCommentModal } from "@/features/comments/delete/modal";
import { CommentsSectionLink } from "@/features/comments/section/link";
import { CommentsSection } from "../../../../../features/comments/section";

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
  profiles:fk_creator_id (
    user_id,
    username,
    avatar
  )
`
    )
    .eq("id", id)
    .single<Post>();

  if (!data) redirect("/not-found");

  const { data: count } = await supabase.rpc("get_comments_count", {
    pid: id,
  });

  return (
    <>
      <div className="flex flex-col relative gap-y-5">
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
            avatar={data.profiles.avatar}
            username={data.profiles.username}
            created_at={data.created_at}
            updated_at={data.updated_at}
            creator_id={data.profiles.user_id}
          />
        </div>

        <div className="sm:ml-12 space-y-6">
          <div className="text-foreground markdown text-sm">
            <Markdown content={data.content} />
          </div>
          <div className="border-t flex gap-x-4 items-center bg-card sticky bottom-0 py-4">
            <VotesButton type="post" id={data.id} userId={user?.id} />
            <CommentsSectionLink />
          </div>

          <CommentsSection postId={data.id} user={user} count={count} />
        </div>
      </div>
      <DeleteCommentModal />
    </>
  );
}
