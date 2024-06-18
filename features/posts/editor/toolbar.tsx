import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Highlighter,
  Italic,
  MessageSquareQuoteIcon,
  UnderlineIcon,
} from "lucide-react";
import { useMemo } from "react";
import { Toggle } from "../../ui/toggle";
import { LinkInsert } from "./link-insert";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  const marks = useMemo(() => {
    return [
      {
        name: "bold",
        icon: Bold,
        onPress: () => editor.commands.toggleBold(),
      },
      {
        name: "italic",
        icon: Italic,
        onPress: () => editor.commands.toggleItalic(),
      },
      {
        name: "underline",
        icon: UnderlineIcon,
        onPress: () => editor.commands.toggleUnderline(),
      },
      {
        name: "highlight",
        icon: Highlighter,
        onPress: () => editor.commands.toggleHighlight(),
      },
      {
        name: "code",
        icon: Code,
        onPress: () => editor.commands.toggleCode(),
      },
      {
        name: "blockquote",
        icon: MessageSquareQuoteIcon,
        onPress: () => editor.commands.toggleBlockquote(),
      },
    ] as const;
  }, [editor]);

  return (
    <div className="flex gap-x-2">
      {marks.map((mark) => (
        <Toggle
          key={mark.name}
          size="sm"
          pressed={editor.isActive(mark.name)}
          onPressedChange={() => mark.onPress()}
        >
          <mark.icon className="w-4 h-4" />
        </Toggle>
      ))}
      <LinkInsert editor={editor} />
    </div>
  );
};
