export const convertHashtagsToLinks = (content: string) => {
  return content.replace(/#(\w+)/g, (match, tagName) => {
    return `[${match}](/tag/${tagName})`;
  });
};
