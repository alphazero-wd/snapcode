"use client";
import { Button } from "@/features/ui/button";
import { Spinner } from "@/features/ui/spinner";
import { useUploadImage } from "../use-upload";
import { ProfileAvatar } from "@/features/users/profile/avatar";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/lib/supabase/client";
import { getAvatarUrl } from "@/features/users/profile/get-avatar-url";
import { useDeleteAvatarModal } from "./use-delete-modal";
import { MouseEventHandler } from "react";
import { DeleteAvatarModal } from "./delete-modal";
import { ImageDropzone } from "../dropzone";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
    useUploadImage(profileId, "avatar");
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
    <section className="grid gap-y-4">
      <div
        {...getRootProps({
          className: "relative w-24 h-24 group rounded-full",
        })}
      >
        <Button
          size="icon"
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity top-0 -right-3 z-50 bg-destructive rounded-full"
          onClick={onDeleteAvatarModalOpen}
          variant="destructive"
        >
          <XMarkIcon className="w-5 h-5" />
        </Button>
        <ImageDropzone
          isDragActive={isDragActive}
          getInputProps={getInputProps}
        />
        <ProfileAvatar
          isPreview={!!newImage}
          username={username}
          avatar={newImage?.preview || getAvatarUrl(supabase, avatar)}
          size="lg"
        />
      </div>
      <div className="py-4 border-t flex items-center gap-x-4">
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
    </section>
  );
};
