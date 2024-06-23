import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/features/ui/dialog";
import { ProfileAvatar } from "./avatar";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";

interface AvatarZoomProps {
  avatar?: string;
  username: string;
}

export const AvatarZoom = ({ avatar, username }: AvatarZoomProps) => {
  if (!avatar) return <ProfileAvatar size="lg" username={username} />;
  return (
    <Dialog>
      <DialogTrigger className="relative">
        <div className="opacity-0 hover:opacity-100 z-10 text-background transition-opacity rounded-full w-full h-full absolute top-0 left-0 bg-foreground/80 flex justify-center items-center">
          <ViewfinderCircleIcon className="w-6 h-6" />
        </div>
        <ProfileAvatar size="lg" username={username} avatar={avatar} />
      </DialogTrigger>
      <DialogContent className="p-0 w-screen flex max-w-none justify-center items-center h-full">
        <Image
          className="max-w-[300px] max-h-[300px] rounded-lg"
          width={400}
          height={400}
          src={avatar}
          alt={username + "'s avatar"}
        />
      </DialogContent>
    </Dialog>
  );
};
