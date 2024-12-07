import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const theme = defineStyle({
  searchInputContainer: {
    display: 'flex',
    position: 'relative',
    width: {
      base: '300px',
      lg: '373px',
    },
  },
  searchResultsContainer: {
    position: 'absolute',
    backgroundColor: colors.background,
    margin: '0',
    top: '100%',
    listStyleType: 'none',
    border: '1px solid #171D38',
    borderRadius: '20px',
    width: {
      base: '281px',
      lg: '373px',
    },
    maxH: '300px',
    minH: '100px',
    mt: '16px',
    p: '16px 0',
    overflowY: 'scroll',
    zIndex: '2',
    display: 'flex',
    flexDirection: 'column',
    li: {
      width: '100%',
      padding: {
        base: '10px 15px',
        lg: '16px 32px',
      },
      _hover: {
        cursor: 'pointer',
        backgroundColor: '#EEF1F4',
      },
    },
  },
  loadingOrNoContent: {
    justifyContent: 'center',
  },
  searchResultsStateInformation: {
    height: '40px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: {
      base: FontSizes.normal,
      lg: FontSizes.small,
    },
    fontWeight: FontWeights.semibold,
  },
  companyLocation: {
    mt: '10px',
    fontSize: {
      base: FontSizes.small,
      lg: FontSizes.small,
    },
    fontWeight: FontWeights.light,
  },
  companyContact: {
    mt: '10px',
    svg: {
      m: '0 4px 0 -4px',
    },
    fontSize: {
      base: FontSizes.small,
      lg: FontSizes.small,
    },
    fontWeight: FontWeights.medium,
  },
});

export default theme;
