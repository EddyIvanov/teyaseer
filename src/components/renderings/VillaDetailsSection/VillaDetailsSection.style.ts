import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import sizes from '@/styles/themes/brand/sizes';

const style = defineStyle(() => {
  return {
    root: {
      height: 'auto',
      minH: '100vh',
      pt: {
        base: `calc(${sizes.headerMobileSize} + 32px)`,
        lg: `calc(${sizes.headerDesktopSize} + 42px)`,
        '2xl': `calc(${sizes.headerDesktopSize} + 55px)`,
      },
      pb: {
        base: '40px',
        lg: '117px',
      },
    },
    headerContainer: {
      gap: '8px',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: `clamp(${FontSizes.small}, 2.9vw, ${FontSizes.fiveXLarge})`,
      fontWeight: FontWeights.medium,
    },
    villaContainer: {
      flexDirection: {
        base: 'column',
        lg: 'row',
      },
      mt: {
        base: '32px',
        xl: '42px',
        '2xl': '55px',
      },
      gap: {
        base: '24px',
        lg: '32px',
        xl: '64px',
      },
      '.villaCarouselContainer': {
        position: 'relative',
        minW: {
          base: '100vw',
          md: '100vw',
          lg: '500px',
          xl: '650px',
          '2xl': '700px',
          '3xl': '800px',
          '4xl': '950px',
        },
        height: {
          base: '394px',
          md: '480px',
          lg: '522px',
          xl: '672px',
          '2xl': '722px',
          '3xl': '872px',
          '4xl': '1022px',
        },
        '.villaImage': {
          objectFit: 'cover',
          objectPosition: 'bottom',
          borderTop: `1px solid ${colors.background}`,
          borderBottom: `1px solid ${colors.background}`,
          borderRight: {
            base: 'unset',
            lg: `1px solid ${colors.background}`,
          },
          borderLeft: {
            base: 'unset',
            lg: `1px solid ${colors.background}`,
          },
        },
        '.swiper.swiper-horizontal': {
          _ltr: {
            _before: {
              position: 'absolute',
              bottom: '-1px',
              right: {
                base: 'unset',
                lg: '-1px',
              },
              height: '101%',
              width: '100%',
              content: '""',
              zIndex: '2',
              pointerEvents: 'none',
              background: {
                base: `linear-gradient(0deg, ${colors.background} 6.21%, rgba(255, 255, 255, 0.68) 15.29%, rgba(255, 255, 255, 0.00) 25.38%)`,
                lg: `linear-gradient(270deg, ${colors.background} 4.21%, rgba(255, 255, 255, 0.68) 10.29%, rgba(255, 255, 255, 0.00) 25.38%)`,
              },
            },
          },
          _rtl: {
            _after: {
              position: 'absolute',
              bottom: '-1px',
              left: {
                base: 'unset',
                lg: '-1px',
              },
              height: '101%',
              width: '100%',
              content: '""',
              zIndex: '2',
              pointerEvents: 'none',
              background: {
                base: `linear-gradient(0deg, ${colors.background} 2.21%, rgba(255, 255, 255, 0.68) 15.29%, rgba(255, 255, 255, 0.00) 25.38%)`,
                lg: `linear-gradient(90deg, ${colors.background} 4.21%, rgba(255, 255, 255, 0.68) 10.29%, rgba(255, 255, 255, 0.00) 25.38%)`,
              },
            },
          },
        },
        '.swiper-pagination-horizontal': {
          bottom: '0px',
          justifyContent: 'center',
        },
      },
    },
  };
});

export default style;
