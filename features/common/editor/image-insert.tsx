import { Button } from "@/features/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { Input } from "@/features/ui/input";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useImage } from "./use-image";

interface ImageButtonProps {
  editor: Editor;
}

export const ImageInsert = ({ editor }: ImageButtonProps) => {
  const { isOpen, onImageChange, imageUrl, onOpenChange, addImage } =
    useImage(editor);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          className={cn((editor.isActive("image") || isOpen) && "bg-accent")}
          variant="ghost"
          type="button"
          size="icon"
        >
          <PhotoIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-[300px] gap-x-4">
        <Input
          className="border-none focus:outline-none"
          placeholder="Enter image URL..."
          value={imageUrl}
          onChange={onImageChange}
        />
        <Button type="button" onMouseDown={addImage} size="sm">
          Enter <kbd className="text-lg ml-2">↵</kbd>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
