import { defineStyleConfig } from '@chakra-ui/react';

export const HStackOverrides = defineStyleConfig({
  variants: {
    fullHeight: {
      minHeight: '100%',
    },
  },
  defaultProps: {
    variant: 'fullHeight',
  },
});
