export const removeCommentsFromHTML = (html: string) => {
  return html.replace(/<!--[\s\S]*?-->/g, '');
};
