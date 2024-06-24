import { Follows } from "@/features/users/follows";

interface UserFollowingParams {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params: { username },
}: UserFollowingParams) {
  return { title: "@" + username + " / Followers" };
}

export default async function UserFollowingPage({
  params: { username },
}: UserFollowingParams) {
  return <Follows username={username} type="follower" />;
}
