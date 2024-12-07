import { defineStyleConfig } from '@chakra-ui/react';

import FontSizes from '../brand/fontSizes';
import FontWeights from '../brand/fontWeights';

export const CardOverrides = defineStyleConfig({
  baseStyle: {
    container: {
      borderWidth: '1px',
      borderRadius: '2xl',
      overflow: 'hidden',
      borderColor: 'border',
      p: '6',
      gap: '10px',
    },
    headerTitle: {
      fontSize: FontSizes.xMedium,
      fontWeight: FontWeights.normal,
    },
    headerSubtitle: {
      fontSize: FontSizes.normal,
      fontWeight: FontWeights.normal,
      mt: '15px',
    },
    guideTitle: {
      _ltr: {
        pr: { base: '70px', xl: '0' },
      },
      _rtl: {
        pl: { base: '70px', xl: '0' },
      },
    },
    bodyMainTitle: {
      mb: '30px',
      fontSize: FontSizes.normal,
      fontWeight: FontWeights.bold,
    },
    bodyKey: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
    },
    bodyValue: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.normal,
    },
  },
  defaultProps: {},
});
