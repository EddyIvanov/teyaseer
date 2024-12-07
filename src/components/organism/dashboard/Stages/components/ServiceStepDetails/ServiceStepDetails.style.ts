import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  root: {
    '.progressBar': {
      display: 'flex',
      flexDir: 'column',
      gap: '10px',
      p: {
        fontSize: '1.2rem',
        fontWeight: FontWeights.bold,
      },
    },
    '.accordion': {
      border: 'none',
      gap: '20px',
      mt: '28px',
    },
    '.accordionButton': {
      padding: '14px',
      borderBottom: `1px solid ${colors.lineSeparator}`,
      display: 'flex',
      justifyContent: 'space-between',
      p: {
        fontWeight: FontWeights.medium,
      },
    },
    '.accordionPanel': {
      padding: '0 14px',
      p: {
        fontSize: '1.4rem',
      },
    },
    '.activityLogItem': {
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
      _even: {
        bg: colors.backgroundLightGrey,
      },
      '.Complete': {
        color: colors.success,
      },
      '.Pending': {
        color: colors.primary,
      },
      '.Rejected': {
        color: colors.warning,
      },
    },
  },
});
export default style;
