import { UserMenu } from "./user-menu";
import { createClient } from "@/lib/supabase/server";
import { AuthButtons } from "./auth-buttons";
import { Search } from "./search";

export const Navbar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <Search />
      <UserMenu user={user} />
      <AuthButtons isAuthenticated={!!user} />
    </>
  );
};
