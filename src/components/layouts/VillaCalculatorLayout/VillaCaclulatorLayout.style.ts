import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import sizes from '@/styles/themes/brand/sizes';

const styles = defineStyle({
  imageBg: {
    position: 'relative',
    display: { md: 'none' },
    minHeight: { base: '185px', md: 0 },
    backgroundColor: colors.imageBackgroundLight,
    img: {
      objectFit: 'cover',
    },
  },
  calculatorInnerContainer: {
    marginTop: { base: sizes.headerMobileSize, lg: sizes.headerDesktopSize },
  },
});

export default styles;
