import { Editor as TiptapEditor } from "@tiptap/react";
import { Editor } from "@/features/common/editor";
import { User } from "@supabase/supabase-js";

interface PostEditorProps {
  editor: TiptapEditor | null;
  user: User | null;
}

export const PostEditor = ({ editor, user }: PostEditorProps) => {
  return <Editor editor={editor} user={user} />;
};
