import { Skeleton } from "@/features/ui/skeleton";

export const FollowUserLoading = () => {
  return (
    <div className="flex gap-x-4 justify-between items-center">
      <div className="flex gap-x-4 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="w-20 h-9" />
    </div>
  );
};
