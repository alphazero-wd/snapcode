"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/ui/dialog";
import { SignupForm } from "./signup-form";
import { Button } from "@/features/ui/button";
import { useSignupModal } from "./use-signup-modal";
import { useLoginModal } from "../login";

export const SignupModal = () => {
  const { isOpen, onClose } = useSignupModal();
  const { onOpen } = useLoginModal();

  const openLoginModal = () => {
    onClose();
    onOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign up</DialogTitle>
          <DialogDescription>
            Join the community of devs today!
          </DialogDescription>
        </DialogHeader>
        <SignupForm />
        <DialogFooter className="text-sm sm:justify-center flex-row justify-center">
          Already have an account?{" "}
          <Button
            className="w-fit h-fit ml-1 p-0"
            onClick={openLoginModal}
            variant="link"
          >
            Sign in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
