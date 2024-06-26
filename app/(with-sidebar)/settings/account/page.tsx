import { EmailSettings } from "@/features/settings/account/email";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PasswordSettings } from "@/features/settings/account/password";
import { DeleteAccount } from "@/features/settings/account/delete";

export const metadata = {
  title: "Settings / Account",
};

export default async function AccountSettings() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");
  return (
    <div className="grid gap-6">
      <EmailSettings email={user.email!} />
      <PasswordSettings />
      <DeleteAccount />
    </div>
  );
}
