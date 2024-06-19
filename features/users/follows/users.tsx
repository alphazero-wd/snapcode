import { PAGE_LIMIT } from "@/constants";
import { FollowWithProfile } from "../types";
import { FollowUserLoading } from "./loading";
import { FollowUser } from "./user";

interface FollowersProps {
  follows: FollowWithProfile[];
  userId?: string;
  loading: boolean;
}

export const FollowUsers = ({ follows, userId, loading }: FollowersProps) => {
  return (
    <div className="grid gap-y-5">
      {loading
        ? Array(PAGE_LIMIT)
            .fill(null)
            .map((_, i) => <FollowUserLoading key={i} />)
        : follows.map((follow) => (
            <FollowUser
              key={follow.profiles.user_id}
              userId={userId}
              profile={follow.profiles}
            />
          ))}
    </div>
  );
};
