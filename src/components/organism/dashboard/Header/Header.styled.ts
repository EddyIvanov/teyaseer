import { defineStyle } from '@chakra-ui/react';

const theme = defineStyle({
  root: {
    zIndex: 2,
    position: 'relative',
    w: '100%',
    height: {
      base: 'headerMobileSize',
      lg: 'headerDesktopSize',
    },
    minH: {
      base: 'headerMobileSize',
      lg: 'headerDesktopSize',
    },
    borderBottom: '1px solid rgba(0, 23, 49, 0.32)',
    py: '32px',
    px: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    article: {
      bg: 'red',
    },
  },
  logo: {
    w: { base: '114px', lg: 'auto' },
  },
  signOut: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
});
export default theme;
