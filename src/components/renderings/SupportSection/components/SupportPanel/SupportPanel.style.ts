import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const theme = defineStyle({
  root: {},
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
      _ltr: {
        pl: { base: '50px', lg: 'unset' },
      },
      _rtl: {
        pr: { base: '50px', lg: 'unset' },
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
  tabs: {
    width: '100%',
    mt: { lg: '-80px' },
    maxW: { base: '100%', lg: '480px' },
    alignSelf: { base: 'flex-end', lg: 'flex-end' },
    _ltr: {
      p: { base: '0 14px', lg: '0 20px 0 16px' },
    },
    _rtl: {
      p: { base: '0 14px', lg: '0 16px 0 20px' },
    },
    px: { lg: 'unset' },
  },
  tab: {
    fontSize: FontSizes.normal,
    padding: '30px 40px',
    borderRight: '1px solid #E5E5E5 !important',
    "&[aria-selected='true']": {
      fontWeight: 'bold',
    },
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

    svg: {
      path: {
        fill: 'secondaryHover',
      },
    },

    ".chakra-accordion__button[aria-expanded='true'] &": {
      backgroundColor: 'secondaryHover',
      transition: 'background-color 0.5s ease-in-out',
      path: {
        fill: '#fff',
      },
    },
  },
  searchWrapper: {
    gap: '12px',
    maxW: { sm: '400px', lg: '100%' },
    width: 'calc(100% - 2px)',
    height: '45px',
    mx: { lg: 'auto' },
    mt: '32px',
    border: `1px solid ${colors.border}`,
    borderRadius: '44px',
    padding: '12px',
    svg: {
      strokeWidth: '2px',
    },
    input: {
      border: 'none',
      ml: '-10px',
      fontSize: FontSizes.small,
    },
    '.serachIcon': {
      minW: 'unset',
    },
  },
});

export default theme;
