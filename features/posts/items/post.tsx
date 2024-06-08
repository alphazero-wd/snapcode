import ReactMarkdown from "react-markdown";
import { CardHeader, CardContent } from "@/features/ui/card";
import { PostHeader } from "./header";
import { PostItem } from "./item";
import { Post as IPost } from "../types";

interface PostProps {
  post: IPost;
}

export const Post = ({ post }: PostProps) => {
  return (
    <PostItem post={post}>
      <CardHeader>
        <PostHeader
          id={post.id}
          username={post.users.raw_user_meta_data.username}
          created_at={post.created_at}
          updated_at={post.updated_at}
          creator_id={post.users.id}
        />
      </CardHeader>
      <CardContent className="text-foreground markdown max-w-full overflow-hidden text-sm">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </CardContent>
    </PostItem>
  );
};
