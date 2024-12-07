import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const theme = defineStyle({
  root: {
    gap: {
      base: '24px',
      lg: '32px',
      xl: '48px',
      '2xl': '64px',
      '3xl': '120px',
    },
    justifyContent: 'space-between',
    width: {
      base: '100%',
      lg: 'min-content',
    },
    display: 'flex',
    flexDirection: {
      base: 'column',
      lg: 'row',
    },
    '.villaCarouselContainer': {
      position: 'relative',
      width: {
        base: '100vw',
        md: '100vw',
        lg: '490px',
        xl: '650px',
        '2xl': '730px',
        '3xl': '810px',
        '4xl': '890px',
      },
      height: {
        base: '394px',
        md: '480px',
        lg: '400px',
        xl: '480px',
        '2xl': '480px',
        '3xl': '560px',
        '4xl': '640px',
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
            bottom: {
              base: '-1px',
              lg: 'unset',
            },
            right: {
              base: 'unset',
              lg: '-1px',
            },
            height: '100%',
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
          _before: {
            position: 'absolute',
            bottom: {
              base: '-1px',
              lg: 'unset',
            },
            left: {
              base: 'unset',
              lg: '-1px',
            },
            height: '100%',
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
    '.villaShortDetailsSmallContainer': {
      position: 'relative',
      flexDirection: 'column',
      maxW: {
        base: '100%',
        lg: 'min-content',
      },
    },
  },
});

export default theme;
