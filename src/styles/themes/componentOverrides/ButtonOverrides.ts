import { defineStyleConfig } from '@chakra-ui/react';

import colors from '../brand/colors';
import FontSizes from '../brand/fontSizes';
import FontWeights from '../brand/fontWeights';

export const ButtonOverrides = defineStyleConfig({
  sizes: {
    sm: {
      py: '27px',
      px: '32px',
    },
    md: {
      py: '27px',
      px: '32px',
      fontSize: FontSizes.small,
    },
    lg: {
      py: '40px',
      px: '118px',
      fontSize: FontSizes.small,
    },
  },
  baseStyle: {
    borderRadius: '100px',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semibold,
    textTransform: 'uppercase',
    _hover: {
      backgroundColor: '#EEF1F4',
    },
    _rtl: {
      'svg:not(.no_flip)': {
        transform: 'scaleX(-1)',
      },
    },
    lineHeight: 1,
  },
  variants: {
    primary: {
      background: colors.primary,
      color: '#fff',
      _hover: {
        backgroundColor: colors.primaryHover,
      },
      _disabled: {
        backgroundColor: '#CAA95C',
        color: colors.text.dark,
        svg: {
          path: {
            stroke: colors.text.dark,
          },
        },
      },
      '&:hover[disabled]': {
        backgroundColor: '#CAA95C',
      },
      svg: {
        path: {
          stroke: 'white',
        },
      },
    },
    primaryInverted: {
      background: '#fff',
      color: colors.secondary,
      _hover: {
        backgroundColor: '#EEF1F4',
      },
      _disabled: {
        backgroundColor: '#EBEBEB',
        color: colors.text.dark,
      },
      '&:hover[disabled]': {
        backgroundColor: '#EBEBEB',
      },
    },
    secondary: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: colors.secondary,
      color: colors.secondary,
      path: {
        stroke: 'black',
      },
    },
    secondaryInverted: {
      borderWidth: '1px',
      borderStyle: '#fff',
      borderColor: '#fff',
      color: '#fff',
      _hover: {
        backgroundColor: 'transparentBackgroundButton',
      },
      _disabled: {
        color: '#fff',
        borderColor: '#fff',
      },
      '&:hover[disabled]': {
        backgroundColor: '#fff',
      },
      path: {
        stroke: '#fff', // only for arrow, needs refactoring of Icon component
      },
    },
    tertiary: {
      backgroundColor: colors.secondary,
      color: '#fff',
      _hover: {
        backgroundColor: colors.secondaryHover,
        color: colors.text.light,
      },
      _disabled: {
        opacity: 0.7,
      },
      '&:hover[disabled]': {
        backgroundColor: colors.secondary,
      },
    },
    link: {
      px: '12px',
      py: '8px',
      color: '#000',
      textDecoration: 'underline',
      path: {
        stroke: 'black',
      },
      _hover: {
        backgroundColor: 'transparent',
      },
    },
    linkInverted: {
      px: '12px',
      py: '8px',
      color: '#fff',
      textDecoration: 'underline',
      _hover: {
        backgroundColor: 'transparent',
      },
    },
    uaePassBlack: {
      background: colors.uaePassBlack,
      color: colors.uaePassWhite,
      _hover: {
        backgroundColor: colors.uaePassBlack,
      },
    },
    uaePassWhite: {
      background: colors.uaePassWhite,
      color: colors.uaePassBlack,
      _hover: {
        backgroundColor: colors.uaePassWhite,
      },
    },
    unstyled: {
      _hover: {
        backgroundColor: 'transparent',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
});
