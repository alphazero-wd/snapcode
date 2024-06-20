"use client";

import { Textarea } from "@/features/ui/textarea";
import { Editor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./toolbar";
import { User } from "@supabase/supabase-js";

interface PostEditorProps {
  editor: Editor | null;
  user: User | null;
}

export const PostEditor = ({ editor, user }: PostEditorProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative bg-background">
        <Textarea
          readOnly
          placeholder={editor.getHTML() === "<p></p>" ? "Share something" : ""}
          className="absolute resize-none top-0 left-0 border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <EditorContent editor={editor} />
      </div>
      {user && <Toolbar editor={editor} />}
    </div>
  );
};
