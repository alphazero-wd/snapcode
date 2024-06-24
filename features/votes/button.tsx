"use client";
import { Button } from "@/features/ui/button";
import { Separator } from "@/features/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui/tooltip";
import { ArrowUpOutline, ArrowUpSolid } from "./icons";
import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { useLoginModal } from "../auth/login";
import { PostVote, Vote } from "./types";

interface VotesButtonProps {
  postId: string;
  userId?: string;
}

export const VotesButton = ({ postId, userId }: VotesButtonProps) => {
  const onLoginModalOpen = useLoginModal((state) => state.onOpen);
  const supabase = createClient();
  const [upvotes, setUpvotes] = useState(0);
  const [votedType, setVotedType] = useState<Vote | null>(null);

  useEffect(() => {
    getUpvotes();
  }, [postId, userId]);

  useEffect(() => {
    checkHasPreviouslyVoted();
  }, [userId, postId]);

  const checkHasPreviouslyVoted = async () => {
    if (!userId) setVotedType(null);
    else {
      const { data } = await supabase
        .from("posts_votes")
        .select("vote")
        .eq("post_id", postId)
        .eq("voter_id", userId)
        .maybeSingle<PostVote>();

      setVotedType(data?.vote || null);
    }
  };

  const getUpvotes = async () => {
    const { data } = await supabase.rpc("get_post_upvotes", {
      id: postId,
    });

    setUpvotes(data || 0);
  };

  const castVote = async (vote: Vote | null) => {
    if (!userId) {
      onLoginModalOpen();
      return;
    }
    const prevVotedType = votedType;
    if (vote) {
      await supabase.from("posts_votes").upsert({
        post_id: postId,
        voter_id: userId,
        vote,
      });
      setVotedType(vote);
    } else {
      await supabase
        .from("posts_votes")
        .delete()
        .eq("post_id", postId)
        .eq("voter_id", userId);
      setVotedType(null);
    }
    if ((!prevVotedType || prevVotedType === Vote.Down) && vote === Vote.Up)
      setUpvotes((prev) => prev + 1);

    if (prevVotedType === Vote.Up && (!vote || vote === Vote.Down))
      setUpvotes((prev) => prev - 1);
  };

  return (
    <div className="h-8 flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              className="h-8 gap-x-2 rounded-none rounded-l-full"
              onClick={() => castVote(votedType === Vote.Up ? null : Vote.Up)}
            >
              {votedType === Vote.Up ? (
                <ArrowUpSolid className="fill-blue-500 w-5 h-5" />
              ) : (
                <ArrowUpOutline className="fill-blue-500 w-5 h-5" />
              )}
              {upvotes}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upvote</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator
        orientation="vertical"
        className="bg-zinc-300 dark:bg-zinc-700"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-none h-8 rounded-r-full"
              onClick={() =>
                castVote(votedType === Vote.Down ? null : Vote.Down)
              }
            >
              {votedType === Vote.Down ? (
                <ArrowUpSolid className="rotate-180 w-5 h-5 fill-destructive" />
              ) : (
                <ArrowUpOutline className="rotate-180 w-5 h-5 fill-destructive" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Downvote</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
