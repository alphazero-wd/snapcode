import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/features/ui/use-toast";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useContentEditor } from "@/features/common/editor/use-editor";
import { useCommentsStore } from "../use-store";
import { Comment } from "../types";

const supabase = createClient();

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Content must not be empty.",
  }),
});

export const useCreateComment = (postId: string, user: User | null) => {
  const addComment = useCommentsStore((state) => state.addComment);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const editor = useContentEditor({
    onChange: (newValue) => form.setValue("content", newValue),
    isAuth: !!user,
  });
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!user) return;
    setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .insert({
            content: values.content,
            commenter_id: user.id,
            post_id: postId,
          })
          .select(
            `
              id,
              content,
              created_at,
              updated_at,
              profiles:comments_commenter_id_fkey(
                display_name,
                username,
                avatar
              )
            `
          )
          .single<Comment>();
        addComment(data!);

        if (error) throw new Error(error.message);

        const { dismiss } = toast({
          variant: "success",
          title: "Create comment successfully!",
        });
        setTimeout(dismiss, 2000);
        form.reset();
        editor?.commands.clearContent();
        router.refresh();
      } catch (error: any) {
        const { dismiss } = toast({
          variant: "error",
          title: "Failed to create comment!",
          description: error.message,
        });
        setTimeout(dismiss, 2000);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }
  return { form, onSubmit, loading, editor };
};
