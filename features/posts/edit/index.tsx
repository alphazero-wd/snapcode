"use client";
import { Button } from "@/features/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/features/ui/form";
import { User } from "@supabase/supabase-js";
import { Editor } from "@/features/common/editor";
import { CancelEditModal } from "./cancel-modal";
import { useEditPost } from "./use-edit-post";

interface EditPostFormProps {
  user: User | null;
  content: string;
  postId: string;
}

export const EditPostForm = ({ postId, user, content }: EditPostFormProps) => {
  const { form, loading, onSubmit, editor } = useEditPost({
    id: postId,
    content,
    user,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <Editor user={user} editor={editor} />
              <div className="mt-3 flex justify-between w-full">
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
