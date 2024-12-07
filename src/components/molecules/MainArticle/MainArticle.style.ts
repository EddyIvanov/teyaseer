import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import sizes from '@/styles/themes/brand/sizes';

const getDescriptionAlignments = (position: string): string => {
  switch (position) {
    case 'Bottom':
      return 'flex-end';
    case 'Center':
      return 'center';
    default:
      return 'flex-start';
  }
};

const contentWrapperLtr = {
  _before: {
    right: { base: 0, lg: '100%' },
    mr: { base: 0, lg: '-1px' },
    mb: { base: '-1px', lg: 0 },
    background: {
      base: `linear-gradient(0deg, ${colors.background} 12.18%, rgba(255, 255, 255, 0.68) 36.14%, rgba(255, 255, 255, 0.00) 80.11%)`,
      lg: `linear-gradient(270deg, ${colors.background} 12.18%, rgba(255, 255, 255, 0.68) 44.14%, rgba(255, 255, 255, 0.00) 93.11%)`,
    },
  },
  _after: {
    ml: '-1px',
    left: '100%',
  },
};

const contentWrapperRtl = {
  _before: {
    left: { base: '0', lg: '100%' },
    ml: { base: 0, lg: '-1px' },
    mb: { base: '-1px', lg: 0 },
    background: {
      base: `linear-gradient(0deg, ${colors.background} 12.18%, rgba(255, 255, 255, 0.68) 36.14%, rgba(255, 255, 255, 0.00) 80.11%)`,
      lg: `linear-gradient(90deg, ${colors.background} 12.18%, rgba(255, 255, 255, 0.68) 44.14%, rgba(255, 255, 255, 0.00) 93.11%)`,
    },
  },
  _after: {
    mr: '-1px',
    right: '100%',
  },
};

