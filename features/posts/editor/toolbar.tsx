import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { EditButton } from "./edit-button";
import { ToggleGroup } from "@/features/ui/toggle-group";
import { Button } from "../../ui/button";

export const Toolbar = () => {
  return (
    <div>
      <ToggleGroup className="flex gap-x-3 mb-4" type="multiple">
        <EditButton Icon={BoldIcon} cmd="bold" />
        <EditButton Icon={ItalicIcon} cmd="italic" />
        <EditButton Icon={UnderlineIcon} cmd="underline" />
      </ToggleGroup>
    </div>
  );
};
