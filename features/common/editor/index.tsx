"use client";

import { Textarea } from "@/features/ui/textarea";
import { Editor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./toolbar";

interface PostEditorProps {
  editor: Editor | null;
}

export const PostEditor = ({ editor }: PostEditorProps) => {
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
      <Toolbar editor={editor} />
    </div>
  );
};
