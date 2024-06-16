"use client";
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  LinkIcon,
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
import { useToast } from "@/features/ui/use-toast";
import { useDeletePostModal } from "./use-delete-modal";
import Link from "next/link";

interface PostOptionsProps {
  id: string;
  creator_id: string;
  user_id?: string;
}
export const PostOptions = ({ creator_id, id, user_id }: PostOptionsProps) => {
  const { toast } = useToast();
  const { onOpen } = useDeletePostModal();

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(window.origin + "/post/" + id);
    const { dismiss } = toast({
      variant: "success",
      title: "Link copied to the clipboard",
    });
    setTimeout(dismiss, 3000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisHorizontalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-x-2 text-sm" asChild>
            <Link href={"/post/" + id}>
              <EyeIcon className="w-4 h-4 text-muted-foreground" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onCopyLink}
            className="flex gap-x-2 text-sm"
          >
            <LinkIcon className="w-4 h-4 text-muted-foreground" />
            Share link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {creator_id === user_id && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="flex gap-x-2 text-sm">
                <Link href={"/post/" + id + "/edit"}>
                  <PencilIcon className="w-4 h-4 text-muted-foreground" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onOpen(id)}
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
