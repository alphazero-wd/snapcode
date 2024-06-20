import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/features/ui/use-toast";
import {
  BIO_MAX_LENGTH,
  LOCATION_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "@/constants";

interface BasicInfoFormParams {
  profileId: string;
  displayName?: string;
  bio?: string;
  location?: string;
}

const formSchema = z.object({
  displayName: z
    .string()
    .max(NAME_MAX_LENGTH, {
      message: "Display name is too long",
    })
    .optional(),
  bio: z
    .string()
    .max(BIO_MAX_LENGTH, { message: "Bio is too long" })
    .optional(),
  location: z
    .string()
    .max(LOCATION_MAX_LENGTH, { message: "Location is too long" })
    .optional(),
});

export const useBasicInfoForm = ({
  profileId,
  displayName,
  bio,
  location,
}: BasicInfoFormParams) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      location: "",
    },
  });

  useEffect(() => {
    form.setValue("displayName", displayName);
    form.setValue("bio", bio);
    form.setValue("location", location);
  }, [displayName, bio, location]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setTimeout(() => update(values), 2000);
  };
  const update = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: values.displayName,
        bio: values.bio,
        location: values.location,
      })
      .eq("user_id", profileId);
    if (error)
      toast({
        variant: "error",
        title: "Failed to update profile",
        description: error.message,
      });
    else toast({ variant: "success", title: "Profile updated successfully" });
    setLoading(false);
  };

  return { loading, onSubmit, form };
};
