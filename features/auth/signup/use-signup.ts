import * as z from "zod";
import { PASSWORD_REGEX, VALID_USERNAME_REGEX } from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/features/ui/use-toast";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "First name is empty." })
    .max(30, {
      message: "Username is too long.",
    })
    .regex(VALID_USERNAME_REGEX, { message: "Username is invalid" }),
  email: z.string().email({
    message: "Invalid email provided.",
  }),
  password: z
    .string()
    .min(6, { message: "Password is too short." })
    .regex(PASSWORD_REGEX, {
      message: "Password is not strong enough.",
    }),
});

export const useSignup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setTimeout(async () => {
      try {
        const { error } = await supabase.auth.signUp({
          ...values,
          options: {
            data: { username: values.username },
          },
        });
        if (error) throw new Error(error.message);
        const { dismiss } = toast({
          variant: "success",
          title: "Sign up successfully!",
          description: "Get ready to join the dev community :)",
        });

        setTimeout(dismiss, 3000);
        router.replace("/");
        router.refresh();
      } catch (error: any) {
        const { dismiss } = toast({
          variant: "error",
          title: "Sign up error!",
          description: error.message,
        });
        setTimeout(dismiss, 3000);
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }, 1000);
  }
  return { form, onSubmit, loading };
};
