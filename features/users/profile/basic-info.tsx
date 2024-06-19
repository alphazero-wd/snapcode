interface ProfileBasicInfoProps {
  displayName: string;
  username: string;
}

export const ProfileBasicInfo = ({
  displayName,
  username,
}: ProfileBasicInfoProps) => {
  return (
    <div className="flex flex-wrap gap-x-3 items-baseline">
      <div className="text-xl line-clamp-1 font-semibold text-foreground">
        {displayName || username}
      </div>
      <div className="text-muted-foreground line-clamp-1 text-sm">
        @{username}
      </div>
    </div>
  );
};
