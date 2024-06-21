"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/features/ui/command";
import { cn } from "@/lib/utils";
import { Tag } from "@/features/posts/types";
import { createClient } from "@/lib/supabase/client";
import { Highlighter } from "@/features/common/highlighter";
import { Profile } from "@/features/users/types";
import { FollowButton } from "@/features/users/follows/button";
import { User } from "@supabase/supabase-js";
import { ProfileAvatar } from "@/features/users/profile/avatar";
import { ProfileBasicInfo } from "@/features/users/profile/basic-info";
import { getAvatarUrl } from "../../users/profile/get-avatar-url";

const supabase = createClient();
export const Search = ({ user }: { user: User | null }) => {
  const { tag, username } = useParams();
  const [value, setValue] = useState("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [tagsResult, setTagsResult] = useState<Tag[]>([]);
  const [profilesResult, setProfilesResult] = useState<Profile[]>([]);
  const hashtagValue = useMemo(() => (tag ? "#" + tag : ""), [tag]);
  const handle = useMemo(() => (username ? "@" + username : ""), [username]);
  const router = useRouter();

  useEffect(() => {
    setValue(hashtagValue);
  }, [hashtagValue]);

  useEffect(() => {
    setValue(handle);
  }, [handle]);

  const search = async () => {
    if (value.length === 0) return [];
    const { data: tags } = await supabase
      .from("tags")
      .select()
      .ilike("name", `*${value.replace("#", "")}*`)
      .limit(10)
      .returns<Tag[]>();
    const { data: profiles } = await supabase
      .from("profiles")
      .select()
      .ilike("username", `*${value.replace("@", "")}*`)
      .limit(10)
      .returns<Profile[]>();

    setTagsResult(tags || []);
    setProfilesResult(profiles || []);
  };

  useEffect(() => {
    search();
  }, [value]);

  const onProfileSelect = (username: string) => {
    router.push(`/user/${username}/profile`);
    setIsCommandOpen(false);
  };
  const onTagSelect = (tagName: string) => {
    router.push(`/tag/${tagName}`);
    setIsCommandOpen(false);
  };

  return (
    <Command
      shouldFilter={false} // must add this
      className="z-50 w-full md:w-2/3 lg:w-1/3"
    >
      <CommandInput
        placeholder={hashtagValue || handle || "Search..."}
        value={value || ""}
        onValueChange={(search) => setValue(search)}
        onBlur={() => setIsCommandOpen(false)}
        onFocus={() => setIsCommandOpen(true)}
      />

      <CommandList
        className={cn(
          (!value || !isCommandOpen) && "hidden",
          "absolute shadow border rounded-md bg-popover w-4/5 md:w-2/3 lg:w-1/3 top-14"
        )}
      >
        {tagsResult.length + profilesResult.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {tagsResult.length > 0 && (
          <CommandGroup heading="Tags">
            {tagsResult.map((tag) => (
              <CommandItem
                key={tag.id}
                onSelect={() => onTagSelect(tag.name)}
                onClick={() => onTagSelect(tag.name)}
              >
                <Highlighter content={`#${tag.name}`} keyword={value} />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {profilesResult.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Users">
              {profilesResult.map((profile) => (
                <CommandItem
                  key={profile.user_id}
                  onSelect={() => onProfileSelect(profile.username)}
                  onClick={() => onProfileSelect(profile.username)}
                  className="flex justify-between hover:bg- gap-x-4"
                >
                  <div className="flex gap-x-2">
                    <ProfileAvatar
                      avatar={getAvatarUrl(supabase, profile.avatar)}
                      username={profile.username}
                    />
                    <div>
                      <ProfileBasicInfo
                        username={profile.username}
                        displayName={profile?.display_name}
                      />
                    </div>
                  </div>
                  <FollowButton
                    profileId={profile.user_id}
                    username={profile.username}
                    userId={user?.id}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
};
