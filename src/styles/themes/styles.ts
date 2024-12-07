const styles = {
  global: {
    '*, *::before, &::after': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    html: {
      fontSize: '62.5%',
    },
    body: {
      fontSize: '1.6rem',
      m: 0,
      p: 0,
    },
    main: {
      position: 'relative',
      zIndex: 1,
    },
    strong: {
      fontWeight: 500,
    },
    '.scrollbar': {
      '&::-webkit-scrollbar': {
        boxSize: 'invalid',
        width: '16px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(199,199,199,0.0)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(136,136,136,0)',
        borderRadius: '9px',
      },
      _hover: {
        '&::-webkit-scrollbar': {},
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(199,199,199,0.8)',
          border: '4px solid white',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(135,135,135,1)',
          border: '4px solid white',
        },
      },
    },

    '@keyframes bounce-top': {
      '0%': { transform: 'translateY(0)' },
      '25%': { transform: 'translateY(3px)' },
      '50%': { transform: 'translateY(7px)' },
      '75%': { transform: 'translateY(3px)' },
      '100%': { transform: 'translateY(0)' },
    },
    '.mouse rect': {
      animationName: 'bounce-top',
      animationDuration: '1.5s',
      animationTimingFunction: 'linear',
      animationDelay: '0s',
      animationDirection: 'normal',
      animationFillMode: 'normal',
      animationIterationCount: 'infinite',
    },
  },
};

export default styles;
