"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const SettingsTabs = () => {
  const pathname = usePathname();
  const links = [
    { href: "profile", name: "Profile" },
    { href: "account", name: "Account" },
  ];

  return (
    <nav className="sticky top-14 bg-inherit backdrop-blur-xl z-20 flex gap-x-2 text-sm text-muted-foreground">
      {links.map((link) => (
        <Link
          key={link.href}
          href={`/settings/${link.href}`}
          className={cn(
            pathname === `/settings/${link.href}`
              ? "font-semibold text-primary border-b-4 border-primary"
              : "hover:border-b-4 hover:border-muted-foreground",
            "py-4 px-2"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};
