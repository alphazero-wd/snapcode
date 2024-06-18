import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  CurlyBracesIcon,
  Highlighter,
  Italic,
  ListOrderedIcon,
  MessageSquareQuoteIcon,
  UnderlineIcon,
} from "lucide-react";
import { useMemo } from "react";
import { Toggle } from "../../ui/toggle";
import { LinkInsert } from "./link-insert";
import { ImageInsert } from "./image-insert";
import { Separator } from "../../ui/separator";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { CodeBlockInsert } from "./code-block-insert";

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
  }, [editor.commands]);

  const nodes = useMemo(
    () => [
      {
        name: "Bullets",
        mode: "bullet-list",
        icon: ListBulletIcon,
        onPress: () => editor.commands.toggleBulletList(),
      },
      {
        name: "Numbering",
        mode: "ordered-list",
        icon: ListOrderedIcon,
        onPress: () => editor.commands.toggleOrderedList(),
      },
    ],
    [editor]
  );

  return (
    <div className="flex h-9 items-center flex-wrap gap-x-2">
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
      <ImageInsert editor={editor} />
      <Separator orientation="vertical" />
      {nodes.map((node) => (
        <Toggle
          key={node.name}
          size="sm"
          pressed={editor.isActive(node.mode)}
          onPressedChange={() => node.onPress()}
        >
          <node.icon className="w-4 h-4" />
        </Toggle>
      ))}
      <CodeBlockInsert editor={editor} />
    </div>
  );
};
