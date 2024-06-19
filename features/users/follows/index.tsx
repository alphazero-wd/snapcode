import { Empty } from "../../common/empty";
import { useFollowsQuery } from "./use-query";
import { FollowUsers } from "./users";

interface FollowsProps {
  type: "follower" | "following";
  profileId: string;
  userId?: string;
}

export const Follows = ({ profileId, userId, type }: FollowsProps) => {
  const { loading, follows } = useFollowsQuery(type, profileId);

  if (!loading && follows.length === 0)
    return (
      <Empty
        title={
          type === "following" ? "No Following Found" : "No Followers Found"
        }
        description={
          (profileId === userId ? "You have" : "This user has") +
          (type === "following" ? " not followed anyone" : " no followers") +
          " at the moment"
        }
      />
    );
  return <FollowUsers loading={loading} follows={follows} userId={userId} />;
};
