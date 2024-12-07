import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const theme = defineStyle({
  root: {
    flex: 1,
    placeItems: 'flex-start',
  },
  divider: {
    my: '10px',
  },
  headContainer: {
    alignItems: 'flex-start',
    gap: '15px',
  },
  socialItemBox: {
    gap: '15px',
  },
  socialItemIconWrapper: {
    borderRadius: '100%',
    background: colors.secondary,
    padding: '10px',
  },
  socialItemIcon: {
    color: 'white',
    height: '22px',
    width: '22px',
  },
  socialItemTitle: {
    fontWeight: FontWeights.light,
    fontSize: FontSizes.normal,
  },
  socialItemSubtitle: {
    fontWeight: FontWeights.semibold,
    fontSize: FontSizes.normal,
  },
  infoBoxWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    gap: '15px',
  },
  infoBoxTitle: {
    fontWeight: FontWeights.light,
    fontSize: FontSizes.normal,
  },
  infoBoxSub: {
    fontWeight: FontWeights.semibold,
    fontSize: FontSizes.normal,
    wordBreak: 'break-word',
  },
  textTitle: {
    fontWeight: FontWeights.semibold,
    fontSize: FontSizes.normal,
  },
  servicesBox: {
    w: '100%',
  },
  serviceItem: {
    width: '100%',
    py: '10px',
    fontWeight: FontWeights.medium,
    fontSize: FontSizes.small,
    '&:nth-child(odd)': {
      background: 'whitesmoke',
    },
    '&:nth-child(even)': {
      background: 'white',
    },
  },
  reviewBox: {
    gap: '10px',
    w: '100%',
    borderBottom: '1px solid rgba(232, 232, 232, 1)',
  },
  reviewRow: {
    w: '100%',
    py: '15px',
    placeItems: 'flex-start',
    borderBottom: `1px solid ${colors.border}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },

  reviewTitleBox: {
    placeItems: 'flex-start',
  },
  reviewTitle: {
    fontWeight: FontWeights.medium,
    fontSize: FontSizes.normal,
  },
  reviewSubtitle: {
    fontWeight: FontWeights.light,
    fontSize: FontSizes.small,
  },
  reviewDate: {
    fontWeight: FontWeights.normal,
    fontSize: FontSizes.small,
  },
  viewMoreBtn: {
    alignSelf: 'center',
    textTransform: 'none',
    span: {
      fontWeight: FontWeights.bold,
    },
    mt: '24px',
  },
  accordionIcon: {
    fontSize: 'large',
  },
});

export default theme;
