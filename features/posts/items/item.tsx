"use client";
import { Card } from "@/features/ui/card";
import { Button } from "@/features/ui/button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Post } from "../types";
import React, { useEffect, useRef, useState } from "react";

interface PostItemProps {
  post: Post;
  children: React.ReactNode;
}

const MAX_HEIGHT = 300;

export const PostItem = ({ post, children }: PostItemProps) => {
  const [shouldCut, setShouldCut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const height = ref.current.getBoundingClientRect().height;

    if (height >= MAX_HEIGHT) setShouldCut(true);
  }, [ref]);

  return (
    <Card className="relative flex flex-col max-h-80">
      {shouldCut && (
        <>
          <div className="absolute h-32 bottom-0 w-full bg-gradient-to-b from-transparent to-gray-300/70 backdrop-blur-sm" />
          <Button
            asChild
            variant="outline"
            className="absolute self-center bottom-4"
          >
            <Link href={`/post/${post.id}`}>
              Read more <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </Button>
        </>
      )}
      <div className="overflow-hidden" ref={ref}>
        {children}
      </div>
    </Card>
  );
};
