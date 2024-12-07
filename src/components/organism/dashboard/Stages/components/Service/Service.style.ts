import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontWeights from '@/styles/themes/brand/fontWeights';

const sidePadding = {
  pl: {
    base: '20px',
    md: '40px',
  },
  pr: {
    base: '20px',
    md: '40px',
  },
};

const style = defineStyle({
  root: {
    _last: {
      '.serviceSelectionType': {
        borderBottom: 'none',
      },
    },
    '.service': {
      p: '30px 0 0',
    },
    '.leftRightPadding': sidePadding,

    '.serviceRequestFlow': {
      justifyContent: 'space-between',
      gap: '10px',
      borderTop: `1px solid ${colors.lineSeparator}`,
      bg: colors.backgroundMerino,
      p: '20px 0',
      pl: sidePadding.pl,
      pr: sidePadding.pr,

      '&.downloadRequestFlow': {
        borderTop: 0,
        pt: 0,
      },
      svg: {
        width: '18px',
        height: '18px',
        path: {
          stroke: 'black',
        },
      },
      a: {
        textTransform: 'none',
        minWidth: 'fit-content',
        display: 'inline-flex',
        alignItems: 'center',
        color: colors.brand.primary,
        pl: { base: '0', md: '20px' },
      },
      flexDirection: {
        base: 'column',
        md: 'row',
      },
      alignItems: {
        base: 'flex-start',
        md: 'center',
      },
      '.serviceRequestFlow__title': {
        fontWeight: FontWeights.semibold,
      },
    },
    '.serviceCta': {
      mb: '30px',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '20px',
      '.activateService[data-loading]': {
        _hover: {
          background: '#CAA95C',
        },
      },
    },
    '.serviceSelectionType': {
      width: '100%',
      borderBottom: `1px solid ${colors.lineSeparator}`,
      position: 'relative',
      textTransform: 'capitalize',
      '.type ': {
        position: 'absolute',
        height: '48px',
        width: '48px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        border: `1px solid ${colors.lineSeparator}`,
        borderRadius: '50%',
        background: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
});

export default style;
