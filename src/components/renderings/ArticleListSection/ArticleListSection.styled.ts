import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const theme = defineStyle(() => ({
  root: {
    m: { base: '48px 0', xl: '128px 0' },
    position: 'relative',

    '.section-title': {
      color: colors.text.dark,
      fontWeight: { base: 400, xl: 500 },
      p: {
        base: '0 24px',
        xl: '0',
      },
      fontSize: {
        base: '4rem',
        xl: 'clamp(4rem, 8vw , 5rem)',
      },
    },
    '.section-image-container': {
      position: 'relative',
      h: { base: '300px', xl: '588px' },
      m: { base: '24px 0', xl: '60px 0' },
    },
    '.section-image': {
      maxH: { base: '300px', xl: '588px' },
      w: { xl: '100%' },
      zIndex: -1,
      objectFit: 'cover',
    },
    '.section-link-list': {
      m: {
        base: '24px',
        xl: '0',
      },
      display: { base: 'grid' },
      gridTemplateColumns: {
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        xl: 'repeat(4, 1fr)',
      },
      rowGap: '32px',
      columnGap: '48px',
    },
  },
}));

export default theme;
