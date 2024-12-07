import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const baseStyle = defineStyle({
  root: {
    '&:has(input:-webkit-autofill)': {
      label: {
        background: '#e8f0fe',
      },
    },
    '.inputGroup': {
      display: 'flex',
      gap: '12px',
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
      position: 'relative',
      padding: '10px 16px',
      height: '48px',
      "&[data-type='textarea']": {
        height: 'auto',
      },
      margin: 0,
      '.inputLabel': {
        color: '#ACACAC',
        fontSize: FontSizes.xSmall,
        position: 'absolute',
        top: '5px',
        margin: 0,
      },
      textarea: {
        margin: '0 !important',
        border: 'none',
        padding: '0 !important',
        fontSize: FontSizes.small,
        minHeight: '70px',
        boxShadow: 'none',
      },
      input: {
        border: 'none',
        fontSize: FontSizes.small,
        padding: 0,
        boxShadow: 'none',
        paddingEnd: '30px',
      },
      '.hasValue': {
        marginTop: '10px',
      },
      '.prefixComponent': {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#FAFAFA',
        borderRadius: '6px',
        fontSize: FontSizes.small,
      },

      '.prefixComponent.phone': {
        direction: 'ltr',
        gap: '5px',
        _rtl: {
          flexDirection: 'row-reverse',
        },
      },
    },
    '.inputGroup[data-focus]': {
      border: `1px solid ${colors.secondary}`,
    },
    '.borderError': {
      border: `1px solid ${colors.error}`,
    },
    '.validationError': {
      color: colors.error,
      fontSize: FontSizes.xSmall,
    },
    '.clear-input-icon': {
      cursor: 'pointer',
      _rtl: {
        left: '0',
        right: 'unset',
      },
      _ltr: {
        left: 'unset',
        right: '0',
      },
    },
  },
});

export default baseStyle;
