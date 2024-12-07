import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const baseStyle = () => ({
  root: {
    justifyContent: 'center',
    boxSizing: 'border-box',
    height: { base: '100%', lg: '100%' },
    minH: { base: '500px', lg: '800px' },
    pb: {
      md: '36px',
      lg: '46px',
      xl: '57.2px',
      '2xl': '62px',
      '3xl': '74px',
      '4xl': '88px',
    },
    pt: {
      base: '28px',
      md: '36px',
      lg: '46px',
      xl: '57.2px',
      '2xl': '62px',
      '3xl': '74px',
      '4xl': '88px',
    },
    '.carouselMediaSectionItem': {
      objectFit: 'cover',
    },
    '.carouselMediaSectionRichTitle': {
      h1: {
        _rtl: {
          textAlign: 'right',
        },
        _ltr: {
          textAlign: 'left',
        },
        color: colors.text.dark,
        fontWeight: 300,
        mb: {
          base: '50px',
          md: '60px',
        },
        fontSize: {
          base: FontSizes.xxLarge,
          md: FontSizes.fiveXLarge,
        },
      },
    },
    '.carouselMediaSectionItemTitle': {
      pt: '14px',
      pb: '8px',
      color: 'black',
      fontWeight: FontWeights.normal,
      fontSize: {
        base: FontSizes.xMedium,
        xl: FontSizes.xxLarge,
      },
    },
    '.carouselMediaSectionDescription': {
      fontWeight: FontWeights.light,
      fontSize: { base: FontSizes.xSmall, xl: FontSizes.normal },
    },
    '.leftCarouselButton, .rightCarouselButton': {
      background: 'transparent',
      width: '54px',
      height: '54px',
      top: '50%',
      transform: 'translateY(-50%)',
      mt: '-54px',
    },
    '.leftCarouselButton': {
      left: '66px',
    },
    '.rightCarouselButton': {
      right: '6px',
    },
  },
});
const theme = { baseStyle };
export default theme;
