import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: {
      base: '24px',
      md: '32px',
      lg: '48px',
    },
    alignItems: 'flex-end',
  },
  summaryDetailsContainer: {
    mt: { base: '10px', md: 4 },
    gap: 4,
  },
  summaryDetails: {
    fontSize: {
      base: FontSizes.xSmall,
      md: FontSizes.normal,
    },
    color: colors.text.light,
  },
  villaIcon: {
    width: {
      base: '12px',
      md: '24px',
    },
    height: {
      base: '12px',
      md: '24px',
    },
  },
  heading: {
    fontSize: {
      base: FontSizes.xLarge,
      md: FontSizes.xxLarge,
      lg: FontSizes.fiveXLarge,
    },
    fontWeight: FontWeights.medium,
    color: colors.text.light,
    whiteSpace: 'pre-wrap',
  },
});

export default style;
