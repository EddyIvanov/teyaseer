import { ThemingProps, defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

type BaseStyleProps = ThemingProps & {
  isScrolled: boolean;
};

const style = ({ isScrolled }: BaseStyleProps) => {
  const background = isScrolled ? colors.background : 'transparent';
  const borderBottom = isScrolled
    ? '1px solid rgba(98, 98, 98, 0.32)'
    : '1px solid rgba(255, 255, 255, 0.32)';

  return defineStyle({
    root: {
      borderBottom,
      position: 'fixed',
      background,
      height: {
        base: 'headerMobileSize',
        lg: 'headerDesktopSize',
      },
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      w: '100%',
      zIndex: 6,
      transitionProperty: 'background',
      transitionDuration: '0.5s',
      transitionTimingFunction: 'ease-in-out',
    },
  });
};

export default style;
