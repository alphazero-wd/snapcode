import { SupabaseClient } from "@supabase/supabase-js";
import { BUCKET_ID } from "@/constants";

export const getAvatarUrl = (supabase: SupabaseClient, avatar?: string) => {
  if (!avatar) return;
  return supabase.storage.from(BUCKET_ID).getPublicUrl(avatar).data.publicUrl;
};
