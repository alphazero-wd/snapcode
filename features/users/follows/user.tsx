import { ProfileCard } from "@/features/users/profile/card";
import Link from "next/link";
import { ProfileAvatar } from "../profile/avatar";
import { Profile } from "../types";
import { FollowButton } from "./button";

interface FollowUserProps {
  profile: Profile;
  userId?: string;
}

export const FollowUser = ({ profile, userId }: FollowUserProps) => {
  return (
    <div className="flex gap-x-4 justify-between items-center">
      <div className="flex gap-x-4 items-center">
        <ProfileAvatar avatar={profile.avatar} username={profile.username} />
        <div>
          <ProfileCard
            username={profile.username}
            userId={userId}
            renderTrigger={() => (
              <Link
                href={`/user/${profile.username}/profile`}
                className="hover:underline decoration-1 line-clamp-1 font-semibold text-foreground"
              >
                {profile.display_name || profile.username}
              </Link>
            )}
          />
          <div className="text-primary line-clamp-1 text-sm">
            @{profile.username}
          </div>
        </div>
      </div>
      <FollowButton
        profileId={profile.user_id}
        username={profile.username}
        userId={userId}
      />
    </div>
  );
};
