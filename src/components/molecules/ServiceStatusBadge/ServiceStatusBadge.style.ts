import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  serviceStatusBadge: {
    padding: '8px 16px',
    bg: colors.backgroundMerino,
    borderRadius: '100px',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    gap: '10px',
    p: {
      fontWeight: 600,
    },
  },
  deactivated: {
    bg: 'rgba(225, 27, 34, .1)',
  },
  completed: {
    bg: 'rgba(0, 172, 117, 0.16)',
    svg: {
      path: {
        fill: 'success',
      },
    },
  },
});

export default style;
