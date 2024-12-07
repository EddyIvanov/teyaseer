import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';
import space from '@/styles/themes/brand/space';

const baseStyle = defineStyle({
  '.title': {
    fontSize: FontSizes.eightXLarge,
    lineHeight: FontSizes.eightXLarge,
    fontWeight: FontWeights.bold,
    color: 'rgba(194, 155, 64, 0.4)',
  },
  '.subTitle': {
    fontSize: FontSizes.sixHalfXLarge,
    fontWeight: FontWeights.light,
    color: colors.brand.primary,
  },
  '.errorDescription': {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semibold,
    color: colors.brand.primary,
    marginBottom: space.xxxLarge,
    mt: '20px',
  },
});

export default baseStyle;
