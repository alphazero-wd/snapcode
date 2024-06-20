import { Button } from "@/features/ui/button";
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
        <CardDescription>
          Your basic information will be available to the public
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BasicInfoForm {...props} />
      </CardContent>
    </Card>
  );
};
