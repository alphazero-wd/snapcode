"use client";
import { Textarea } from "@/features/ui/textarea";
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

export const CreatePost = ({ user }: { user: User | null }) => {
  const { form, loading, onSubmit } = useCreatePost();

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
                placeholder="New Post..."
                rows={6}
                disabled={loading || !user}
              />
              <div className="mt-3 flex justify-between w-full">
                <FormDescription>
                  {!user ? "Log in to post" : ""}
                </FormDescription>
                <FormMessage className="flex-1" />
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