export const MainArticleStyle = defineStyleConfig({
  baseStyle: defineStyle(props => ({
    root: {
      '.imageWrapper': {
        position: {
          base: 'relative',
          lg: 'absolute',
        },
        height: {
          base: '64.64vw',
          lg: '100%',
        },
        maxHeight: {
          base: '45%',
          lg: 'none',
        },
      },
      'img.backgroundImage': {
        height: {
          base: 'auto !important',
          lg: '100% !important',
        },
        objectFit: {
          base: 'contain',
          lg: 'cover',
        },
        _rtl: {
          transform: 'scaleX(-1)',
        },
        _ltr: {
          transform: 'scaleX(1)',
        },
      },
      '.contentContainer': {
        _before: {
          content: { base: '""', lg: 'none' },
          right: { base: 0, lg: '100%' },
          mr: { base: 0, lg: '-1px' },
          mb: { base: '-1px', lg: 0 },
          background: {
            base: `linear-gradient(0deg, ${colors.background} 12.18%, rgba(255, 255, 255, 0.68) 36.14%, rgba(255, 255, 255, 0.00) 80.11%)`,
            lg: `linear-gradient(270deg, ${colors.background} 12.18%, rgba(255, 255, 255, 0.68) 44.14%, rgba(255, 255, 255, 0.00) 93.11%)`,
          },
          position: 'absolute',
          zIndex: 1,
          width: { base: '100%', lg: '34%' },
          height: { base: '100px', md: '150px', lg: '100%' },
          top: { base: 'inherit', lg: 0 },
          bottom: { base: '100%', lg: 'inherit' },
        },
        flex: 1,
        height: {
          base: 'calc(100% - 64.64vw)',
        },
      },
    },
    wrapper: {
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    innerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      h: '100%',
      overflow: { base: 'auto', lg: 'initial' },
      flexDirection: { base: 'column', lg: 'row' },
      m: { base: '0 -16px', lg: '0' },
    },
    contentWrapper: {
      display: 'flex',
      flex: { base: 1, lg: 1 },
      position: 'relative',
      alignItems: {
        base: 'flex-start',
        lg: getDescriptionAlignments(props.descriptionPosition),
      },
      minWidth: {
        base: '100%',
        lg: props.panelWidth || 'mainArticlePanelWidth',
      },
      maxWidth: {
        base: '100%',
        lg: props.panelWidth || 'mainArticlePanelWidth',
      },
      height: '100%',
      maxHeight: { lg: '100%' },
      backgroundColor: colors.background,
      zIndex: 3,
      _before: {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: { base: '100%', lg: '34%' },
        height: { base: '200px', lg: '100%' },
        top: { base: 'inherit', lg: 0 },
        bottom: { base: '100%', lg: 'inherit' },
      },
      _after: {
        content: { base: 'none', lg: '""' },
        position: 'absolute',
        height: '100%',
        top: 0,
        zIndex: 1,
        backgroundColor: colors.background,
        width: '50vw',
      },
    },
    contentHtml: {
      width: '100%',
      justifyContent: 'space-between',
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      gap: '20px',
      overflowX: 'hidden',
      overflowY: { base: 'hidden', lg: 'auto' },
      maxHeight: '100%',
      _ltr: {
        padding: { base: '0px 16px 48px', lg: '80px 16px 90px 24px' },
      },
      _rtl: {
        padding: { base: '0px 16px 48px', lg: '80px 24px 90px 16px' },
      },
    },
    contentInnerContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      wordBreak: 'break-word',
    },
    iconContainer: {
      display: {
        base: 'none',
        lg: 'flex',
      },
      alignItems: 'end',
      justifyContent: 'space-around',
      mb: '8px',
    },
    smallLogo: {
      position: 'absolute',
      _ltr: {
        left: '40px',
      },
      _rtl: {
        right: '40px',
      },
      bottom: '80px',
      display: { base: 'none', lg: 'block' },
    },
    mainTitle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:
        props.titlePosition === 'Center'
          ? { base: 'flex-start', lg: 'center' }
          : { base: 'flex-start', lg: 'flex-end' },
      zIndex: 4,
      flex: { base: 'none', md: 'auto' },
      position: 'relative',
      transition: `${sizes.transitionDuration} ease-in-out`,
      transitionProperty: 'transform, opacity',
      _rtl: {
        p: { base: '16px 0 0', lg: '0 0 0 48px' },
        transform: `translate3d(${sizes.animationsDefaultDistance}, 0, 0)`,
        opacity: 0,
        "&[data-animation='slideIn']": {
          transform: 'translate3d(0, 0, 0)',
          opacity: 1,
        },
      },
      _ltr: {
        p: { base: '16px 0 0', lg: '0 48px 0 0' },
        transform: `translate3d(-${sizes.animationsDefaultDistance}, 0, 0)`,
        opacity: 0,
        "&[data-animation='slideIn']": {
          transform: 'translate3d(0, 0, 0)',
          opacity: 1,
        },
      },
      h1: {
        whiteSpace: 'pre-wrap',
        color: { base: colors.text.dark, lg: colors.text.light },
        my: {
          base: '0',
          lg: '46px',
          xl: '57px',
          '2xl': '62px',
          '3xl': '74px',
          '4xl': '88px',
        },
        fontSize: {
          base: FontSizes.fourXLarge,
          lg: FontSizes.fiveXLarge,
          xl: FontSizes.sixHalfXLarge,
          '2xl': FontSizes.sevenXLarge,
        },
        lineHeight: 1.3,
        _rtl: {
          fontWeight: 400,
          textAlign: 'right',
        },
        _ltr: {
          fontWeight: 300,
          textAlign: 'left',
        },
      },
    },
  })),
  sizes: {
    fullScreen: {
      root: {
        height: { base: 'auto', lg: '100vh' },
        minH: '100vh',
      },
      wrapper: {
        height: { base: 'auto', lg: '100vh' },
      },
      contentWrapper: {
        height: {
          base: 'unset',
          lg: `calc(100vh - ${sizes.headerDesktopSize})`,
        },
        mt: {
          base: 'unset',
          lg: sizes.headerDesktopSize,
        },
      },
    },
    fixedHeight: {
      root: {
        height: 'auto',
      },
      wrapper: {
        height: '780px',
        m: { base: '48px 0', lg: '130px 0' },
      },
    },
  },
  variants: {
    normalImage: {
      contentWrapper: {
        _ltr: {
          ...contentWrapperLtr,
        },
        _rtl: {
          ...contentWrapperRtl,
        },
      },
    },
    swapImage: {
      innerContainer: {
        flexDirection: { base: 'column', lg: 'row-reverse' },
      },
      contentWrapper: {
        _ltr: {
          ...contentWrapperRtl,
        },
        _rtl: {
          ...contentWrapperLtr,
        },
      },
    },
  },
  defaultProps: {
    size: 'fullScreen',
    variant: 'normalImage',
  },
});
