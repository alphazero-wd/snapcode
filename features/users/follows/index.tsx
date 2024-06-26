import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "../types";
import { Button } from "@/features/ui/button";
import { ProfileBasicInfo } from "@/features/users/profile/basic-info";
import { FollowButton } from "./button";
import { FollowsClient } from "./client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface FollowsServerProps {
  username: string;
  type: "follower" | "following";
}

export const Follows = async ({ username, type }: FollowsServerProps) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single<Profile>();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!data) redirect("/not-found");
  return (
    <div className="relative flex flex-col gap-y-5">
      <div className="flex sticky bg-background z-50 top-14 border-b pb-4 h-fit items-center flex-1 w-full gap-x-4">
        <Button
          size="icon"
          className="rounded-full flex-shrink-0 w-8 h-8 items-center"
          variant="outline"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </Button>
        <div className="w-full flex items-center justify-between gap-x-4">
          <div>
            <ProfileBasicInfo
              username={data.username}
              displayName={data?.display_name}
            />
          </div>
          <FollowButton
            profileId={data.user_id}
            username={data.username}
            userId={user?.id}
          />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          {type === "follower" ? "Followers" : "Following"}
        </h2>
        <FollowsClient userId={user?.id} profileId={data.user_id} type={type} />
      </div>
    </div>
  );
};
