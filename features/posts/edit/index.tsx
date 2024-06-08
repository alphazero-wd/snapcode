"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/ui/form";
import { Button } from "@/features/ui/button";
import { Textarea } from "@/features/ui/textarea";
import { useEditPost } from "./use-edit-post";
import { User } from "@supabase/supabase-js";
import { CancelEditModal } from "./cancel-modal";

interface EditPostFormProps {
  id: string;
  content: string;
  user: User | null;
}

export const EditPostForm = ({ id, content, user }: EditPostFormProps) => {
  const { form, loading, onSubmit } = useEditPost(id, content);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Textarea
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
