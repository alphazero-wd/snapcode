import { createClient } from "@/lib/supabase/server";
import { Profile } from "../../users/types";

export const getUserWithProfile = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("user_id", user?.id)
    .single<Profile>();
  return { user, profile };
};
