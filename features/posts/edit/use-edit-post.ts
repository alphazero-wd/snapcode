import * as z from "zod";
import { useForm } from "react-hook-form";
import { formSchema } from "../form";
import { useToast } from "@/features/ui/use-toast";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useTags } from "../tags";
import { useContentEditor } from "@/features/common/editor/use-editor";

const supabase = createClient();

export const useEditPost = (id: string, content: string) => {
  const [user, setUser] = useState<User | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const { toast } = useToast();
  const { manageTags } = useTags();
  const router = useRouter();
  const editor = useContentEditor({
    content,
    onChange: (newValue) => form.setValue("content", newValue),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setValue("content", content, { shouldTouch: true });
  }, [content]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!user) return;
    setTimeout(async () => {
      try {
        const { error } = await supabase
          .from("posts")
          .update({
            content: values.content,
          })
          .eq("id", id);

        await manageTags(id, values.content, user.id);

        if (error) throw new Error(error.message);

        const { dismiss } = toast({
          variant: "success",
          title: "Edit post successfully!",
        });
        setTimeout(dismiss, 3000);
        form.reset();
        editor?.commands.clearContent();
        router.push("/post/" + id);
        router.refresh();
      } catch (error: any) {
        const { dismiss } = toast({
          variant: "error",
          title: "Failed to edit post!",
          description: error.message,
        });
        setTimeout(dismiss, 3000);
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }, 1000);
  }
  return { form, onSubmit, loading, editor };
};
