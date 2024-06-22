import { Button } from "@/features/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/features/ui/form";
import { Input } from "@/features/ui/input";
import { Spinner } from "@/features/ui/spinner";
import { Label } from "@/features/ui/label";
import { UseFormReturn } from "react-hook-form";

interface EmailInputFormProps {
  onSubmit: (values: { email: string }) => Promise<void>;
  loading: boolean;
  form: UseFormReturn<
    {
      email: string;
    },
    any,
    undefined
  >;
  email: string;
  hasSubmitted: boolean;
  startVerifying: () => void;
}

export const EmailInputForm = ({
  form,
  loading,
  onSubmit,
  email,
  hasSubmitted,
  startVerifying,
}: EmailInputFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                disabled={loading}
                {...field}
                placeholder="m@example.com"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-4 border-t flex items-center gap-x-4">
          <Button
            type="submit"
            disabled={
              loading ||
              !form.getValues("email") ||
              form.getValues("email") === email
            }
            className="w-fit"
          >
            {loading && <Spinner />} {loading ? "Updating..." : "Update"}
          </Button>
          {hasSubmitted && form.getValues("email") === email && (
            <Button variant="outline" onClick={startVerifying}>
              Continue
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
