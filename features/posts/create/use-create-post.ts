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

export const useCreatePost = () => {
  const [user, setUser] = useState<User | null>(null);
  const { manageTags } = useTags();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const editor = useContentEditor({
    onChange: (newValue) => form.setValue("content", newValue),
  });
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!user) return;
    setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .insert({
            content: values.content,
            creator_id: user.id,
          })
          .select("id")
          .single();

        await manageTags(data!.id, values.content, user.id);

        if (error) throw new Error(error.message);

        const { dismiss } = toast({
          variant: "success",
          title: "Create post successfully!",
        });
        setTimeout(dismiss, 2000);
        form.reset();
        editor?.commands.clearContent();
        router.push("/post/" + data.id);
        router.refresh();
      } catch (error: any) {
        const { dismiss } = toast({
          variant: "error",
          title: "Failed to create post!",
          description: error.message,
        });
        setTimeout(dismiss, 2000);
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }, 1000);
  }
  return { form, onSubmit, loading, editor };
};
