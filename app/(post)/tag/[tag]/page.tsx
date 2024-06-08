import { PostsView } from "@/features/posts/view";

interface TagPageParams {
  params: {
    tag: string;
  };
}

export default async function TagPage({ params: { tag } }: TagPageParams) {
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="mb-3 text-2xl tracking-tight font-semibold">#{tag}</h1>
      <PostsView tag={tag} />
    </div>
  );
}
