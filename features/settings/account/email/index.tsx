"use client";

import { EmailInputForm } from "./input";
import { useEmailSettings } from "./use-email-settings";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/features/ui/card";

interface EmailSettingsProps {
  email: string;
}

export const EmailSettings = ({ email }: EmailSettingsProps) => {
  const { form, loading, onSubmit } = useEmailSettings(email);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Setting</CardTitle>
        <CardDescription>
          Change your email here, confirmation required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EmailInputForm
          hasChanged={form.getValues("email") !== email}
          form={form}
          loading={loading}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  );
};
