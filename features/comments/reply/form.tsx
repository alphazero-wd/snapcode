"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/ui/form";
import { Button } from "@/features/ui/button";
import { useCreateComment } from "../create/use-create";
import { Editor } from "@/features/common/editor";
import { User } from "@supabase/supabase-js";
import { useRepliesContext } from "./use-context";

interface ReplyFormProps {
  commentId: string;
  postId: string;
  user: User | null;
  disableReply: () => void;
}

export const ReplyForm = ({
  commentId,
  postId,
  user,
  disableReply,
}: ReplyFormProps) => {
  const { addReply } = useRepliesContext();
  const { form, loading, onSubmit, editor } = useCreateComment({
    postId,
    user,
    addComment: addReply,
    disableReply,
    repliedToId: commentId,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <Editor editor={editor} user={user} />
              <div className="mt-3 items-center flex justify-between w-full">
                <div>
                  <FormDescription className="block">
                    {!user ? "Log in to reply" : ""}
                  </FormDescription>
                  <FormMessage className="flex-1" />
                </div>
                <div className="flex mt-3 gap-x-2">
                  <Button onClick={disableReply} variant="outline">
                    Cancel
                  </Button>
                  <Button
                    disabled={loading || !user}
                    className="w-fit justify-self-end"
                    type="submit"
                  >
                    Reply
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
