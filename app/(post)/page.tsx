import { Navbar } from "@/features/layout/navbar";
import { DesktopLogo, MobileLogo } from "../../features/ui/logo";
import Link from "next/link";
import { CreatePost } from "@/features/posts/create";
import { createClient } from "@/lib/supabase/server";
import { Posts } from "../../features/posts/items";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-y-6">
      <CreatePost user={user} />
      <Posts />
    </div>
  );
}
