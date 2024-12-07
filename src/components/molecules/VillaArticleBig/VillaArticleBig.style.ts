import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const paddingValues = {
  base: 'unset',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '48px',
  '4xl': '60px',
};

const leftSideVillaShortDetailsBigContainer = {
  m: {
    base: 'unset',
    lg: '-156.4px 0 0 -1px',
    xl: '-156.2px 0 0 -1px',
    '2xl': '-159.2px 0 0 -1px',
    '3xl': '-165px 0 0 -1px',
    '4xl': '-172px 0 0 -1px',
  },
  px: paddingValues,
};

const rightSideVillaShortDetailsBigContainer = {
  m: {
    base: 'unset',
    lg: '-156.4px -1px 0 0',
    xl: '-156.2px -1px 0 0',
    '2xl': '-159.2px -1px 0 0',
    '3xl': '-165px -1px 0 0',
    '4xl': '-172px -1px 0 0',
  },
  px: paddingValues,
};

const bottomShadowStyling = {
  position: 'absolute',
  bottom: {
    base: '-1px',
    lg: 'unset',
  },
  height: '100%',
  width: '100%',
  content: '""',
  zIndex: '2',
  pointerEvents: 'none',
  background: {
    base: `linear-gradient(0deg, ${colors.background} 2.21%, rgba(255, 255, 255, 0.68) 15.29%, rgba(255, 255, 255, 0.00) 25.38%)`,
    lg: `linear-gradient(0deg, ${colors.background} 2.21%, rgba(255, 255, 255, 0.68) 10.29%, rgba(255, 255, 255, 0.00) 25.38%)`,
  },
};

const style = defineStyle((props: any) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: props.isMirrored ? 'flex-end' : 'flex-start',
      '.villaCarouselContainer': {
        position: 'relative',
        width: {
          base: '100vw',
          md: '100vw',
          lg: '833px',
          xl: '1073px',
          '2xl': '1153px',
          '3xl': '1233px',
          '4xl': '1313px',
        },
        height: {
          base: '394px',
          md: '480px',
          lg: '597px',
          xl: '769px',
          '2xl': '826px',
          '3xl': '884px',
          '4xl': '941px',
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
            _before: bottomShadowStyling,
          },
          _rtl: {
            _before: bottomShadowStyling,
          },
        },
        '.swiper-pagination-horizontal': {
          bottom: '0px',
          paddingInline: '50px',
          marginTop: '-41px',
          justifyContent: {
            base: 'center',
            lg: props.isMirrored ? 'flex-start' : 'flex-end',
          },
        },
      },
      '.villaShortDetailsBigContainer': {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        maxW: {
          base: '100%',
          lg: 'min-content',
        },
        zIndex: '2',
        pt: {
          base: '24px',
          lg: '32px',
        },
        _ltr: {
          ...(props.isMirrored
            ? rightSideVillaShortDetailsBigContainer
            : leftSideVillaShortDetailsBigContainer),
        },
        _rtl: {
          ...(props.isMirrored
            ? leftSideVillaShortDetailsBigContainer
            : rightSideVillaShortDetailsBigContainer),
        },
      },
    },
  };
});

export default style;
