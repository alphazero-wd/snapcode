import ReactMarkdown from "react-markdown";
import { convertHashtagsToLinks } from "@/features/posts/utils";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { sanitizeContent } from "@/features/common/utils";

export const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
      {convertHashtagsToLinks(sanitizeContent(content))}
    </ReactMarkdown>
  );
};
