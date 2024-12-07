export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => null) => {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<F>): null {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, waitFor);

    return null;
  };
};
