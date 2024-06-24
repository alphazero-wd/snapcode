"use client";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/features/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { useCommentsStore } from "../use-store";
import { useDeleteCommentModal } from "../delete/use-modal";

interface CommentOptionsProps {
  id: string;
  commenterId: string;
  userId?: string;
}
export const CommentOptions = ({
  id,
  commenterId,
  userId,
}: CommentOptionsProps) => {
  const enableEditComment = useCommentsStore(
    (state) => state.enableEditComment
  );

  const onOpenDeleteModal = useDeleteCommentModal((state) => state.onOpen);

  if (userId !== commenterId) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisHorizontalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {commenterId === userId && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => enableEditComment(id)}
                className="flex gap-x-2 text-sm"
              >
                <PencilIcon className="w-4 h-4 text-muted-foreground" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onOpenDeleteModal(id)}
                className="flex gap-x-2 text-sm text-destructive group"
              >
                <TrashIcon className="w-4 h-4 group-hover:text-destructive" />
                <span className="group-hover:text-destructive">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
