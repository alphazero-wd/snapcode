"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/ui/form";
import { Button } from "@/features/ui/button";
import { User } from "@supabase/supabase-js";
import { useCreateComment } from "./use-create";
import { CommentEditor } from "../editor";

interface CommentFormProps {
  postId: string;
  user: User | null;
}

export const CommentForm = ({ user, postId }: CommentFormProps) => {
  const { form, loading, onSubmit, editor } = useCreateComment(postId, user);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <CommentEditor editor={editor} user={user} />
              <div className="mt-3 items-center flex justify-between w-full">
                <div>
                  <FormDescription className="block">
                    {!user ? "Log in to comment" : ""}
                  </FormDescription>
                  <FormMessage className="flex-1" />
                </div>
                <Button
                  disabled={loading || !user}
                  className="w-fit justify-self-end"
                  type="submit"
                >
                  Comment
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
