import { defineStyle } from '@chakra-ui/react';

const style = defineStyle({
  '.onboardingPulseArticleParagraph': {
    h2: {
      mt: 0,
    },
    mt: '32px',
  },
  onboardingChoices: {
    display: 'flex',
    flexDirection: 'column',
    maxW: 'fit-content',
    gap: '16px',
  },
});
export default style;
