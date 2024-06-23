import * as z from "zod";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/features/ui/use-toast";
import { truncateEmail } from "@/features/auth/utils";

const formSchema = z.object({
  oldEmailOTP: z.string().min(6, {
    message: "The OTP must be 6 characters.",
  }),
  newEmailOTP: z.string().min(6, {
    message: "The OTP password must be 6 characters.",
  }),
});

interface OTPVerifyParams {
  oldEmail: string;
  newEmail: string;
  goBack: () => void;
  resetSubmissionState: () => void;
}

export const useOTPVerify = ({
  oldEmail,
  newEmail,
  goBack,
  resetSubmissionState,
}: OTPVerifyParams) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldEmailOTP: "",
      newEmailOTP: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setTimeout(() => verifyOTPCodes(values), 2000);
  }

  const verifyOTPCodes = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error: oldEmailError } = await supabase.auth.verifyOtp({
        email: oldEmail,
        token: values.oldEmailOTP,
        type: "email_change",
      });
      if (oldEmailError) throw oldEmailError;
      const { error: newEmailError } = await supabase.auth.verifyOtp({
        email: newEmail,
        token: values.newEmailOTP,
        type: "email_change",
      });
      if (newEmailError) throw newEmailError;
      toast({
        variant: "success",
        title: "Email verified successfully",
        description: "Successfully verified email " + truncateEmail(newEmail),
      });
      resetSubmissionState();
      goBack();
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Email verification failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearVerification = () => {
    form.reset();
    goBack();
  };

  return { clearVerification, onSubmit, loading, form };
};
