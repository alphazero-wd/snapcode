"use client";
import { useCutContent } from "@/features/common/hooks";
import { Button } from "@/features/ui/button";
import { Card } from "@/features/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

interface PostItemProps {
  children: React.ReactNode;
}

const MAX_HEIGHT = 300;

export const PostItem = ({ children }: PostItemProps) => {
  const { ref, shouldCut, unCut } = useCutContent(MAX_HEIGHT);

  return (
    <Card className={cn(shouldCut && "max-h-80", "relative flex flex-col")}>
      {shouldCut && (
        <>
          <div className="absolute rounded-b-xl h-32 bottom-0 w-full bg-gradient-to-b from-transparent to-muted/70 backdrop-blur-sm" />
          <Button
            variant="outline"
            className="absolute self-center bottom-4 gap-x-2"
            onClick={unCut}
          >
            Read more <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </>
      )}
      <div className={cn(shouldCut && "overflow-hidden")} ref={ref}>
        {children}
      </div>
    </Card>
  );
};
