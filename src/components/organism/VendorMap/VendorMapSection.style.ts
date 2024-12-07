import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  root: {
    width: '100%',
    '.mapTitle': {
      zIndex: 0,
      pb: { base: '40px', lg: '0' },
      bottom: 'clamp(48px, 5vw, 94px)',
      width: '100%',
      pointerEvents: 'none',
      display: {
        base: 'flex',
        lg: 'unset',
      },
      flexDir: 'column',
      rowGap: '40px',
      alignItems: 'center',
      '.title': {
        textAlign: {
          base: 'center',
          lg: 'unset',
        },
      },
    },
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    py: '20px',
    width: 'auto',
    pointerEvents: 'none',
  },
});

export default style;
