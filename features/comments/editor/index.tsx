import { Editor as TiptapEditor } from "@tiptap/react";
import { Editor } from "@/features/common/editor";
import { User } from "@supabase/supabase-js";

interface CommentEditorProps {
  editor: TiptapEditor | null;
  user: User | null;
}

export const CommentEditor = ({ editor, user }: CommentEditorProps) => {
  return <Editor editor={editor} user={user} />;
};
