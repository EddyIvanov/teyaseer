import { useEffect } from 'react';

const OrientationType = {
  LANDSCAPE: 'landscape-primary',
  PORTRAIT: 'portrait-primary',
};

const useFooterUpdateOnOrientationChange = () => {
  const onOrientationChange = () => {
    const type = window.screen.orientation.type;
    const footer = document.querySelector('footer');

    if (type === OrientationType.LANDSCAPE && footer) {
      footer.style.position = 'absolute';
    }
  };

  useEffect(() => {
    screen.orientation.addEventListener('change', onOrientationChange);

    return () => {
      screen.orientation.removeEventListener('change', onOrientationChange);
    };
  }, []);

  return {};
};

export default useFooterUpdateOnOrientationChange;
