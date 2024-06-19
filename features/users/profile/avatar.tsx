import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  imageUrl?: string;
  username: string;
  size?: "sm" | "lg";
}

export const ProfileAvatar = ({
  imageUrl,
  username,
  size = "sm",
}: ProfileAvatarProps) => {
  return (
    <Avatar className={cn(size === "lg" && "w-24 h-24 text-3xl")}>
      <AvatarImage src={imageUrl} alt={username + "'s avatar"} />
      <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
