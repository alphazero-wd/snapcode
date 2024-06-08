import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@/features/ui/input";
import { UserMenu } from "./user-menu";
import { createClient } from "@/lib/supabase/server";
import { AuthButtons } from "./auth-buttons";

export const Navbar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <form className="w-full">
        <div className="relative w-full">
          <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
      <UserMenu user={user} />
      <AuthButtons isAuthenticated={!!user} />
    </>
  );
};
