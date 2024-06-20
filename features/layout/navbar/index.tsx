import { ModeToggle } from "@/features/theme/toggler";
import { Search } from "./search";
import { createClient } from "@/lib/supabase/server";

export const Navbar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="w-full flex gap-x-3 items-center justify-between ml-3 md:ml-0 flex-1">
      <Search user={user} />
      <ModeToggle />
    </div>
  );
};
