"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import lowlight from "@/lib/lowlight";
import { Button } from "@/features/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/features/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { languagesMap } from "./languages-map";

const languages = ["", "plaintext", ...lowlight.listLanguages()];

interface LanguagesSelectProps {
  value: string;
  onChange: (newValue: string) => void;
}
export function LanguagesSelect({ value, onChange }: LanguagesSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {languagesMap[value] || value || "Select language..."}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language}
                  value={language}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {languagesMap[language] || language}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === language ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
