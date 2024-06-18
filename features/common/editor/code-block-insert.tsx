import { Button } from "@/features/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { CurlyBracesIcon } from "lucide-react";
import { useCodeBlock } from "./use-code-block";
import { LanguagesSelect } from "./languages-select";

interface CodeBlockButtonProps {
  editor: Editor;
}

export const CodeBlockInsert = ({ editor }: CodeBlockButtonProps) => {
  const {
    isOpen,
    onLanguageChange,
    onOpenChange,
    selectedLanguage,
    addCodeBlock,
  } = useCodeBlock(editor);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            (editor.isActive("codeBlock") || isOpen) && "bg-accent"
          )}
          variant="ghost"
          type="button"
          size="icon"
        >
          <CurlyBracesIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-[300px] gap-x-4">
        <LanguagesSelect
          value={selectedLanguage}
          onChange={(newValue) => onLanguageChange(newValue)}
        />
        <Button type="button" onMouseDown={addCodeBlock} size="sm">
          Enter <kbd className="text-lg ml-2">↵</kbd>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
