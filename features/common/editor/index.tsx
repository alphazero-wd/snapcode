"use client";

import { Textarea } from "@/features/ui/textarea";
import { Editor as TiptapEditor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./toolbar";
import { User } from "@supabase/supabase-js";
import { Skeleton } from "@/features/ui/skeleton";

interface EditorProps {
  editor: TiptapEditor | null;
  user: User | null;
}

export const Editor = ({ editor, user }: EditorProps) => {
  if (!editor)
    return (
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-4 flex-wrap">
          <Skeleton className="w-9 h-9" />
          <Skeleton className="w-9 h-9" />
          <Skeleton className="w-9 h-9" />
          <Skeleton className="w-9 h-9" />
          <Skeleton className="w-9 h-9" />
        </div>
        <div className="relative bg-background">
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-2 w-full overflow-x-hidden">
      {user && <Toolbar editor={editor} />}
      <div className="relative mt-8 sm:mt-0 bg-background">
        <Textarea
          readOnly
          placeholder={editor.getHTML() === "<p></p>" ? "Share something" : ""}
          className="absolute resize-none top-0 left-0 border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
