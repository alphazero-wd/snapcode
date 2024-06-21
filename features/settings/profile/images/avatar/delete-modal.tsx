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
import { useToast } from "@/features/ui/use-toast";
import { useDeleteAvatarModal } from "./use-delete-modal";
import { AVATARS_FOLDER, BUCKET_ID } from "@/constants";

const supabase = createClient();

interface DeleteAvatarModalProps {
  profileId: string;
}

export const DeleteAvatarModal = ({ profileId }: DeleteAvatarModalProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { isOpen, onClose } = useDeleteAvatarModal();

  const onDeletePost = async () => {
    const { data, error } = await supabase.storage
      .from(BUCKET_ID)
      .remove([`${AVATARS_FOLDER}/${profileId}`]);
    if (data) {
      const { dismiss } = toast({
        variant: "success",
        title: "Delete avatar successfully!",
      });
      const { data, error } = await supabase
        .from("profiles")
        .update({
          avatar: null,
        })
        .eq("user_id", profileId);
      if (data) setTimeout(dismiss, 2000);
      if (error) showError(error.message);
    }

    if (error) showError(error.message);
    router.refresh();
    onClose();
  };

  const showError = (message: string) => {
    const { dismiss } = toast({
      variant: "error",
      title: "Delete avatar failed!",
      description: message,
    });
    setTimeout(dismiss, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete avatar confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the avatar?
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
