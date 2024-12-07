import { defineStyle } from '@chakra-ui/react';

const withAnimationCSS = {
  height: {
    base: 'auto',
    lg: '100svh',
  },
  zIndex: {
    base: '1',
    lg: '2',
  },
};

const noAnimationCSS = {
  height: 'auto',
  zIndex: '1',
  transform: 'translateY(0px)',
  transition: 'unset',
};

const baseStyle = defineStyle((props: any) => {
  const { withScrollAnimation = false } = props;
  return {
    root: {
      ...(withScrollAnimation
        ? { ...withAnimationCSS }
        : { ...noAnimationCSS }),
    },
  };
});

export default baseStyle;
