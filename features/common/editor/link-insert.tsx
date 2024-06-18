import { Button } from "@/features/ui/button";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { Input } from "@/features/ui/input";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { useLink } from "./use-link";

interface LinkButtonProps {
  editor: Editor;
}

export const LinkInsert = ({ editor }: LinkButtonProps) => {
  const { isOpen, onLinkChange, onOpenChange, link, addLink } = useLink(editor);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          className={cn((editor.isActive("link") || isOpen) && "bg-accent")}
          variant="ghost"
          type="button"
          size="icon"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-[300px] gap-x-4">
        <Input
          className="border-none focus:outline-none"
          placeholder="Enter link..."
          value={link}
          onChange={onLinkChange}
        />
        <Button type="button" onMouseDown={addLink} size="sm">
          Enter <kbd className="text-lg ml-2">↵</kbd>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
