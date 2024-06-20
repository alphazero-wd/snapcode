import { useEditor } from "@tiptap/react";
import lowlight from "@/lib/lowlight";
import StarterKit from "@tiptap/starter-kit";
import { sanitizeContent } from "@/features/common/utils";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

interface ContentEditor {
  content?: string;
  onChange: (newValue: string) => void;
  isAuth: boolean;
}

export const useContentEditor = ({
  content,
  onChange,
  isAuth,
}: ContentEditor) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({ codeBlock: false }),
        Link,
        Image,
        Highlight,
        Underline,
        CodeBlockLowlight.configure({ lowlight }),
      ],
      editable: isAuth,
      content,
      editorProps: {
        attributes: {
          class:
            "relative break-words text-sm min-h-24 p-3 focus:outline-none overflow-hidden rounded-lg border focus-within:ring-1 focus-within:ring-ring markdown",
        },
      },
      onUpdate({ editor }) {
        const newContent = sanitizeContent(editor.getHTML());
        onChange(newContent);
      },
    },
    [isAuth]
  );
  return editor;
};
