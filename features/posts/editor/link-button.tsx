import { Button } from "@/features/ui/button";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { Input } from "@/features/ui/input";
import { MouseEventHandler, useState } from "react";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  appendLink: (link: string) => void;
}

export const LinkButton = ({ appendLink }: LinkButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState("");

  const addLink: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    setIsOpen(false); // Avoids loosing focus from the editable area
    appendLink(link);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(isOpen && "bg-accent")}
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
          onChange={(e) => setLink(e.target.value)}
        />
        <Button type="button" onMouseDown={addLink} size="sm">
          Enter <kbd>↵</kbd>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
