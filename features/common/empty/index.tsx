import { EmptyIllustration } from "./illustration";

interface EmptyProps {
  title: string;
  description?: string;
}

export const Empty = ({ title, description }: EmptyProps) => {
  return (
    <div className="flex text-center items-center justify-center flex-col gap-y-4">
      <EmptyIllustration />
      <h2 className="font-bold text-foreground tracking-tight text-2xl">
        {title}
      </h2>
      <p className="max-w-md text-muted-foreground">{description}</p>
    </div>
  );
};
