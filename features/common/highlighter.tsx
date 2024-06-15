import { useMemo } from "react";

interface HighlighterProps {
  keyword: string;
  content: string;
}

export const Highlighter = ({ keyword, content }: HighlighterProps) => {
  const keywordRegex = useMemo(() => new RegExp(keyword, "gi"), [keyword]);
  const parts = useMemo(
    () => content.split(keywordRegex),
    [keywordRegex, content]
  );
  const matches = useMemo(
    () => [...(content.matchAll(keywordRegex) || [])],
    [content, keywordRegex]
  );

  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i !== parts.length - 1 && (
        <span className="bg-orange-100 decoration-orange-500 text-orange-900 decoration-2 underline-offset-4 font-medium underline">
          {matches[i]}
        </span>
      )}
    </span>
  ));
};
