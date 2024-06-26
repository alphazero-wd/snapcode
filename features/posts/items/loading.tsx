import { Card, CardContent, CardHeader } from "@/features/ui/card";
import { Skeleton } from "@/features/ui/skeleton";

export const PostLoading = () => {
  return (
    <Card className="relative w-full">
      <CardHeader className="flex flex-row gap-x-4 justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 w-32" />
          </div>
        </div>
        <Skeleton className="w-9 h-9" />
      </CardHeader>
      <CardContent className="w-full overflow-hidden">
        <Skeleton className="rounded-full w-full mb-1 h-2" />
        <Skeleton className="rounded-full w-full mb-1 h-2" />
        <Skeleton className="rounded-full w-full mb-1 h-2" />
        <Skeleton className="rounded-full w-full mb-1 h-2" />
        <Skeleton className="rounded-full w-full mb-1 h-2" />
        <Skeleton className="rounded-full w-32 mb-3 h-2" />

        <Skeleton className="w-full h-20" />
      </CardContent>
    </Card>
  );
};
