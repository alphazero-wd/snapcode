"use client";
import { Button } from "@/features/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/features/ui/input-otp";
import { Spinner } from "@/features/ui/spinner";
import { useOTPVerify } from "./use-otp-verify";

interface InputOTPFormProps {
  oldEmail: string;
  newEmail: string;
  goBack: () => void;
  resetSubmissionState: () => void;
}

export function InputOTPForm(props: InputOTPFormProps) {
  const { form, onSubmit, loading, clearVerification } = useOTPVerify(props);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="oldEmailOTP"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current email OTP</FormLabel>
              <FormControl>
                <VerifyInputOTP {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newEmailOTP"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New email OTP</FormLabel>
              <FormControl>
                <VerifyInputOTP {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-4 border-t flex items-center gap-x-4">
          <Button type="button" variant="outline" onClick={clearVerification}>
            Change email
          </Button>
          <Button
            type="submit"
            disabled={
              loading ||
              !form.getValues("oldEmailOTP") ||
              !form.getValues("newEmailOTP")
            }
            className="w-fit"
          >
            {loading && <Spinner />} {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

interface VerifyInputOTPProps {
  value: string;
  onChange: (newValue: string) => void;
}

const VerifyInputOTP = ({ value, onChange }: VerifyInputOTPProps) => {
  return (
    <InputOTP maxLength={6} value={value} onChange={onChange}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};
