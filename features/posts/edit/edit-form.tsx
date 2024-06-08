import { AutoresizeTextarea } from "@/features/ui/autoresize-textarea";
import { Button } from "@/features/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/ui/form";
import { CancelEditModal } from "./cancel-modal";
import { UseFormReturn } from "react-hook-form";
import { User } from "@supabase/supabase-js";

interface EditFormProps {
  form: UseFormReturn<
    {
      content: string;
    },
    any,
    undefined
  >;
  loading: boolean;
  onSubmit: (values: { content: string }) => void;
  user: User | null;
  content: string;
}

export const EditForm = ({
  form,
  loading,
  onSubmit,
  user,
  content,
}: EditFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <AutoresizeTextarea
                {...field}
                placeholder="Edit your post here..."
                rows={20}
                disabled={loading || !user}
              />
              <div className="mt-3 flex justify-between w-full">
                <FormDescription>
                  {!user ? "Log in to edit" : ""}
                </FormDescription>
                <FormMessage className="flex-1" />
                <div className="flex mt-3 gap-x-2">
                  <CancelEditModal
                    hasChanged={content !== form.getValues("content")}
                  />
                  <Button
                    disabled={
                      loading || !user || content === form.getValues("content")
                    }
                    className="w-fit justify-self-end"
                    type="submit"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
