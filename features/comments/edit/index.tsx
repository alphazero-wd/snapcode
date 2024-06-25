"use client";
import { Button } from "@/features/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/features/ui/form";
import { User } from "@supabase/supabase-js";
import { Editor } from "@/features/common/editor";
import { CancelEditModal } from "./cancel-modal";
import { useEditComment } from "./use-edit";

interface EditCommentFormProps {
  user: User | null;
  content: string;
  commentId: string;
  cancelEdit: () => void;
  editComment: (id: string, content: string, updatedAt: string) => void;
}

export const EditCommentForm = ({
  commentId,
  user,
  content,
  cancelEdit,
  editComment,
}: EditCommentFormProps) => {
  const { form, loading, onSubmit, editor } = useEditComment({
    id: commentId,
    content,
    user,
    editComment,
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
              <div className="flex justify-between w-full">
                <FormMessage className="flex-1" />
                <div className="flex justify-end w-full gap-x-2">
                  <CancelEditModal
                    hasChanged={content !== form.getValues("content")}
                    cancelEdit={cancelEdit}
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
