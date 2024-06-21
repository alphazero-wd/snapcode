import { ProfileSettingsBasicInfo } from "@/features/settings/profile/basic-info";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Profile } from "@/features/users/types";
import { ProfileSettingsImages } from "@/features/settings/profile/images/avatar";
import { DeleteAvatarModal } from "@/features/settings/profile/images/avatar/delete-modal";

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
      <ProfileSettingsImages
        avatar={profile.avatar}
        profileId={profile.user_id}
        username={profile.username}
      />
      <DeleteAvatarModal profileId={profile.user_id} />
    </div>
  );
}
