import { Skeleton } from "../ui/skeleton";

export const CommentLoading = () => (
  <div className="relative flex gap-x-4 w-full">
    <Skeleton className="w-10 flex-shrink-0 h-10 rounded-full" />
    <div className="space-y-3 w-full">
      <div className="flex flex-row gap-x-4 justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 w-32" />
          </div>
        </div>
        <Skeleton className="w-9 h-9" />
      </div>
      <div className="w-full">
        <Skeleton className="rounded-full w-full mb-1 h-2" />
        <Skeleton className="rounded-full w-full mb-1 h-2" />
        <Skeleton className="rounded-full w-32 mb-3 h-2" />
      </div>
    </div>
  </div>
);
