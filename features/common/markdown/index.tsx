import ReactMarkdown from "react-markdown";
import { convertHashtagsToLinks } from "@/features/posts/utils";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { sanitizeContent } from "@/features/common/utils";
import { cn } from "@/lib/utils";

export const Markdown = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return (
    <ReactMarkdown
      className={cn("markdown max-w-full break-words", className)}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {convertHashtagsToLinks(sanitizeContent(content))}
    </ReactMarkdown>
  );
};
