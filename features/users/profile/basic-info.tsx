interface ProfileBasicInfoProps {
  displayName?: string;
  username: string;
}

export const ProfileBasicInfo = ({
  displayName,
  username,
}: ProfileBasicInfoProps) => {
  return (
    <>
      <div className="text-lg line-clamp-1 font-semibold text-foreground">
        {displayName || username}
      </div>
      <div className="text-primary line-clamp-1 text-sm">@{username}</div>
    </>
  );
};
