import { CardHeader, CardContent } from "@/features/ui/card";
import { PostHeader } from "./header";
import { PostItem } from "./item";
import { Post as IPost } from "../types";
import { User } from "@supabase/supabase-js";
import { Markdown } from "@/features/common/markdown";

interface PostProps {
  post: IPost;
  user: User | null;
}

export const Post = ({ post, user }: PostProps) => {
  return (
    <PostItem>
      <CardHeader>
        <PostHeader
          user={user}
          id={post.id}
          username={post.profiles.username}
          created_at={post.created_at}
          updated_at={post.updated_at}
          creator_id={post.profiles.user_id}
        />
      </CardHeader>
      <CardContent className="text-foreground markdown max-w-full text-sm">
        <Markdown content={post.content} />
      </CardContent>
    </PostItem>
  );
};
