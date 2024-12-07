import { defineStyleConfig } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import letterSpacings from '@/styles/themes/brand/letterSpacings';

const defaultFontSize = {
  base: FontSizes.small,
  md: FontSizes.normal,
  lg: FontSizes.small,
  xl: FontSizes.medium,
  '2xl': FontSizes.medium,
  '3xl': FontSizes.xMedium,
  '4xl': FontSizes.xMedium,
};

const listCss = {
  m: '10px 0 clamp(2.4rem, 2.7vw, 4.8rem)',
  _ltr: {
    pl: {
      base: '16px',
      md: '20px',
    },
  },
  _rtl: {
    pr: {
      base: '16px',
      md: '20px',
    },
  },
  li: {
    _notLast: {
      mb: {
        base: '16px',
      },
    },
    p: {
      mt: '0',
      fontSize: {
        ...defaultFontSize,
      },
    },
  },
};

const theme = defineStyleConfig({
  baseStyle: {},
  variants: {
    dynamicContent: {
      display: 'flex',
      flexDirection: 'column',
      p: {
        whiteSpace: 'pre-wrap',
        fontSize: {
          ...defaultFontSize,
        },
        color: 'black',
        mt: {
          base: '32px',
          lg: '42px',
        },
        lineHeight: 1.7,
        FontWeights: FontWeights.light,
      },
      h1: {
        whiteSpace: 'pre-wrap',
        color: 'black',
        fontSize: {
          base: FontSizes.fourXLarge,
          lg: FontSizes.fiveXLarge,
        },
        _ltr: {
          fontWeight: 500,
        },
        _rtl: {
          fontWeight: 400,
        },
      },
      h2: {
        whiteSpace: 'pre-wrap',
        fontSize: 'clamp(1.8rem, 2.3vw + .4rem, 4rem)',
        mb: 'clamp(1.6rem, 1.85vw, 3.2rem)',
        mt: { base: '32px', lg: 0 },
      },
      h6: {
        whiteSpace: 'pre-wrap',
        fontSize: `clamp(${FontSizes.small}, 1.1vw, ${FontSizes.medium})`,
        color: colors.text.gray,
        mb: 'clamp(1.6rem, 1.85vw, 3.2rem)',
      },
      a: {
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        fontWeight: 600,
        letterSpacing: {
          base: letterSpacings.wider,
          lg: letterSpacings.medium,
        },
        fontSize: {
          base: FontSizes.small,
          md: FontSizes.normal,
          lg: FontSizes.xSmall,
          xl: FontSizes.normal,
          '2xl': FontSizes.normal,
          '3xl': FontSizes.normal,
          '4xl': FontSizes.normal,
        },
        textDecoration: 'underline',
        mt: '25px',
        mb: '10px',
        svg: {
          _ltr: {
            ml: '10px',
          },
          _rtl: {
            mr: '10px',
            transform: 'rotate(180deg)',
          },
        },
      },
      button: {
        alignSelf: 'flex-start',
        mt: '48px',
        w: { base: '100%', sm: 'unset' },
      },
      ul: {
        ...listCss,
      },
      ol: {
        ...listCss,
      },
    },
    accordion: {
      p: {
        marginTop: '0px',
        marginBottom: '20px',
        fontSize: FontSizes.normal,
        fontWeight: FontWeights.normal,
      },
      a: {
        fontSize: FontSizes.normal,
        fontWeight: FontWeights.normal,
      },
      ul: {
        ...listCss,
        li: {
          fontSize: FontSizes.normal,
        },
      },
      ol: {
        ...listCss,
        li: {
          fontSize: FontSizes.normal,
        },
      },
    },
    unstyled: {},
  },
  defaultProps: {
    variant: 'dynamicContent',
  },
});

export default theme;
