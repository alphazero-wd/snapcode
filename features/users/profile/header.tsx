import { Avatar, AvatarFallback } from "@/features/ui/avatar";
import { Button } from "@/features/ui/button";
import { Profile } from "../types";

interface ProfileHeaderProps {
  profile: Profile;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-4 items-center">
        <Avatar className="w-24 h-24 text-3xl">
          <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <Button>Follow</Button>
    </div>
  );
};
