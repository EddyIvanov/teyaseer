import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  root: {
    '.chakra-accordion__item': {
      border: 'none',
      marginBottom: {
        base: '16px',
        md: '30px',
      },
    },
    '.mainService': {
      display: 'flex',
      alignItems: 'center',
      m: 0,
      borderBottom: `1px solid rgba(232, 232, 232, 1)`,
      padding: '10px 0',
      fontSize: {
        base: '1.2rem',
        md: '1.6rem',
      },
      fontWeight: FontWeights.medium,
      textAlign: 'left',
      _hover: {
        cursor: 'pointer',
      },
    },
    '.chakra-accordion__panel': {
      paddingBottom: '0',
      mt: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      paddingInlineStart: '20px',
    },
    '.radioButton': {
      position: 'relative',
      appearance: 'none',
      height: '20px',
      width: '20px',
      minWidth: '20px',
      border: `2px solid rgba(102, 112, 128, 0.3)`,
      borderRadius: '50%',
      mr: '10px',
      '&:checked': {
        border: `2px solid ${colors.secondary}`,
        _after: {
          zIndex: '12',
          content: "''",
          position: 'absolute',
          left: '3px',
          top: '3px',
          width: '10px',
          height: '10px',
          bg: colors.secondary,
          borderRadius: '50%',
        },
        '+ .formLabel': {
          fontWeight: FontWeights.medium,
        },
      },
    },
    '.formLabel': {
      mb: 0,
      fontWeight: FontWeights.normal,
      fontSize: {
        base: '1.2rem',
        md: '1.4rem',
      },
      _hover: {
        cursor: 'pointer',
      },
    },
    '.submitButton': {
      mt: '30px',
      width: {
        base: '100%',
        sm: 'fit-content',
      },
    },
  },
});

export default style;
