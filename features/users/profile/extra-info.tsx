import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns/format";

interface ProfileExtraInfoProps {
  location?: string;
  createdAt: string;
}

export const ProfileExtraInfo = ({
  location,
  createdAt,
}: ProfileExtraInfoProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {location && (
        <div className="text-muted-foreground flex items-center text-sm gap-x-1">
          <MapPinIcon className="w-4 h-4" />
          {location}
        </div>
      )}
      <div className="text-muted-foreground flex items-center text-sm gap-x-1">
        <CalendarDaysIcon className="w-4 h-4" />
        Joined {format(new Date(createdAt), "MMMM y")}
      </div>
    </div>
  );
};
