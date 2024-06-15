import { createClient } from "@/lib/supabase/client";
import { searchHashtags } from "../utils";

const supabase = createClient();

export const useTags = () => {
  const manageTags = async (
    postId: string,
    content: string,
    userId: string
  ) => {
    const hashtags = searchHashtags(content);

    const { data } = await supabase
      .from("tags_posts")
      .select(`tag_id, tags (name)`)
      .eq("post_id", postId)
      .returns<
        {
          tag_id: string;
          tags: { name: string };
        }[]
      >();

    const allTags = new Set((data || []).map((t) => t.tags.name));
    const toBeCreatedTags = Array.from(hashtags)
      .filter((tag) => !allTags.has(tag))
      .map((name) => ({ name }));

    const { data: tagsData } = await supabase
      .from("tags")
      .insert(toBeCreatedTags)
      .select("id")
      .returns<{ id: string }[]>();

    const excludedTagIds = (data || [])
      .filter((tp) => !hashtags.has(tp.tags.name))
      .map((tp) => tp.tag_id);

    await supabase
      .from("tags_posts")
      .delete()
      .eq("post_id", postId)
      .in("tag_id", excludedTagIds);

    if (tagsData && tagsData.length > 0) {
      await supabase.from("tags_posts").upsert(
        tagsData.map((tagData) => ({
          tag_id: tagData.id,
          post_id: postId,
          creator_id: userId,
        }))
      );
    }
  };
  return { manageTags };
};
