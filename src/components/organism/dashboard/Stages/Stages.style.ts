import { defineStyle } from '@chakra-ui/react';

import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  mainContianer: {
    width: '100%',
    gap: '32px',
    flexDirection: { base: 'column', lg: 'row' },
  },
  root: {
    width: '100%',
    borderTopRadius: '10px',
    p: 0,
    border: 'none',
    boxShadow: '0px 4px 44px 0px rgba(0, 0, 0, 0.07)',

    '.hero': {
      position: 'relative',
      height: '300px',
      width: '100%',
    },
    '.imageWrapper': {
      width: '100%',
      height: '100%',
      borderTopRadius: '10px',
      position: 'relative',
      img: {
        borderTopRadius: '10px',
        objectFit: 'cover',
      },
    },
    '.titleSection': {
      padding: {
        base: '15px 20px',
        md: '18px 40px',
      },
      width: '100%',
      position: 'absolute',
      bottom: 0,
      borderTopRadius: '20px',
      backdropFilter: 'blur(16px)',
      color: 'text.light',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      background:
        'linear-gradient(0deg, rgba(54, 54, 54, 0.23), rgba(54, 54, 54, 0.23)), linear-gradient(0deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.34))',
    },
    '.titleLeft': {
      columnGap: '11px',
      alignItems: 'center',
      '.icon': {
        border: `3px solid`,
        borderColor: 'text.light',
        borderRadius: '50%',
        padding: '6px',
      },
    },
    '.serialNo': {
      fontSize: { base: '4rem', md: '4.3rem', '3xl': '5.3rem' },
      color: 'text.light',
      ml: '6px',
    },
    '.title': {
      fontSize: { base: 'medium', md: '2.1rem', '3xl': 'large' },
      color: 'text.light',
      fontWeight: FontWeights.bold,
    },

    '.subtitle': {
      p: {
        base: '20px',
        md: '20px 40px',
      },
      fontSize: '1.5rem',
    },

    '.headerSection': {
      p: {
        base: '20px',
        md: '20px 40px',
      },
      alignItems: 'center',
      columnGap: '20px',
      flexWrap: 'wrap',
    },
    '.header': {
      fontSize: '2.1rem',
      fontWeight: '500',
    },
  },
});

export default style;
