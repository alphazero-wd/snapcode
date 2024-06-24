import { useMemo, useState } from "react";
import { Markdown } from "@/features/common/markdown";
import { Button } from "@/features/ui/button";
import { MAX_CHARS_TO_SHOW, MAX_LINES_TO_SHOW } from "../constants";

export const CommentContent = ({ content }: { content: string }) => {
  const [showMore, setShowMore] = useState(false);
  const lines = useMemo(
    () => [...content.matchAll(/<p>(.*?)<\/p>/g)].map((match) => match[0]),
    [content]
  );

  const shouldTruncateByLines = useMemo(
    () => lines.length > MAX_LINES_TO_SHOW,
    [lines.length]
  );

  const shouldTruncateByCharacters = useMemo(
    () => !shouldTruncateByLines && content.length > MAX_CHARS_TO_SHOW,
    [shouldTruncateByLines, content.length]
  );

  const shouldTruncate = useMemo(
    () => shouldTruncateByCharacters || shouldTruncateByLines,
    [shouldTruncateByLines, shouldTruncateByCharacters]
  );

  const truncatedContent = useMemo(() => {
    const truncatedLineIndex = shouldTruncateByLines
      ? MAX_LINES_TO_SHOW
      : lines.length;

    const truncatedCharIndex = shouldTruncateByCharacters
      ? MAX_CHARS_TO_SHOW
      : content.length;

    const result = lines
      .slice(0, truncatedLineIndex)
      .join("")
      .slice(0, truncatedCharIndex);
    console.log({ result });

    return result;
  }, [lines, content, shouldTruncate]);

  return (
    <div className="w-full">
      <Markdown content={showMore ? content : truncatedContent} />
      {shouldTruncate && (
        <Button
          onClick={() => setShowMore(!showMore)}
          variant="link"
          className="p-0 text-primary underline underline-offset-4 w-fit h-fit"
        >
          Show {!showMore ? "more" : "less"}
        </Button>
      )}
    </div>
  );
};
