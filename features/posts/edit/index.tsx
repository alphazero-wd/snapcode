"use client";
import { useEditPost } from "./use-edit-post";
import { User } from "@supabase/supabase-js";
import { EditForm } from "./edit-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/ui/tabs";
import ReactMarkdown from "react-markdown";

interface EditPostFormProps {
  id: string;
  content: string;
  user: User | null;
}

export const EditPostForm = ({ id, content, user }: EditPostFormProps) => {
  const { form, loading, onSubmit } = useEditPost(id, content);
  const contentPreview = form.watch("content");

  return (
    <Tabs defaultValue="editor">
      <TabsList>
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="editor">
        <EditForm
          form={form}
          loading={loading}
          onSubmit={onSubmit}
          user={user}
          content={content}
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className="text-foreground markdown text-sm">
          <ReactMarkdown>{contentPreview}</ReactMarkdown>
        </div>
      </TabsContent>
    </Tabs>
  );
};
