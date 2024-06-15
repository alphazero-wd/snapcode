export const searchHashtags = (content: string): Set<string> => {
  const matches = content.match(/#(\w+)/g);
  if (!matches) return new Set();
  return new Set(matches.map((m) => m.slice(1))); // get the tag name (excluding hashtag)
};
