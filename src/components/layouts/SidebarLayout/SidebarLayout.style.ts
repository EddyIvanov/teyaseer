import { defineStyle } from '@chakra-ui/react';

import breakpoints from '@/styles/themes/brand/breakpoints';

const theme = defineStyle({
  root: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    height: '100vh',
    display: 'flex',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  mainBox: {
    py: '40px',
    px: { sm: '10px', md: '24px' },
    pb: '100px',
    w: '100%',
    h: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
  },
  backToService: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'normal',
    px: '12px',
    gap: '10px',
    display: 'flex',
    flexDirection: 'row',
    h: '60px',
    w: '100%',
  },
  container: {
    margin: 0,
    maxWidth: breakpoints['4xl'],
    flex: '1',
  },
});

export default theme;
