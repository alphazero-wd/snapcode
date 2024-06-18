"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/features/ui/form";
import { useCreatePost } from "./use-create-post";
import { Button } from "@/features/ui/button";
import { User } from "@supabase/supabase-js";
import { PostEditor } from "../editor";

export const CreatePost = ({ user }: { user: User | null }) => {
  const { form, loading, onSubmit, editor } = useCreatePost();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <PostEditor editor={editor} />
              <div className="mt-3 flex justify-between w-full">
                <div>
                  <FormDescription className="block">
                    {!user ? "Log in to post" : ""}
                  </FormDescription>
                  <FormMessage className="flex-1 block" />
                </div>
                <Button
                  disabled={loading || !user}
                  className="w-fit justify-self-end"
                  type="submit"
                >
                  Post
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
