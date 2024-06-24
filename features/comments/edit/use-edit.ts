import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/features/ui/use-toast";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useContentEditor } from "@/features/common/editor/use-editor";
import { useCommentsStore } from "../use-store";

const supabase = createClient();

interface EditCommentParams {
  id: string;
  content: string;
  user: User | null;
}

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Content must not be empty.",
  }),
});

export const useEditComment = ({ id, content, user }: EditCommentParams) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const editComment = useCommentsStore((state) => state.editComment);
  const { toast } = useToast();
  const editor = useContentEditor({
    content,
    onChange: (newValue) => form.setValue("content", newValue),
    isAuth: !!user,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setValue("content", content, { shouldTouch: true });
  }, [content]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!user) return;
    setTimeout(async () => {
      try {
        const { error } = await supabase
          .from("comments")
          .update({
            content: values.content,
          })
          .eq("id", id);

        if (error) throw new Error(error.message);

        const { dismiss } = toast({
          variant: "success",
          title: "Edit comment successfully!",
        });
        setTimeout(dismiss, 2000);
        editComment(id, values.content);
        form.reset();
        editor?.commands.clearContent();
      } catch (error: any) {
        const { dismiss } = toast({
          variant: "error",
          title: "Failed to edit comment!",
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
