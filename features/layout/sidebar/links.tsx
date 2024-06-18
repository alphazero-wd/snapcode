"use client";

import {
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Profile } from "@/features/users/types";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useMemo,
} from "react";
import Link from "next/link";
import { useLoginModal } from "@/features/auth/login";

interface SidebarLink {
  href: string | null;
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
}

export const SidebarLinks = ({
  profile,
  isMobile = true,
}: {
  profile: Profile | null;
  isMobile?: boolean;
}) => {
  const { onOpen } = useLoginModal();
  const sidebarLinks = useMemo(
    () => [
      { href: "/", name: "Home", icon: HomeIcon },
      {
        href: profile ? `/user/${profile?.username}/profile` : null,
        name: "Profile",
        icon: UserCircleIcon,
      },
      {
        href: profile ? "/settings" : null,
        name: "Settings",
        icon: Cog6ToothIcon,
      },
    ],
    [profile]
  );
  return sidebarLinks.map((link) =>
    isMobile ? (
      <MobileLink onLoginAction={onOpen} link={link} />
    ) : (
      <DesktopLink onLoginAction={onOpen} link={link} />
    )
  );
};

interface SidebarLinkProps {
  link: SidebarLink;
  onLoginAction: () => void;
}

const DesktopLink = ({ link, onLoginAction }: SidebarLinkProps) => (
  <Link
    onClick={!link.href ? onLoginAction : undefined}
    href={link.href || "#"}
    key={link.href}
    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
  >
    <link.icon className="h-5 w-5" />
    {link.name}
  </Link>
);

const MobileLink = ({ link, onLoginAction }: SidebarLinkProps) => {
  return (
    <Link
      onClick={!link.href ? onLoginAction : undefined}
      href={link.href || "#"}
      key={link.href}
      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    >
      <link.icon className="h-5 w-5" />
      {link.name}
    </Link>
  );
};
