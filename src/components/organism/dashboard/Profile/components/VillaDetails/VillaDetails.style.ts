import { defineStyle } from '@chakra-ui/react';

import borders from '@/styles/themes/brand/borders';
import boxShadows from '@/styles/themes/brand/boxShadows';
import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  mainContainer: {
    display: 'flex',
    flexDirection: {
      base: 'column',
      md: 'row',
    },
    border: '0',
    borderRadius: borders.normal,
    boxShadow: boxShadows.panelBox,
    backgroundColor: colors.text.light,
    overflow: 'hidden',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '47%',
    _ltr: {
      p: {
        base: '24px',
        md: '32px 0 32px 32px',
      },
    },
    _rtl: {
      p: {
        base: '24px',
        md: '32px 32px 32px 0',
      },
    },
  },
  header: {
    h2: {
      color: colors.text.dark,
      fontWeight: FontWeights.bold,
      fontSize: FontSizes.normal,
    },
  },
  villaDetails: {
    marginTop: '32px',
    gap: '12px',
    flexDirection: 'column',
  },
  villaDetail: {
    display: 'flex',
    gap: {
      base: '0px',
      md: '5px',
    },
    justifyContent: {
      base: 'space-between',
      md: 'flex-start',
    },
  },
  villaDetailLabel: {
    fontSize: `clamp(${FontSizes.xSmall}, 0.9vw, ${FontSizes.small})`,
    fontWeight: {
      base: FontWeights.normal,
      md: FontWeights.semibold,
    },
  },
  villaDetailValue: {
    fontSize: `clamp(${FontSizes.xSmall}, 0.9vw, ${FontSizes.small})`,
    textTransform: 'capitalize',
  },
  villaDetailOthers: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      base: '0px',
      md: '4px',
    },
    textAlign: {
      base: 'end',
      md: 'start',
    },
  },
  imageContainer: {
    position: 'relative',
    mt: '32px',
    width: '100%',
    height: '150px',
    borderRadius: '12px',
    overflow: 'hidden',
    '.villaImage': {
      cursor: 'pointer',
      objectFit: 'cover',
    },
  },
  actionBtnContainer: {
    mt: '36px',
  },
  actionBtn: {
    width: {
      base: '100%',
      md: 'fit-content',
    },
  },
  rightContainer: {
    position: 'relative',
    display: 'flex',
    flex: '53%',
    '.villaImage': {
      cursor: 'pointer',
      objectFit: 'cover',
    },
  },
});

export default style;
