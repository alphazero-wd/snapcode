import { Avatar, AvatarFallback } from "@/features/ui/avatar";
import { Profile } from "../types";
import { User } from "@supabase/supabase-js";
import { FollowButton } from "../follows/button";
import Link from "next/link";
import { Button } from "@/features/ui/button";
import { ProfileAvatar } from "./avatar";

interface ProfileHeaderProps {
  profile: Profile;
  user: User | null;
}

export const ProfileHeader = ({ profile, user }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-4 items-center">
        <ProfileAvatar
          size="lg"
          username={profile.username}
          imageUrl={profile.avatar_url}
        />
      </div>
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
