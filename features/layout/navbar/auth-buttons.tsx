"use client";

import { useLoginModal } from "@/features/auth/login";
import { useSignupModal } from "@/features/auth/signup";
import { Button } from "@/features/ui/button";

export const AuthButtons = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const onSignupModalOpen = useSignupModal((state) => state.onOpen);
  const onLoginModalOpen = useLoginModal((state) => state.onOpen);

  if (isAuthenticated) return null;
  return (
    <div className="flex gap-x-4">
      <Button onClick={onLoginModalOpen} variant="link">
        Log in
      </Button>
      <Button onClick={onSignupModalOpen}>Sign up</Button>
    </div>
  );
};
