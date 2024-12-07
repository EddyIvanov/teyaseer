import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const styles = defineStyle({
  section: {
    top: { base: '62px', xl: '100px' },
    minH: '100vh',
    h: '100%',
  },
  headerBlock: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: {
      base: '22px',
      xl: '48px',
    },
    mt: { base: '40px', xl: '80px' },
  },
  backNavContainer: {
    gap: '8px',
    mb: {
      base: '10px',
      md: 'unset',
    },
  },
  headerTitle: {
    fontSize: `clamp(${FontSizes.small}, 2.9vw, ${FontSizes.fiveXLarge})`,
    fontWeight: FontWeights.medium,
  },
});

export default styles;
