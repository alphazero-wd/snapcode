import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/features/ui/use-toast";
import { User } from "@supabase/supabase-js";

const supabase = createClient();

export const useLogOut = () => {
  const { toast } = useToast();
  const router = useRouter();
  const onSignOut = async (user: User | null) => {
    if (!user) return;
    await supabase.auth.signOut();
    const { dismiss } = toast({
      variant: "success",
      title: "Sign out successfully!",
    });
    setTimeout(dismiss, 2000);
    router.replace("/", { scroll: false });
    router.refresh();
  };
  return { onSignOut };
};
