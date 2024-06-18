import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { sanitizeContent } from "../utils";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";

interface PostEditor {
  content?: string;
  onChange: (newValue: string) => void;
}

export const usePostEditor = ({ content, onChange }: PostEditor) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link,
      ListItem,
      OrderedList,
      Code,
      Blockquote,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "relative text-sm min-h-24 p-3 focus:outline-none overflow-hidden rounded-lg border focus-within:ring-1 focus-within:ring-ring markdown",
      },
    },
    onUpdate({ editor }) {
      const newContent = sanitizeContent(editor.getHTML());
      onChange(newContent);
    },
  });
  return editor;
};
