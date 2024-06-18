import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/features/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import { useLoginModal } from "./use-login-modal";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email provided.",
  }),
  password: z.string().min(1, { message: "Password is empty." }),
});

const supabase = createClient();

export const useLogin = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const onClose = useLoginModal((state) => state.onClose);
  const [loading, setLoading] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setTimeout(async () => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword(values);
        if (error) throw new Error(error.message);
        const { username } = data.user.user_metadata;

        const { dismiss } = toast({
          variant: "success",
          title: "Login successfully!",
          description: `Welcome back, ${username} :)`,
        });
        setTimeout(dismiss, 2000);
        form.reset();
        onClose();
        router.refresh();
      } catch (error: any) {
        const { dismiss } = toast({
          variant: "error",
          title: "Login failed!",
          description: error.message,
        });
        setTimeout(dismiss, 2000);
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }, 1000);
  }
  return { form, onSubmit, loading };
};
