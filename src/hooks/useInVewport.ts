import { useEffect, useState } from 'react';

interface IOptions {
  threshold?: number;
  once?: boolean;
}

const useInViewport = (
  ref: React.RefObject<any>,
  props: IOptions = { threshold: 0.3, once: false }
) => {
  const { threshold, once } = props;
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (once && entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, once]);

  return isIntersecting;
};
export default useInViewport;
