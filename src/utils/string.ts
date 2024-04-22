export const reduceTokensFromHtml = (html: string) => {
  return html.replace(/\s{2,}/g, ' ').replace(/<!--[\s\S]*?-->/g, '');
};
