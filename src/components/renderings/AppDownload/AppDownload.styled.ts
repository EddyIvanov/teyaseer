import { defineStyle } from '@chakra-ui/react';

const baseStyle = defineStyle({
  root: {
    '.backgroundImage': {
      zIndex: -2,
      objectFit: 'cover',
      objectPosition: {
        base: '65%',
        md: 'center',
      },
    },
    '.container': {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      height: '100%',
      padding: 0,
      paddingTop: {
        base: '80px',
        lg: '120px',
      },
      paddingBottom: {
        base: '30px',
        sm: '40px',
        md: '80px',
      },
      gap: {
        base: '26px',
        md: '40px',
        xl: '50px',
        '2xl': '60px',
        '4xl': '80px',
      },
      _rtl: {
        flexDir: 'row-reverse',
      },
    },
    '.title': {
      h2: {
        color: 'white',
        fontSize: 'clamp(4rem, 4vw, 8rem)',
        fontWeight: 300,
        whiteSpace: 'pre-wrap',
        textAlign: 'start',
      },
    },
    '.subtitle': {
      p: {
        color: 'white',
        fontSize: 'clamp(2rem, 2.4vw, 4rem)',
        maxW: '400px',
        fontWeight: 300,
      },
    },
  },
  centerTitlesWrapper: {
    display: 'flex',
    flexDir: 'column',
    gap: '30px',
  },
  mobileImageWrapper: {
    position: 'relative',
    maxHeight: '778px',
    height: '100%',
    marginLeft: {
      base: '-200px',
      md: 0,
    },
    img: {
      minWidth: '197px',
      minHeight: '400px',
      height: '100%',
      width: 'auto',
      objectFit: 'contain',
    },
  },
});

export default baseStyle;
