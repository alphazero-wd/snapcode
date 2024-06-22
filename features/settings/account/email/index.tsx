"use client";

import { EmailInputForm } from "./input";
import { InputOTPForm } from "./otp-input";
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
  const {
    form,
    loading,
    onSubmit,
    isBeingVerified,
    goBack,
    oldEmail,
    hasSubmitted,
    startVerifying,
    resetSubmissionState,
  } = useEmailSettings(email);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Setting</CardTitle>
        <CardDescription>
          Change your email here, confirmation required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isBeingVerified ? (
          <InputOTPForm
            resetSubmissionState={resetSubmissionState}
            goBack={goBack}
            newEmail={form.getValues("email")}
            oldEmail={email}
          />
        ) : (
          <EmailInputForm
            email={oldEmail}
            form={form}
            loading={loading}
            onSubmit={onSubmit}
            hasSubmitted={hasSubmitted}
            startVerifying={startVerifying}
          />
        )}
      </CardContent>
    </Card>
  );
};
