import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const theme = defineStyle(({ hasIcon, color }: any) => ({
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
      justifyContent: 'space-between',
      rowGap: '10px',
      alignItems: 'center',
    },
    '.title': {
      color,
      fontWeight: 400,
      pt: {
        base: '84px',
        xl: '124px',
      },
      fontSize: {
        base: 'max(4rem, 6vw)',
        '3xl': 'clamp(4rem, 8vw , 14rem)',
      },
      maxW: {
        base: 'clamp(26rem, 39vw, 62.6rem)',
        '3xl': 'clamp(26rem, 54vw , 96rem)',
      },
      textAlign: 'center',
      _rtl: {
        maxW: {
          base: 'clamp(22.88rem, 35vw, 60rem)',
          '3xl': 'clamp(22.88rem, 46vw , 79.3rem)',
        },
      },
    },
    '.stats-list-grid': {
      display: 'grid',
      gridTemplateColumns: {
        base: '1fr',
        md: '1fr 1fr 1fr',
      },
      width: { base: '100%', md: '90%' },
      rowGap: {
        base: 'min(39px, 3vh)',
        md: '103px',
      },
      columnGap: '150px',

      '.stats-list__icon': {
        mb: {
          base: 'min(12px, .5vh)',
          md: '18px',
        },
        height: {
          base: '24px',
          md: '50px',
        },
        width: {
          base: '20px',
          md: '50px',
        },
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
      fontSize: 'clamp(4rem, 5.32vw, 9.2rem)',
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
    '.lowest-row': {
      display: {
        base: 'none',
        lg: 'flex',
      },
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

export default theme;
