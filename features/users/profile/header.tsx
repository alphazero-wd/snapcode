import { Profile } from "../types";
import { User } from "@supabase/supabase-js";
import { FollowButton } from "../follows/button";
import Link from "next/link";
import { Button } from "@/features/ui/button";
import { ProfileAvatar } from "./avatar";
import { createClient } from "@/lib/supabase/server";
import { getAvatarUrl } from "./get-avatar-url";
import { AvatarZoom } from "./avatar-zoom";

interface ProfileHeaderProps {
  profile: Profile;
  user: User | null;
}

export const ProfileHeader = ({ profile, user }: ProfileHeaderProps) => {
  const supabase = createClient();
  return (
    <div className="flex items-center justify-between">
      <AvatarZoom
        username={profile.username}
        avatar={getAvatarUrl(supabase, profile.avatar, 400)}
      />
      <FollowButton
        profileId={profile.user_id}
        userId={user?.id}
        username={profile.username}
      />
      {profile.user_id === user?.id && (
        <Button asChild variant="outline">
          <Link href="/settings">Edit profile</Link>
        </Button>
      )}
    </div>
  );
};
