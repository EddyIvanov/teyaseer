import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const styles = defineStyle({
  vendorMoreInfoContainer: {
    position: 'relative',
    w: '100%',
    display: 'flex',
    flexDirection: {
      base: 'column',
      md: 'row',
    },
    borderTop: `1px solid ${colors.border}`,
    pt: {
      base: '32px',
      lg: '64px',
    },
    mt: {
      base: '32px',
      lg: '64px',
    },
    mb: {
      base: '40px',
      lg: '80px',
    },
    gap: {
      base: '24px',
      lg: '48px',
    },
  },
  vendorMoreInfo: {
    w: {
      base: '100%',
      md: '380px',
    },
    fontSize: `clamp(${FontSizes.normal}, 1.3vw, ${FontSizes.large})`,
  },
});

export default styles;
