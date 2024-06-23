"use client";
import { useCutContent } from "@/features/common/hooks";
import { Button } from "@/features/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/features/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import { PostHeader } from "./header";
import { Post } from "../types";
import { User } from "@supabase/supabase-js";
import { Markdown } from "@/features/common/markdown";
import { VotesButton } from "@/features/votes/button";

interface PostItemProps {
  post: Post;
  user: User | null;
}

const MAX_HEIGHT = 300;

export const PostItem = ({ post, user }: PostItemProps) => {
  const { ref, shouldCut, unCut } = useCutContent(MAX_HEIGHT);

  return (
    <Card className="relative flex flex-col">
      <CardHeader>
        <PostHeader
          user={user}
          id={post.id}
          username={post.profiles.username}
          created_at={post.created_at}
          avatar={post.profiles.avatar}
          updated_at={post.updated_at}
          creator_id={post.profiles.user_id}
        />
      </CardHeader>
      <CardContent
        ref={ref}
        className={cn(
          shouldCut && "max-h-80 overflow-hidden",
          "text-foreground relative p-0 max-w-full text-sm"
        )}
      >
        <div className="p-6">
          <Markdown content={post.content} />
        </div>
        {shouldCut && (
          <div className="flex w-full h-full justify-center">
            <div className="absolute h-32 bottom-0 w-full bg-gradient-to-b from-transparent to-muted/70 backdrop-blur-sm" />
            <Button
              variant="outline"
              className="absolute bottom-4 gap-x-2"
              onClick={unCut}
            >
              Read more <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="w-full py-4 border-t bg-card rounded-b-xl sticky bottom-0">
        <VotesButton userId={user?.id} postId={post.id} />
      </CardFooter>
    </Card>
  );
};
