"use client";

import Link from "next/link";
import { Button } from "@/features/ui/button";
import { useCommentsStore } from "../use-store";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

export const CommentsSectionLink = () => {
  const commentsCount = useCommentsStore((state) => state.count);
  return (
    <Button
      asChild
      variant="link"
      className="text-muted-foreground gap-x-2 p-0 w-fit h-fit"
    >
      <Link href="#comments">
        <ChatBubbleOvalLeftIcon className="w-5 h-5" />
        {commentsCount}
      </Link>
    </Button>
  );
};
