import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle({
  card: {
    border: 'none',
    p: '0',
    maxWidth: '800px',
    boxShadow: 'none',
  },
  cardHeader: {
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '4px 0',
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
  requiredIndicator: {
    color: colors.error,
  },
});

export default style;
