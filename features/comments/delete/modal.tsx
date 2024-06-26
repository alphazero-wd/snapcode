"use client";
import { Button } from "@/features/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/features/ui/use-toast";
import { useDeleteCommentModal } from "./use-modal";

const supabase = createClient();

export const DeleteCommentModal = () => {
  const { id, isOpen, onClose, deleteComment } = useDeleteCommentModal();
  const { toast } = useToast();

  const onDeletePost = async () => {
    if (!id) return;
    await supabase.from("comments").delete().eq("id", id);
    const { dismiss } = toast({
      variant: "success",
      title: "Delete comment successfully!",
    });
    setTimeout(dismiss, 2000);
    if (deleteComment) deleteComment(id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete comment confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDeletePost}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
