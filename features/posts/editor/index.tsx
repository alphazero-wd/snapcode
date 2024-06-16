import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Textarea } from "@/features/ui/textarea";
import { useRef } from "react";
import { sanitizeContent } from "../utils";
import { Toolbar } from "./toolbar";
import { Separator } from "@/features/ui/separator";
import { LinkButton } from "./link-button";

interface PostEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PostEditor = ({ value, onChange }: PostEditorProps) => {
  const text = useRef(value);
  const editorRef = useRef<ContentEditable & HTMLDivElement>(null);
  const handleChange = (evt: ContentEditableEvent) => {
    const sanitized = sanitizeContent(evt.target.value);
    text.current = sanitized;
    const newValue = sanitized;
    onChange(newValue);
  };

  const appendLink = (link: string) => {
    if (!editorRef.current) return;
    const linkHtml = `<a target="_blank" href=${link}>${link}</a>`;
    text.current += linkHtml;
    onChange(value + linkHtml);
  };

  return (
    <div>
      <div className="flex gap-x-3">
        <Toolbar />
        <Separator orientation="vertical" />
        <LinkButton appendLink={appendLink} />
      </div>
      <div className="relative min-h-24 overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Textarea
          readOnly
          placeholder={value ? "" : "New Post"}
          className="absolute resize-none top-0 left-0 border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <ContentEditable
          ref={editorRef}
          className="h-full relative z-10 p-3 text-sm focus-within:outline-none"
          html={!value ? value : text.current}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
