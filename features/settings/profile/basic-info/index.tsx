import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/features/ui/card";
import { BasicInfoForm } from "./form";

interface ProfileSettingsBasicInfoProps {
  profileId: string;
  bio?: string;
  displayName?: string;
  location?: string;
}

export const ProfileSettingsBasicInfo = (
  props: ProfileSettingsBasicInfoProps
) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Update your name, bio and location</CardDescription>
      </CardHeader>
      <CardContent>
        <BasicInfoForm {...props} />
      </CardContent>
    </Card>
  );
};
