import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { Avatar, AvatarFallback } from "@/features/ui/avatar";
import { PostOptions } from "./options";

interface PostHeaderProps {
  username: string;
  created_at: string;
  updated_at: string | null;
  creator_id: string;
}

export const PostHeader = ({
  username,
  created_at,
  updated_at,
  creator_id,
}: PostHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex gap-x-4 items-center">
        <Avatar>
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-sm">{username}</div>
          <div className="text-muted-foreground text-sm">
            created{" "}
            {formatDistanceToNowStrict(new Date(created_at), {
              addSuffix: true,
            })}
            {updated_at &&
              `edit ${formatDistanceToNowStrict(new Date(updated_at), {
                addSuffix: true,
              })}`}
          </div>
        </div>
      </div>
      <PostOptions creator_id={creator_id} />
    </div>
  );
};
