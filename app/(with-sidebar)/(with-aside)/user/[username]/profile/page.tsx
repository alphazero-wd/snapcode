import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/features/users/types";
import { redirect } from "next/navigation";

import { Markdown } from "@/features/common/markdown";
import { FollowStats } from "@/features/users/follows/stats";
import { ProfilePosts } from "@/features/users/posts";
import { ProfileHeader } from "@/features/users/profile/header";
import { ProfileBasicInfo } from "@/features/users/profile/basic-info";
import { ProfileExtraInfo } from "@/features/users/profile/extra-info";

interface ProfilePageParams {
  params: {
    username: string;
  };
  searchParams: {
    tab?: string;
  };
}

export async function generateMetadata({
  params: { username },
}: ProfilePageParams) {
  return { title: "@" + username + " / Profile" };
}

export default async function ProfilePage({
  params: { username },
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
      <ProfileExtraInfo createdAt={data.created_at} location={data.location} />
      <Markdown content={data.bio || ""} />
      <FollowStats profileId={data.user_id} username={data.username} />

      <div className="mt-6">
        <ProfilePosts user={user} profileId={data.user_id} />
      </div>
    </div>
  );
}
