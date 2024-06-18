import sanitize from "sanitize-html";
const allowedTags = [
  "b",
  "em",
  "strong",
  "i",
  "u",
  "strike",
  "iframe",
  "blockquote",
  "mark",
  "code",
  "pre",
  "img",
  "video",
  "a",
  "p",
  "br",
];

export const sanitizeContent = (content: string) => {
  return sanitize(content, {
    allowedTags,
    allowedIframeDomains: ["www.youtube.com"],
  });
};
