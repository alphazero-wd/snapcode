import { useEffect, useState } from "react";
import { FileWithPreview } from "@/features/common/types";
import { createClient } from "@/lib/supabase/client";
import { AVATARS_FOLDER, BUCKET_ID } from "@/constants";
import { useToast } from "@/features/ui/use-toast";

export const useUploadImage = (profileId: string) => {
  const supabase = createClient();
  const { toast } = useToast();
  const [newImage, setNewImage] = useState<FileWithPreview | null>(null);
  const [loading, setLoading] = useState(false);

  const onImageChange = (image?: File) => {
    if (!image) return;
    setNewImage(Object.assign(image, { preview: URL.createObjectURL(image) }));
  };

  const onUploadImage = () => {
    setLoading(true);
    setTimeout(uploadImage, 2000);
  };

  const uploadImage = async () => {
    if (!newImage) return;
    const { data, error } = await supabase.storage
      .from(BUCKET_ID)
      .upload(`${AVATARS_FOLDER}/${profileId}`, newImage, {
        upsert: true,
        contentType: "image/jpeg",
      });
    if (data) {
      const { error } = await supabase
        .from("profiles")
        .update({
          avatar: data.path,
        })
        .eq("user_id", profileId);
      if (!error)
        toast({ variant: "success", title: "Avatar updated successfully" });
      else showError(error.message);
    }
    if (error) showError(error.message);

    setLoading(false);
  };

  const showError = (message: string) => {
    toast({
      variant: "error",
      title: "Failed to update avatar",
      description: message,
    });
  };

  return { loading, onUploadImage, onImageChange, newImage };
};
