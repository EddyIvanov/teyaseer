import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const baseStyle = () => ({
  root: {
    justifyContent: 'flex-end',

    '.container': {
      pb: { base: '20px', lg: '0' },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.background-image': {
      objectFit: 'cover',
      zIndex: -1,
      width: 'auto',
      height: 'auto',
    },
    '.title-box': {
      width: { base: '100%', sm: 'auto' },
      alignSelf: { base: 'unset', lg: 'flex-start' },
      textAlign: { base: 'center', lg: 'left' },
      _ltr: {
        textAlign: {
          lg: 'left',
        },
      },
      _rtl: {
        textAlign: {
          lg: 'right',
        },
      },
      whiteSpace: 'pre-wrap',
      h1: {
        fontSize: `clamp(${FontSizes.xxLarge}, 8.58vmin  , ${FontSizes.sevenXLarge})`,
        color: colors.text.light,
        fontWeight: 400,
      },
      b: { display: { base: 'block', lg: 'inline' } },
      button: {
        marginTop: {
          base: '35px',
          md: '48px',
        },
        width: {
          base: '100%',
          sm: 'auto',
        },
      },
    },
    '.lowerBoxWrapper': {
      flexDirection: { base: 'column', lg: 'row' },
      gap: { base: 'min(32px, 2.86vh)', lg: 'unset' },
      alignItems: 'center',
      justifyContent: 'space-between',
      w: '100%',
      flex: 1,
      minH: '72px',
      my: 'min(48px, 4.30vh)',
    },
    '.logo': {
      width: {
        lg: '140px',
        xl: '151px',
      },
    },
    '.secondaryLogo': {
      position: 'absolute',
      transform: 'translateY(-100%)',
      top: '-48px',
    },
    '.verified-logo': {
      display: { base: 'none', lg: 'block' },
      width: {
        lg: '140px',
        xl: '151px',
      },
    },
  },
});

const theme = { baseStyle };
export default theme;
