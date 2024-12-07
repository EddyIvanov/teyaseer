import { defineStyle } from '@chakra-ui/react';

const theme = defineStyle({
  root: {
    maxHeight: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    pb: {
      base: '45px',
      md: '20px',
    },
    '.background-image': {
      zIndex: -1,
      objectFit: 'cover',
    },
    '.container': {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxH: {
        base: '500px',
        lg: '600px',
        '2xl': '710px',
      },
    },
    '.title h1, h2, h3, h4, h5, h6': {
      color: 'text.light',
      fontWeight: 400,
      whiteSpace: 'pre-wrap',
      pt: {
        base: '84px',
        xl: '124px',
      },
      fontSize: 'clamp(3.2rem, 5.56vw, 9.6rem)',
      textAlign: 'center',
    },
  },
});

export default theme;
