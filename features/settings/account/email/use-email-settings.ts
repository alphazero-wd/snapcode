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
  const [oldEmail, setOldEmail] = useState("");
  const { toast } = useToast();
  const [isBeingVerified, setIsBeingVerified] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const startVerifying = () => setIsBeingVerified(true);
  const resetSubmissionState = () => setHasSubmitted(false);
  const goBack = () => setIsBeingVerified(false);

  useEffect(() => {
    form.setValue("email", email);
    setOldEmail(email);
  }, [email]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setHasSubmitted(true);
    setTimeout(() => sendVerifyEmail(values.email), 2000);
  };

  const sendVerifyEmail = async (email: string) => {
    const { data, error } = await supabase.auth.updateUser({
      email,
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
        description: "An email has been sent to " + truncateEmail(email),
      });
      setOldEmail(email);
      startVerifying();
    }
    setLoading(false);
  };

  return {
    onSubmit,
    loading,
    form,
    isBeingVerified,
    goBack,
    oldEmail,
    hasSubmitted,
    startVerifying,
    resetSubmissionState,
  };
};
