import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';

const theme = defineStyle({
  root: {
    minHeight: '100vh',
    height: 'auto',
    '> div': {
      minHeight: '100vh',
      height: 'auto',
    },
    '.contentHtml': {
      maxHeight: 'auto',
      overflowY: 'hidden',
    },
    '.accordionTimelineDescription': {
      fontSize: {
        base: FontSizes.small,
        md: FontSizes.normal,
        lg: FontSizes.small,
        xl: FontSizes.medium,
        '2xl': FontSizes.medium,
        '3xl': FontSizes.xMedium,
        '4xl': FontSizes.xMedium,
      },
    },
  },
  accordion: {
    '.chakra-accordion__button': {
      position: 'relative',
      '&[aria-expanded="true"]': {
        '.accordion-title': {
          fontWeight: '600',
          _rtl: {
            fontWeight: '700',
          },
        },
      },
    },
    '.chakra-accordion__item': {
      position: 'relative',
      _before: {
        content: "''",
        position: 'absolute',
        top: '40px',
        height: '100%',
        width: '1px',
        bg: 'rgba(98, 98, 98, 0.32)',
      },
      _ltr: {
        pl: { base: '50px', lg: 'unset' },
        _before: {
          left: '24px',
        },
      },
      _rtl: {
        pr: { base: '50px', lg: 'unset' },
        _before: {
          right: '24px',
        },
      },
    },
    '.chakra-accordion .chakra-accordion__item': {
      padding: { base: '5px', lg: '0 !important' },
      margin: '0',
      marginBottom: { lg: '20px' },
      _last: {
        marginBottom: { lg: '0' },
      },
    },

    '.chakra-accordion__panel': {
      minHeight: 'auto',
      p: '5px 10px',
      pb: 0,
    },
  },
  accordionItemSelected: {
    pb: '24px',
  },
  icon: {
    position: 'absolute',
    zIndex: 4,
    width: { base: '50px', lg: '70px' },
    height: { base: '50px', lg: '70px' },
    background: 'transparent',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    _ltr: {
      right: '100%',
      mr: { lg: '7px' },
    },
    _rtl: {
      left: '100%',
      ml: { lg: '7px' },
    },

    ".chakra-accordion__button[aria-expanded='true'] &": {
      backgroundColor: 'secondaryHover',
      transition: 'background-color 0.5s ease-in-out',
      path: {
        fill: '#fff',
      },
    },
  },
  pulse: {
    position: 'absolute',
    top: '10px',
    transform: 'scale(0.2)',
    width: '50px',
    height: '50px',
    background: '#001731',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    _ltr: {
      right: '100%',
    },
    _rtl: {
      left: '100%',
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
  stepTitle: {
    fontSize: 'normal',
    fontWeight: 'semibold',
  },
  stepSubtitle: {
    fontSize: 'small',
    fontWeight: 'light',
  },
});

export default theme;
