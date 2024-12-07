import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  vdrContainer: {
    display: 'grid',
    columns: { sm: 1, xl: 2 },
    gridTemplateColumns: { base: '100%', xl: 'repeat(2, 49%)' },
    gridColumnGap: {
      xl: '30px',
    },
    gridRowGap: {
      base: '16px',
      lg: '32px',
      xl: 'unset',
    },
    pt: {
      base: '36px',
      md: '48px',
      lg: '80px',
      xl: '104px',
    },
  },
  vdrHeader: {
    gridColumn: { base: '1/span 1', xl: '1/span 2' },
    px: {
      base: '24px',
      md: 'unset',
    },
    pb: { base: '16px', lg: 'unset', xl: '48px' },
  },
  vdrHeaderContent: {
    flexDirection: {
      base: 'column',
      md: 'row',
    },
    gap: { base: '24px', md: 'unset' },
    justifyContent: { base: 'center', md: 'space-between' },
  },
  vdrHeaderTitle: {
    fontSize: {
      base: FontSizes.xMedium,
      lg: FontSizes.xxLarge,
    },
    fontWeight: FontWeights.medium,
    color: colors.text.dark,
    maxWidth: { base: '100%', lg: '320px' },
  },
  vdrHeaderSubtitle: {
    mt: { base: '24px', md: '32px', lg: '34px' },
    fontSize: {
      base: FontSizes.small,
      md: FontSizes.xMedium,
      lg: FontSizes.normal,
    },
    fontWeight: FontWeights.light,
    maxWidth: { base: '100%', md: '420px', lg: '465px' },
  },
  noVillasFoundText: {
    mt: { base: '24px', md: '32px', lg: '34px' },
    fontSize: {
      base: FontSizes.small,
      md: FontSizes.xMedium,
    },
    fontWeight: FontWeights.light,
  },
  vdrHeaderButton: {
    textTransform: 'uppercase',
    alignSelf: {
      md: 'start',
      lg: 'end',
    },
  },
  loaderContainer: {
    gridColumn: { xl: '1/span 2' },
  },
});

export default style;
