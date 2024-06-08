"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/ui/dialog";
import { LoginForm } from "./login-form";
import { useLoginModal } from "./use-login-modal";
import { useSignupModal } from "../signup";
import { Button } from "@/features/ui/button";

export const LoginModal = () => {
  const { isOpen, onClose } = useLoginModal();
  const { onOpen } = useSignupModal();

  const openLoginModal = () => {
    onClose();
    onOpen();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Login</DialogTitle>
          <DialogDescription>Welcome back, developer!</DialogDescription>
        </DialogHeader>
        <LoginForm />
        <DialogFooter className="text-sm sm:justify-center flex-row justify-center">
          Don&apos;t have an account?{" "}
          <Button
            className="w-fit h-fit p-0 ml-1"
            onClick={openLoginModal}
            variant="link"
          >
            Sign up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
