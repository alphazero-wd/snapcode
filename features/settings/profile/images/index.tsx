import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/features/ui/card";
import { AvatarSettings } from "./avatar";

interface ImagesSettingsProps {
  profileId: string;
  username: string;
  avatar?: string;
  banner?: string;
}

export const ImagesSettings = ({
  profileId,
  username,
  avatar,
  banner,
}: ImagesSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Images</CardTitle>
        <CardDescription>Change your profile avatar and banner</CardDescription>
      </CardHeader>
      <CardContent>
        <AvatarSettings
          profileId={profileId}
          username={username}
          avatar={avatar}
        />
      </CardContent>
    </Card>
  );
};
