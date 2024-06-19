import { Follows } from "@/features/users/follows";

interface UserFollowingParams {
  params: {
    username: string;
  };
}

export default async function UserFollowingPage({
  params: { username },
}: UserFollowingParams) {
  return <Follows username={username} type="follower" />;
}
