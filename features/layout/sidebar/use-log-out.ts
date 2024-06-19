import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/features/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { useFollowsStore } from "@/features/users/follows/use-store";

const supabase = createClient();

export const useLogOut = () => {
  const { toast } = useToast();
  const reset = useFollowsStore((state) => state.reset);
  const router = useRouter();
  const onSignOut = async (user: User | null) => {
    if (!user) return;
    await supabase.auth.signOut();
    const { dismiss } = toast({
      variant: "success",
      title: "Sign out successfully!",
    });
    setTimeout(dismiss, 2000);
    reset();
    router.replace("/", { scroll: false });
    router.refresh();
  };
  return { onSignOut };
};
