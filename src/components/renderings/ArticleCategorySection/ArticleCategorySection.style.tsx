const baseStyle = () => ({
  icon: {
    position: 'absolute',
    zIndex: 4,
    width: { base: '50px', lg: '70px' },
    height: { base: '50px', lg: '70px' },
    background: 'transparent',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    _ltr: {
      right: '100%',
      mr: { lg: '7px' },
    },
    _rtl: {
      left: '100%',
      ml: { lg: '7px' },
    },
    svg: {
      path: {
        fill: 'secondaryHover',
      },
    },

    ".chakra-accordion__button[aria-expanded='true'] &": {
      backgroundColor: 'secondaryHover',
      transition: 'background-color 0.5s ease-in-out',
      svg: {
        path: {
          fill: '#fff',
        },
      },
    },
  },
  accordion: {
    _ltr: {
      pl: '60px',
    },
    _rtl: {
      pr: '60px',
    },
    '.chakra-accordion__button': {
      position: 'relative',
      '&[aria-expanded="true"]': {
        '.accordion-title': {
          fontWeight: '600',
          _rtl: {
            fontWeight: '700',
          },
        },
      },
    },
    '.chakra-accordion .chakra-accordion__item': {
      padding: { base: '5px', lg: '0 !important' },
      margin: '0',
      marginBottom: { lg: '20px' },
      _last: {
        marginBottom: { lg: '0' },
      },
    },
    '.chakra-accordion__panel': {
      minHeight: 'auto',
      p: '5px 10px',
    },
  },
});

const theme = { baseStyle };
export default theme;
