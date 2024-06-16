import { LucideProps } from "lucide-react";
import { ToggleGroupItem } from "@/features/ui/toggle-group";

interface EditButtonProps {
  cmd: string;
  arg?: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export function EditButton({ cmd, arg, Icon }: EditButtonProps) {
  return (
    <ToggleGroupItem
      value={cmd}
      key={cmd}
      type="button"
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(cmd, false, arg); // Send the command to the browser
      }}
    >
      <Icon className="w-4 h-4" />
    </ToggleGroupItem>
  );
}
