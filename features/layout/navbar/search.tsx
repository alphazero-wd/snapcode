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
} from "@/features/ui/command";
import { cn } from "@/lib/utils";
import { Tag } from "@/features/posts/types";
import { createClient } from "@/lib/supabase/client";
import { Highlighter } from "@/features/common/highlighter";

const supabase = createClient();
export const Search = () => {
  const { tag } = useParams();
  const [value, setValue] = useState("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [tagsResult, setTagsResult] = useState<Tag[]>([]);
  const hashtagValue = useMemo(() => (tag ? "#" + tag : ""), [tag]);
  const router = useRouter();

  useEffect(() => {
    setValue(hashtagValue);
  }, [hashtagValue]);

  const searchForTags = async () => {
    const { data } = await supabase
      .from("tags")
      .select()
      .ilike("name", `*${value.replace("#", "")}*`)
      .limit(10)
      .returns<Tag[]>();
    return data;
  };

  useEffect(() => {
    searchForTags().then((data) => setTagsResult(data || []));
  }, [value]);

  return (
    <Command
      shouldFilter={false} // must add this
      className="z-50 w-full md:w-2/3 lg:w-1/3"
    >
      <CommandInput
        placeholder={hashtagValue || "Search..."}
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
        {tagsResult.length === 0 ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : (
          <CommandGroup heading="Tags">
            {tagsResult.map((tag) => (
              <CommandItem
                key={tag.id}
                onSelect={() => {
                  router.push(`/tag/${tag.name}`);
                  setIsCommandOpen(false);
                }}
              >
                <Highlighter content={`#${tag.name}`} keyword={value} />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};
