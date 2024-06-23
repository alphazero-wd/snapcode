import { ProfileSettingsBasicInfo } from "@/features/settings/profile/basic-info";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Profile } from "@/features/users/types";
import { ImagesSettings } from "@/features/settings/profile/images";

export const metadata = {
  title: "Settings / Profile",
};

export default async function ProfileSettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");
  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user.id)
    .single<Profile>();
  if (!profile) redirect("/not-found");

  return (
    <div className="grid gap-6">
      <ProfileSettingsBasicInfo
        profileId={profile.user_id}
        displayName={profile.display_name}
        bio={profile.bio}
        location={profile.location}
      />
      <ImagesSettings
        avatar={profile.avatar}
        profileId={profile.user_id}
        username={profile.username}
      />
    </div>
  );
}
