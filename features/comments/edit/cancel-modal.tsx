import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/ui/dialog";
import { Button } from "@/features/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/features/ui/use-toast";
import { useCommentsStore } from "../use-store";

export const CancelEditModal = ({ hasChanged }: { hasChanged: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const cancelEditComment = useCommentsStore(
    (state) => state.cancelEditComment
  );
  const { toast } = useToast();
  const onCancelEdit = () => {
    toast({
      variant: "success",
      title: "Edit post cancelled!",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            if (hasChanged) setIsOpen(true);
            else cancelEditComment();
          }}
          variant="outline"
        >
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel edit confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel the changes you&apos;ve made?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onCancelEdit} variant="destructive">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
