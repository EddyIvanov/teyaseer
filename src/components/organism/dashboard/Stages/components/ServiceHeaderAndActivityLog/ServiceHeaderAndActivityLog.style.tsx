import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  root: {
    flexDirection: 'column',
    rowGap: '24px',
    '.serviceOption': {
      color: 'primary',
      fontSize: '1.2rem',
      fontWeight: '700',
    },
    '.serviceOptionTitle': {
      columnGap: '10px',
      mt: '11px',
    },
    '.serviceStatus': {
      gap: '20px',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    '.activationStatus': {
      marginTop: '10px',
      justifyContent: 'space-between',
      gap: '10px',
      flexWrap: 'wrap',
      fontWeight: FontWeights.light,
      '.activationBadge': {
        bg: colors.secondaryHover,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '21px',
        width: '32px',
        borderRadius: '100px',
        p: {
          color: colors.text.light,
          fontSize: '1.2rem',
          fontWeight: FontWeights.medium,
        },
      },
      '.activationDaysClock': {
        height: '22px',
        width: '22px',
        bg: colors.secondaryHover,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        svg: {
          path: {
            stroke: 'white',
            strokeWidth: '2px',
          },
        },
      },
      '.activationWrapper': {
        display: 'inline-flex',
        gap: '5px',
      },
    },
  },
});

export default style;
