import { Avatar, AvatarFallback } from "@/features/ui/avatar";
import { Profile } from "../types";
import { User } from "@supabase/supabase-js";
import { FollowButton } from "../follow/button";
import Link from "next/link";
import { Button } from "@/features/ui/button";

interface ProfileHeaderProps {
  profile: Profile;
  user: User | null;
}

export const ProfileHeader = ({ profile, user }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-4 items-center">
        <Avatar className="w-24 h-24 text-3xl">
          <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      {user && profile.user_id !== user.id && (
        <FollowButton
          profileId={profile.user_id}
          userId={user.id}
          username={profile.username}
        />
      )}
      {profile.user_id === user?.id && (
        <Button asChild variant="outline">
          <Link href="/settings">Edit profile</Link>
        </Button>
      )}
    </div>
  );
};
