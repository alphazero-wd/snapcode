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
import { useRouter } from "next/navigation";
import { useDeletePostModal } from "./use-delete-modal";
import { useToast } from "@/features/ui/use-toast";

const supabase = createClient();
export const DeletePostModal = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isOpen, onClose, id } = useDeletePostModal();

  const onDeletePost = async () => {
    const { dismiss } = toast({
      variant: "success",
      title: "Delete post successfully!",
    });
    setTimeout(dismiss, 3000);
    await supabase.from("posts").delete().eq("id", id);
    router.replace("/", { scroll: false });
    router.refresh();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete post confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This cannot be undone.
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
