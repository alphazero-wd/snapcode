"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/ui/tabs";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Follows } from "../follows";
import { ProfilePosts } from "../posts";

interface ProfileTabsProps {
  user: User | null;
  profileId: string;
  tab?: string;
}
const tabs = ["posts", "followers", "following"];

export const ProfileTabs = ({ user, profileId, tab }: ProfileTabsProps) => {
  const [currentTab, setCurrentTab] = useState("posts");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (tab && tabs.includes(tab)) setCurrentTab(tab);
  }, [tab]);

  useEffect(() => {
    router.push(pathname + "?tab=" + currentTab);
  }, [currentTab, pathname]);

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab[0].toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent className="mt-6" value="posts">
        <ProfilePosts user={user} profileId={profileId} />
      </TabsContent>
      <TabsContent className="mt-6" value="followers">
        <Follows userId={user?.id} profileId={profileId} type="follower" />
      </TabsContent>
      <TabsContent className="mt-6" value="following">
        <Follows userId={user?.id} profileId={profileId} type="following" />
      </TabsContent>
    </Tabs>
  );
};
