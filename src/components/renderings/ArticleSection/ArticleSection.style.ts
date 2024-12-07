import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import letterSpacings from '@/styles/themes/brand/letterSpacings';

const baseStyle = () => ({
  root: {
    justifyContent: 'flex-end',
    '.container': {
      zIndex: 2,
    },
    '.backgroundImage': {
      objectFit: 'cover',
      transform: {
        base: 'scaleX(-1)',
        lg: 'unset',
      },
    },
    '.articleSectionRichHeader': {
      h1: {
        color: colors.text.light,
        mb: {
          base: '28px',
          md: '36px',
          lg: '46px',
          xl: '57px',
          '2xl': '62px',
          '3xl': '74px',
          '4xl': '88px',
        },
        fontSize: {
          base: FontSizes.fourXLarge,
          xl: FontSizes.sixHalfXLarge,
          '2xl': FontSizes.sevenXLarge,
          '3xl': FontSizes.eightXLarge,
          '4xl': FontSizes.nineXLarge,
        },
        _rtl: {
          fontWeight: 400,
          textAlign: 'right',
          maxW: {
            base: '160px',
            md: '192px',
            lg: '224px',
            '2xl': '416px',
          },
        },
        _ltr: {
          fontWeight: 300,
          textAlign: 'left',
          maxW: {
            base: '250px',
            md: '320px',
            lg: '400px',
            xl: '512px',
            '2xl': '576px',
            '3xl': '675px',
            '4xl': '720px',
          },
        },
      },
    },
    '.articleDescriptionInnerContainer': {
      p: {
        mb: {
          base: '20px',
          md: '24px',
          lg: '28px',
          xl: '40px',
          '2xl': '40px',
          '3xl': '40px',
          '4xl': '40px',
        },
      },
    },
    '.learnMoreContainer': {
      alignItems: 'center',
    },
    '.learnMore': {
      color: 'black',
      fontWeight: 600,
      letterSpacing: {
        base: letterSpacings.wider,
        lg: letterSpacings.medium,
      },
      fontSize: {
        base: FontSizes.small,
        md: FontSizes.normal,
        lg: FontSizes.xSmall,
        xl: FontSizes.normal,
        '2xl': FontSizes.normal,
        '3xl': FontSizes.normal,
        '4xl': FontSizes.normal,
      },
      textDecoration: 'underline',
    },
    '.learnMoreIcon': {
      _rtl: {
        transform: 'scaleX(-1)',
      },
      _ltr: {
        transform: 'scaleX(1)',
      },
    },
  },
});
const theme = { baseStyle };
export default theme;
