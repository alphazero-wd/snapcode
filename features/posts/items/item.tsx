import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader } from "@/features/ui/card";
import { Button } from "@/features/ui/button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Post } from "../types";
import { PostHeader } from "./header";

interface PostItemProps {
  post: Post;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <Card className="relative flex flex-col h-80">
      <div className="absolute h-1/3 bottom-0 w-full bg-gradient-to-b from-transparent to-gray-300/70 backdrop-blur-sm" />

      <Button
        asChild
        variant="outline"
        className="absolute self-center bottom-4"
      >
        <Link href={`/post/${post.id}`}>
          Read more <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </Button>
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
    </Card>
  );
};
