import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import letterSpacings from '@/styles/themes/brand/letterSpacings';

const theme = defineStyle((props: any) => ({
  root: {
    '.villaTitle': {
      display: 'flex',
      alignItems: 'center',
      height: {
        base: 'auto',
        lg: '56px',
        '2xl': '62px',
        '3xl': '69px',
        '4xl': '71px',
      },
      gap: '24px',
      fontWeight: FontWeights.medium,
      fontSize: `clamp(${FontSizes.xxLarge}, 3vw, 5.6rem)`,
    },
    '.learnMoreLink': {
      display: 'flex',
      fontSize: `clamp(${FontSizes.xSmall}, 1vw, ${FontSizes.small})`,
      gap: '8px',
      textDecoration: 'underline',
      _rtl: {
        svg: {
          transform: 'scaleX(-1)',
        },
      },
    },
    '.villaSpecs': {
      position: 'relative',
      mt: {
        base: '32px',
        lg: '24px',
      },
      _ltr: {
        _before: {
          position: 'absolute',
          bottom: {
            base: '-22px',
            lg: '-22px',
            '2xl': '-20px',
            '3xl': '-18px',
            '4xl': '-24px',
          },
          [props.isMirrored ? 'right' : 'left']: '-1px',
          height: '2px',
          width: {
            base: '100%',
            lg: '100vw',
          },
          content: '""',
          borderBottom: `2px solid ${colors.secondaryHover}`,
        },
      },
      _rtl: {
        _before: {
          position: 'absolute',
          bottom: {
            base: '-32px',
            lg: '-22px',
            '2xl': '-20px',
            '3xl': '-18px',
            '4xl': '-24px',
          },
          [props.isMirrored ? 'left' : 'right']: '-1px',
          height: '2px',
          width: {
            base: '100%',
            lg: '100vw',
          },
          content: '""',
          borderBottom: `2px solid ${colors.secondaryHover}`,
        },
      },
      '.villaSpecsInner': {
        overflowX: 'auto',
        paddingBottom: {
          base: '10px',
          lg: 'unset',
        },
      },
      '.villaSpec': {
        alignItems: 'center',
        px: {
          base: '15px',
          md: '24px',
          lg: '8px',
          xl: '16px',
          '2xl': '24px',
          '3xl': '24px',
          '4xl': '32px',
        },
        gap: {
          base: '8px',
          xl: '12px',
        },
        whiteSpace: 'nowrap',
        _ltr: {
          borderRight: {
            base: '1px solid #000',
            lg: '1px solid #A8A8A8',
          },
          _first: {
            pl: '0px',
          },
          _last: {
            pr: '0px',
            borderRight: 'none',
          },
        },
        _rtl: {
          borderLeft: {
            base: '1px solid #000',
            lg: '1px solid #A8A8A8',
          },
          _first: {
            pr: '0px',
          },
          _last: {
            pl: '0px',
            borderLeft: 'none',
          },
        },
        p: {
          fontSize: {
            base: FontSizes.xSmall,
            md: FontSizes.medium,
            lg: `clamp(${FontSizes.xSmall}, 1vw, ${FontSizes.medium})`,
          },
        },
      },
    },
    '.villaDescription': {
      mt: {
        base: '54px',
        lg: '80px',
      },
      p: {
        mt: '0px',
      },
    },
    '.downloadIcon': {
      _rtl: {
        transform: 'rotate(180deg)',
        pl: '8px',
      },
    },
  },
  floorPlanLink: {
    display: 'flex',
    alignItems: 'center',
    color: colors.text.dark,
    fontWeight: FontWeights.semibold,
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
    mt: '48px',
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
}));

export default theme;
