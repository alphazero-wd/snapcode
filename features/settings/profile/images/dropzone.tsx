import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";
import { DropzoneInputProps } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/features/ui/button";
import { MouseEventHandler } from "react";

interface ImageDropzoneProps {
  onDeleteModalOpen: MouseEventHandler<HTMLButtonElement>;
  isDragActive: boolean;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
}

export const ImageDropzone = ({
  onDeleteModalOpen,
  isDragActive,
  getInputProps,
}: ImageDropzoneProps) => {
  return (
    <>
      <Button
        size="icon"
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity top-0 -right-3 z-50 bg-destructive rounded-full"
        onClick={onDeleteModalOpen}
        variant="destructive"
      >
        <XMarkIcon className="w-5 h-5" />
      </Button>
      <div
        className={cn(
          isDragActive ? "opacity-100" : "opacity-0 hover:opacity-100",
          "z-10 text-background transition-opacity rounded-full w-full h-full absolute top-0 left-0 bg-foreground/80 flex justify-center items-center"
        )}
      >
        <input
          {...getInputProps({
            className:
              "rounded-full block pointer-events-none w-full h-full absolute top-6 -left-6",
          })}
          type="file"
        />
        <CameraIcon className="w-6 h-6" />
      </div>
    </>
  );
};
