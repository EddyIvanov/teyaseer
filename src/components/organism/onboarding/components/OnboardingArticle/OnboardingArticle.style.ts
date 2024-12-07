import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  '.onboardingArticleParagraph': {
    h2: {
      mt: 0,
    },
    mt: '33px',
  },
  onboardingChoices: {
    gap: '16px',
    maxW: 'fit-content',
    mt: {
      base: '20px',
      lg: '32px',
    },
  },
});
export default style;
