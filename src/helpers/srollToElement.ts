export const scrollToElement = (elementId: string) => {
  const element = document?.getElementById(elementId);
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }
};
