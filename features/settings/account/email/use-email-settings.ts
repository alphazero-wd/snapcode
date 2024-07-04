import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { truncateEmail } from "@/features/auth/utils";
import { useToast } from "@/features/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export const useEmailSettings = (email: string) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    form.setValue("email", email);
  }, [email]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setTimeout(async () => await sendVerifyEmail(values.email), 2000);
  };

  const sendVerifyEmail = async (newEmail: string) => {
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error)
      toast({
        variant: "error",
        title: "Email update failed!",
        description: error.message,
      });
    else if (data.user) {
      toast({
        variant: "info",
        title: "Verify your email",
        description:
          "Click on the links sent to " +
          truncateEmail(email) +
          " and " +
          truncateEmail(newEmail),
      });
    }
    setLoading(false);
  };

  return {
    onSubmit,
    loading,
    form,
  };
};
