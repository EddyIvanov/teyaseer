import FontSizes from '@/styles/themes/brand/fontSizes';
import { setFontSize } from '@/styles/utils/setFontSize';

const baseStyle = () => ({
  root: {
    position: 'relative',
    justifyContent: 'center',
    '.background-image': {
      zIndex: -2,
      objectFit: 'cover',
    },
    '.center-box': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: `clamp(43px, 7vh, 112px)`,
    },
    '.title': {
      h1: {
        whiteSpace: 'pre-wrap',
        textAlign: 'center',
        color: '#fff',
        fontSize: setFontSize(FontSizes.fourXLarge, FontSizes.sevenXLarge),
        fontWeight: 400,
      },
    },
    '.action-link a': {
      textDecoration: 'none',
      textUnderlineOffset: '1.6rem',
      bg: 'text.light',
      color: 'text.dark',
      fontSize: FontSizes.small,
      fontWeight: 600,
      width: {
        base: 'calc(100vw - 48px)',
        sm: '313px',
      },
      height: '54px',
      borderRadius: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

const theme = { baseStyle };
export default theme;
