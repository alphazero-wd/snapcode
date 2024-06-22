"use client";
import { Button } from "@/features/ui/button";
import { Spinner } from "@/features/ui/spinner";
import { useUploadImage } from "../use-upload";
import { ProfileAvatar } from "@/features/users/profile/avatar";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/lib/supabase/client";
import { getAvatarUrl } from "@/features/users/profile/get-avatar-url";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useDeleteAvatarModal } from "./use-delete-modal";
import { MouseEventHandler } from "react";
import { DeleteAvatarModal } from "./delete-modal";

interface AvatarSettingsProps {
  profileId: string;
  username: string;
  avatar?: string;
  banner?: string;
}

export const AvatarSettings = ({
  profileId,
  avatar,
  username,
}: AvatarSettingsProps) => {
  const { loading, newImage, onImageChange, onUploadImage, clearPreviewImage } =
    useUploadImage(profileId, "avatar", avatar);
  const onOpen = useDeleteAvatarModal((state) => state.onOpen);
  const supabase = createClient();

  const { isDragActive, getInputProps, getRootProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: false,
    onDrop: (files) => {
      onImageChange(files[0]);
    },
  });

  const onDeleteAvatarModalOpen: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <>
      <div
        {...getRootProps({
          className: "relative w-24 h-24 group rounded-full",
        })}
      >
        {avatar && (
          <Button
            size="icon"
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity top-0 -right-3 z-50 bg-destructive rounded-full"
            onClick={onDeleteAvatarModalOpen}
            variant="destructive"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
        )}

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
        <ProfileAvatar
          isPreview={!!newImage}
          username={username}
          avatar={newImage?.preview || getAvatarUrl(supabase, avatar)}
          size="lg"
        />
      </div>
      <div className="mt-4 py-4 border-t flex items-center gap-x-4">
        {newImage && (
          <Button onClick={clearPreviewImage} variant="outline">
            Cancel
          </Button>
        )}
        <Button
          onClick={onUploadImage}
          disabled={loading || !newImage}
          className="w-fit"
        >
          {loading && <Spinner />} {loading ? "Updating..." : "Update"}
        </Button>
      </div>
      {avatar && (
        <DeleteAvatarModal
          clearPreviewImage={clearPreviewImage}
          avatar={avatar}
          profileId={profileId}
        />
      )}
    </>
  );
};
