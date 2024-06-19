import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/features/users/types";
import { redirect } from "next/navigation";
import { ProfileBasicInfo, ProfileHeader } from "@/features/users/profile";
import { Markdown } from "@/features/common/markdown";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns/format";
import { FollowStats } from "@/features/users/follows/stats";
import { ProfileTabs } from "@/features/users/profile/tabs";

interface ProfilePageParams {
  params: {
    username: string;
  };
  searchParams: {
    tab?: string;
  };
}

export default async function ProfilePage({
  params: { username },
  searchParams: { tab },
}: ProfilePageParams) {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single<Profile>();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!data) redirect("/not-found");

  return (
    <div className="flex flex-col gap-y-3">
      <ProfileHeader user={user} profile={data} />

      <div className="flex gap-x-4 items-center">
        <ProfileBasicInfo
          displayName={data.display_name || data.username}
          username={data.username}
        />
      </div>
      <div className="text-muted-foreground flex items-center text-sm gap-x-2">
        <CalendarDaysIcon className="w-4 h-4" />
        Joined {format(new Date(data.created_at), "MMMM y")}
      </div>
      <Markdown content={data.bio || ""} />
      <FollowStats profileId={data.user_id} username={data.username} />

      <div className="mt-6">
        <ProfileTabs tab={tab} profileId={data.user_id} user={user} />
      </div>
    </div>
  );
}
