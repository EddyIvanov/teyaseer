export const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http') || url.startsWith('https');
};
