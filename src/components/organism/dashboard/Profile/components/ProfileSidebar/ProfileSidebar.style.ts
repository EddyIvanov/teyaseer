import { defineStyle } from '@chakra-ui/react';

import borders from '@/styles/themes/brand/borders';
import boxShadows from '@/styles/themes/brand/boxShadows';

const style = defineStyle({
  root: {
    maxWidth: { base: '100%', xl: '340px' },
    flexDirection: 'column',
    gap: 'var(--chakra-space-8)',
  },
  infoContainer: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    gap: '1px',
    padding: '0',
    border: '0',
    borderRadius: borders.normal,
    boxShadow: boxShadows.panelBox,
  },
});

export default style;
