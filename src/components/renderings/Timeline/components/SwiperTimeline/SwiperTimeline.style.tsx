import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import sizes from '@/styles/themes/brand/sizes';
import { setFontSize } from '@/styles/utils/setFontSize';

const style = defineStyle({
  root: {
    w: '100%',
    h: '100%',
    position: 'relative',
    '.backgroundImage': {
      height: {
        base: 'auto !important',
        lg: '100% !important',
      },
      objectFit: {
        base: 'contain',
        lg: 'cover',
      },
      zIndex: -1,
      objectPosition: { base: 'top', lg: 'unset' },
      minW: '480px',
      _rtl: {
        transform: 'scaleX(-1)',
      },
    },
  },
  main_box: {
    gap: { base: 0, lg: '16px' },
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    display: { base: 'none', lg: 'flex' },
    _ltr: {
      pr: '110px',
    },
    _rtl: {
      pl: '110px',
    },
  },
  mainSubtitle: {
    fontSize: { base: FontSizes.normal, lg: FontSizes.xxLarge },
    color: { base: 'black', lg: '#fff' },
    p: { base: '16px 16px 0', lg: '0' },
  },
  mainTitle: {
    maxW: { base: '100%', lg: '834px' },
    fontSize: setFontSize(FontSizes.large, FontSizes.sevenXLarge),
    color: { base: 'black', lg: '#fff' },
    _rtl: {
      textAlign: 'right',
      p: { base: '16px 16px 0', lg: '0 0 0 15%', xl: '0 0 0 66px' },
    },
    _ltr: {
      textAlign: 'left',
      p: { base: '16px 16px 0', lg: '0 15% 0 0', xl: '0 66px 0 0' },
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
        lg: FontSizes.large,
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
  pulse: {
    position: 'absolute',
    top: '-25px',
    transform: 'scale(0.2)',
    width: '70px',
    height: '70px',
    background: '#001731',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    _ltr: {
      left: { base: '-8px', lg: '24px' },
    },
    _rtl: {
      right: { base: '-8px', lg: '24px' },
    },
    transition: 'all 0.7s ease-in-out',
    svg: {
      opacity: 0,
    },
    '.sideBoxItem[data-active="true"] &': {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      transform: { base: 'scale(0.7)', lg: 'scale(1)' },
      top: '0px',
      _ltr: {
        left: { base: '-8px', lg: '25px' },
      },
      _rtl: {
        right: { base: '-8px', lg: '25px' },
      },
      svg: {
        opacity: 1,
      },
    },
  },
  swiper: {
    position: 'absolute !important ',
    height: '100vh',
    width: '100%',
    '.swiper-wrapper': {
      width: '100%',
      height: '100%',
    },

    '.swiper-slide': {
      textAlign: 'center',
      fontSize: FontSizes.medium,
      background: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      _before: {
        content: "''",
        position: 'absolute',
        height: '100%',
        top: 0,
        width: '50%',
      },
      _ltr: {
        _before: {
          left: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.5886948529411764) 0%, rgba(0,212,255,0) 73%)',
        },
      },
      _rtl: {
        _before: {
          right: 0,
          background:
            'linear-gradient(270deg, rgba(0,0,0,0.5886948529411764) 0%, rgba(0,212,255,0) 73%)',
        },
      },
    },
  },
  side_box: {
    overflow: 'auto',
    position: 'static',
    bottom: { base: 0, lg: '0' },
    bg: 'white',
    flex: '40%',
    height: {
      base: `100%`,
      lg: `calc(100vh)`,
    },
    zIndex: 1,
    minWidth: { base: '100%', lg: 'mainArticlePanelWidth' },
    maxWidth: { base: '100%', lg: 'mainArticlePanelWidth' },
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    _ltr: {
      right: 0,
    },
    _rtl: {
      left: 0,
    },
  },
  sideBoxWrapper: {
    display: 'flex',
    flex: 1,
    minHeight: {
      base: 'unset',
      lg: `calc(100vh - ${sizes.headerDesktopSize})`,
    },
    overflow: 'hidden',
    gap: { base: '0px', lg: '32px' },
    flexDirection: 'column',
    position: 'relative',
    height: 'auto',
    pt: { base: '0', lg: '48px' },
    pb: { base: '24px', lg: '120px' },
  },
  sideBoxLine: {
    content: "''",
    position: 'absolute',
    height: { base: '100vh', lg: '120vh' },
    width: '1px',
    bg: 'rgba(98, 98, 98, 0.32)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    top: 0,
    bottom: 0,
    _ltr: {
      left: { base: '37px', lg: '59px' },
    },
    _rtl: {
      right: { base: '37px', lg: '59px' },
    },
  },
  sideBoxItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    _ltr: {
      pl: { base: '28px', lg: '60px' },
      pr: '15px',
    },
    _rtl: {
      pr: { base: '28px', lg: '60px' },
      pl: '15px',
    },
    gap: '32px',
    maxW: '731px',
    position: 'relative',
    '&[data-active="true"]': {
      flex: 1,
      alignItems: 'flex-start',
      pb: { base: '32px', lg: 'unset' },
    },
  },
  sidebarContainer: {
    display: 'flex',
    justifyContent: { lg: 'flex-end' },
    flexDirection: { base: 'column', lg: 'row' },
    padding: 0,
    flex: 1,
    gap: '25px',
  },
  sidebarContentHtml: {
    px: { base: '10px', lg: '0' },
  },
  contentWrapper: {
    flexDirection: 'column',
    minHeight: '32px',
    justifyContent: 'center',
    _rtl: {
      paddingLeft: { base: '16px', lg: '0' },
      paddingRight: { base: '48px', lg: '80px' },
    },
    _ltr: {
      paddingRight: { base: '16px', lg: '0' },
      paddingLeft: { base: '48px', lg: '80px' },
    },
    '.timelineStepDescription': {
      p: {
        mt: 0,
        fontSize: setFontSize(FontSizes.small, FontSizes.large),
      },
      button: {
        mt: '20px',
      },
    },
  },
  stepSubtitle: {
    display: 'none',
    fontSize: { base: FontSizes.small, lg: FontSizes.medium },
    fontWeight: FontWeights.light,
    '.sideBoxItem[data-active="true"] &': {
      display: 'block',
    },
  },
  stepTitle: {
    opacity: 0.6,
    fontSize: setFontSize(FontSizes.normal, FontSizes.xLarge),
    fontWeight: FontWeights.semibold,
    minHeight: '32px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
  },
  contentBody: {
    pt: '16px',
    transition: 'all 2s cubic-bezier(0, 1, 0, 1)',
    h: 'fit-content',
    maxH: '0px',
    fontSize: {
      base: FontSizes.small,
      md: FontSizes.normal,
      lg: FontSizes.small,
      xl: FontSizes.medium,
      '2xl': FontSizes.medium,
      '3xl': FontSizes.xMedium,
      '4xl': FontSizes.xMedium,
    },
    overflow: 'hidden',
    '.sideBoxItem[data-active="true"] &': {
      transition: 'all 2s ease-in-out',
      maxH: '1000px',
    },
    button: {
      mt: '25px',
    },
  },
});

export default style;
