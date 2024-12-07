import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import sizes from '@/styles/themes/brand/sizes';

const styles = defineStyle({
  header: {
    position: 'fixed',
    borderBottom: `1px solid ${colors.border}`,
    px: { base: '12px', md: '80px' },
    h: { base: sizes.headerMobileSize, lg: sizes.headerDesktopSize },
    zIndex: 6,
    backgroundColor: colors.text.light,
    width: '100%',
  },
  logo: {
    display: 'inline-flex',
    w: { base: '114px', lg: '130px' },
    h: '34px',
    position: 'relative',
    '> img': {
      height: 'auto',
    },
  },
});

export default styles;
