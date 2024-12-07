import { accordionAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

import FontSizes from '@/styles/themes/brand/fontSizes';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const outline = definePartsStyle(() => {
  return {
    container: {
      border: 'none',
      _notLast: {
        borderBottom: '1px solid rgba(0, 23, 49, 0.24)',
      },
      borderColor: 'gray.100',
      _rtl: {
        mr: '56px',
      },
      _ltr: {
        ml: '56px',
      },
    },
    button: {
      py: '20px',
      px: 0,
      pb: '16px',
      fontSize: { base: FontSizes.normal, xl: FontSizes.xMedium },
      _hover: {
        bg: 'transparent',
      },
      _focus: {
        bg: 'transparent',
      },
      _ltr: { textAlign: 'left' },
      _rtl: { textAlign: 'right' },
    },
    panel: {
      px: 0,
    },
  };
});

const noOutline = definePartsStyle(() => {
  return {
    container: {
      border: 'none',
    },
    button: {
      py: '24px',
      fontSize: { base: FontSizes.xMedium, xl: FontSizes.large },
      _hover: {
        bg: 'transparent',
      },
      _focus: {
        bg: 'transparent',
      },
      _ltr: { textAlign: 'left' },
      _rtl: { textAlign: 'right' },
    },
    panel: {
      minHeight: 'calc(100vh - (180px + 85px * 5))', // 100px(header) + 80px(paddingTop) + (heightOfEach * numberOfCategory)
      _ltr: { pr: { xl: 0 } },
    },
  };
});

const variants = {
  outline,
  noOutline,
};

export default defineMultiStyleConfig({
  variants,
});
