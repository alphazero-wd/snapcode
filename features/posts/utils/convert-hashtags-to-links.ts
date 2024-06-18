export const convertHashtagsToLinks = (content: string) => {
  return content.replace(/#(\w+)/g, (match, tagName) => {
    return `<a href="/tag/${tagName}">${match}</a>`;
  });
};
