import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  card: {
    borderWidth: '1px',
    borderRadius: '2xl',
    overflow: 'hidden',
    borderColor: 'border',
    direction: colors.border,
    p: '24px',
    maxWidth: '800px',
    boxShadow: 'none',
  },
  cardHeader: {
    borderBottom: '1px solid',
    borderBottomColor: 'border',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '6',
    padding: '16px 0',
    '.SUCCESS': {
      color: colors.success,
    },
    '.FAILED': {
      color: colors.error,
    },
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '16px 0',
  },
  fileSelector: {
    display: 'flex',
    direction: 'row',
    flexWrap: 'wrap',
    borderRadius: '8px',
    border: '1px dashed',
    borderColor: colors.primary,
    alignItems: 'center',
    padding: '16px',
    justifyContent: 'space-between',
    gap: '16px',
    maxWidth: 'fit-content',
  },
});

export default style;
