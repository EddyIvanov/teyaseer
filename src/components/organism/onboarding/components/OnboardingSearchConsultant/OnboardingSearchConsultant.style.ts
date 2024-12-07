import { defineStyle } from '@chakra-ui/react';

import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  '.backgroundImage': {
    position: 'relative',
    width: '100%',
    height: '100%',
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
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
    mt: {
      base: '32px',
      lg: '48px',
    },
    gap: '24px',
    '.onboardingLinkBtn': {
      pl: '15px',
      textTransform: 'none',
    },
  },
  selectedVendorContainer: {
    fontSize: FontSizes.xSmall,
    mt: '24px',
  },
  companyName: {
    fontWeight: FontWeights.semibold,
  },
  companyLocation: {
    mt: '10px',
    fontWeight: FontWeights.light,
  },
  companyContact: {
    display: 'flex',
    alignItems: 'center',
    mt: '10px',
    svg: {
      m: '0 4px 0 -4px',
    },
    fontWeight: FontWeights.medium,
  },
});
export default style;
