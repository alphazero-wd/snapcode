"use client";
import { Card } from "@/features/ui/card";
import { Button } from "@/features/ui/button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PostItemProps {
  children: React.ReactNode;
}

const MAX_HEIGHT = 300;

export const PostItem = ({ children }: PostItemProps) => {
  const [shouldCut, setShouldCut] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const height = ref.current.getBoundingClientRect().height;

    if (height < MAX_HEIGHT) setShouldCut(false);
  }, []);

  return (
    <Card className={cn(shouldCut && "max-h-80", "relative flex flex-col")}>
      {shouldCut && (
        <>
          <div className="absolute rounded-b-xl h-32 bottom-0 w-full bg-gradient-to-b from-transparent to-muted/70 backdrop-blur-sm" />
          <Button
            variant="outline"
            className="absolute self-center bottom-4 gap-x-2"
            onClick={() => setShouldCut(false)}
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
