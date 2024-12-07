import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import { setFontSize } from '@/styles/utils/setFontSize';

const theme = defineStyle(({ hasIcon, color, buttonCount }: any) => ({
  root: {
    maxHeight: '100vh',
    color: '#363636',
    position: 'relative',
    pb: hasIcon
      ? {
          base: '58px',
          md: '80px',
          xl: '90px',
          '2xl': '100px',
          '3xl': '160px',
        }
      : {
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
      justifyContent: 'center',
      rowGap: {
        base: buttonCount > 1 ? '2vh' : '4vh',
        md: '4vh',
        lg: 'min(9vh, 100px)',
      },
      alignItems: 'center',
    },
    '.title h1, h2, h3, h4, h5, h6': {
      color,
      fontWeight: 400,
      whiteSpace: 'pre-wrap',
      pt: {
        base: '84px',
        xl: '124px',
      },
      fontSize: {
        base: setFontSize(FontSizes.xxLarge, FontSizes.fiveXLarge),
        lg: setFontSize(FontSizes.xxLarge, FontSizes.sevenXLarge),
      },
      textAlign: 'center',
    },
    '.stats-list-grid': {
      display: 'grid',
      gridTemplateColumns: {
        base: '1fr',
        lg: '1fr 1fr 1fr',
      },
      width: { base: '100%', md: '90%' },
      rowGap: {
        base: 'min(39px, 3vh)',
      },
      columnGap: {
        base: '50px',
        md: '50px',
        lg: '150px',
      },
      '.stats-list__icon': {
        mb: {
          base: 'min(12px, .5vh)',
          md: '18px',
        },
        svg: {
          height: 'clamp(24px, 4vh, 50px)',
          width: 'clamp(24px, 4vh, 50px)',
        },
      },

      '.stats-list__icon--light': {
        filter:
          'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7499%) hue-rotate(25deg) brightness(123%) contrast(100%)',
      },
      '.stats-list__icon--dark': {
        filter:
          'brightness(0) saturate(0%) invert(100%) sepia(0%) saturate(7499%) hue-rotate(25deg) brightness(3%) contrast(100%)',
      },

      '.stats-list-item-label': {
        maxW: {
          base: '150px',
          md: 'fit-content',
        },
      },
    },
    '.stats-list': {
      width: '100%',
      flexDirection: {
        base: 'column',
        lg: 'row',
      },
      justifyContent: 'space-around',
      gap: {
        base: '16px',
        lg: '0',
      },
    },
    '.stats-list-item': {
      alignItems: 'center',
      textAlign: 'center',
      flexDirection: 'column',
    },
    '.stats-list-item-count': {
      color: colors.text.light,
      fontWeight: 300,
      fontSize: {
        base: setFontSize('2.2rem', FontSizes.fiveXLarge),
        lg: setFontSize(FontSizes.xxLarge, FontSizes.sixXLarge),
      },
    },
    '.stats-list-item-label': {
      color,
      fontWeight: 400,
      fontSize: {
        base: FontSizes.small,
        md: FontSizes.medium,
        lg: FontSizes.xMedium,
        xl: FontSizes.large,
        '2xl': FontSizes.xLarge,
      },
      maxW: {
        base: '100px',
        md: '140px',
        lg: 'max-content',
      },
    },
    '.stats-list-item-underline': {
      borderTop: '1px solid white',
      w: '42px',
      mt: {
        base: '13px',
        lg: '32px',
      },
    },
    '.cta-container': {
      w: '100%',
      gap: {
        base: '16px',
        lg: '30px',
      },
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: {
        base: 'column',
        md: 'column',
        lg: 'row',
      },
    },
  },
}));

export default theme;
