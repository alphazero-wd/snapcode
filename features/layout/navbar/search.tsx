"use client";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@/features/ui/input";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export const Search = () => {
  const { tag } = useParams();
  const [value, setValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const hashtagValue = useMemo(() => (tag ? "#" + tag : ""), [tag]);

  useEffect(() => {
    setValue(hashtagValue);
  }, [hashtagValue]);

  const clearSearch = () => {
    setValue("");
    searchRef.current?.focus();
  };

  return (
    <div className="relative w-full md:w-2/3 lg:w-1/3">
      <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        ref={searchRef}
        placeholder={value || hashtagValue || "Search..."}
        className="w-full appearance-none bg-background pl-8 shadow-none"
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <XMarkIcon
          className="absolute top-2.5 h-4 w-4 cursor-pointer text-muted-foreground right-2.5"
          onClick={clearSearch}
        />
      )}
    </div>
  );
};
