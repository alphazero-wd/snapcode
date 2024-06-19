import { Follows } from "@/features/users/follows";

interface UserFollowersParams {
  params: {
    username: string;
  };
}

export default async function UserFollowersPage({
  params: { username },
}: UserFollowersParams) {
  return <Follows username={username} type="following" />;
}
