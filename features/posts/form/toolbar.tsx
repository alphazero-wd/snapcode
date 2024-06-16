import { Bold, Italic } from "lucide-react";
import { EditButton } from "../editor/edit-button";
import { LinkIcon } from "@heroicons/react/24/outline";

export const Toolbar = () => {
  return (
    <div className="flex gap-x-3">
      <EditButton Icon={Italic} cmd="italic" />
      <EditButton Icon={Bold} cmd="bold" />
      <EditButton
        Icon={LinkIcon}
        cmd="createLink"
        arg="https://github.com/lovasoa/react-contenteditable"
      />
    </div>
  );
};
