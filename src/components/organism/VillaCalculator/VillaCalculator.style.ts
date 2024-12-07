import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import sizes from '@/styles/themes/brand/sizes';

const styles = defineStyle(() => ({
  imageBg: {
    position: 'relative',
    minHeight: { base: '300px', md: '600px' },
    flex: 1,
    display: { base: 'none', md: 'block' },
    backgroundColor: colors.imageBackgroundLight,
    img: {
      objectFit: 'cover',
    },
  },
  optionsListWrapper: {
    overflowY: { base: 'scroll', md: 'hidden' },
    h: {
      base: `calc(100dvh - 185px - ${sizes.headerMobileSize} - 73px)`,
      md: `calc(100dvh - ${sizes.headerMobileSize} - 95px)`,
      lg: `calc(100dvh - ${sizes.headerDesktopSize} - 128px)`,
    },
  },
  optionsList: {
    overflowY: 'auto',
    w: { base: '100%', md: '45%' },
    h: '100%',

    _ltr: {
      padding: {
        base: '32px 24px',
        xl: '64px 80px 52px 64px',
        '3xl': '64px 187px 52px 64px',
      },
    },
    _rtl: {
      padding: {
        base: '32px 24px',
        xl: '64px 80px 52px 64px',
        '3xl': '64px 64px 52px  187px ',
      },
    },
  },
  bold: {
    fontWeight: 600,
  },
}));

export default styles;
