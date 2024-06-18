import { ModeToggle } from "@/features/theme/toggler";
import { Search } from "./search";

export const Navbar = async () => {
  return (
    <div className="w-full flex gap-x-3 items-center justify-between ml-3 md:ml-0 flex-1">
      <Search />
      <ModeToggle />
    </div>
  );
};
