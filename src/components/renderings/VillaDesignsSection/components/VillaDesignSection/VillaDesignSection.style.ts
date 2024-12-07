import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';

const theme = defineStyle({
  root: {
    overflow: 'hidden',
    villaArticleSmallContainer: {
      mt: {
        base: '48px',
        lg: '112px',
      },
    },
    villaArticleBigContainer: {
      mt: {
        base: '48px',
        lg: '112px',
      },
    },
    '.villaDesignsHeading': {
      flexDirection: 'column',
      '.category': {
        color: '#363636',
        fontSize: `clamp(${FontSizes.normal}, 1.3vw, ${FontSizes.large})`,
      },
      '.subCategory': {
        mt: {
          base: '8px',
          lg: 'unset',
        },
        fontSize: `clamp(${FontSizes.xxLarge}, 5.4vw, 10rem)`,
      },
    },
    '.villaDesignsCta': {
      mt: {
        base: '31.04px',
        lg: '124.96px',
      },
      justifyContent: {
        base: 'flex-start',
        lg: 'center',
      },
      button: {
        textTransform: 'uppercase',
        w: {
          base: '100%',
          sm: 'auto',
        },
      },
    },
  },
});

export default theme;
