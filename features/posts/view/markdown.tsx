import ReactMarkdown from "react-markdown";
import { convertHashtagsToLinks, sanitizeContent } from "../utils";
import rehypeRaw from "rehype-raw";

export const PostMarkdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {convertHashtagsToLinks(sanitizeContent(content))}
    </ReactMarkdown>
  );
};
