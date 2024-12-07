import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';
import FontSizes from '@/styles/themes/brand/fontSizes';
import FontWeights from '@/styles/themes/brand/fontWeights';

const style = defineStyle({
  villaSpecsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  firstSpecification: {
    position: 'relative',
    fontSize: `clamp(${FontSizes.xxLarge}, 3.8vw, ${FontSizes.sixXLarge})`,
    fontWeight: FontWeights.medium,
    _ltr: {
      _before: {
        position: 'absolute',
        bottom: '0',
        height: '2px',
        width: {
          base: '100%',
          lg: '100vw',
        },
        content: '""',
        borderBottom: `2px solid ${colors.secondaryHover}`,
      },
    },
    _rtl: {
      _before: {
        position: 'absolute',
        bottom: '0',
        height: '2px',
        width: {
          base: '100%',
          lg: '100vw',
        },
        content: '""',
        borderBottom: `2px solid ${colors.secondaryHover}`,
      },
    },
    pb: '32px',
    mb: '32px',
  },
  restSpecifications: {
    flexDirection: 'row',
    gap: {
      base: '15px',
      lg: '90px',
    },
    overflowX: {
      base: 'auto',
      lg: 'unset',
    },
    pb: {
      base: '14px',
      lg: '0px',
    },
  },
  restSpecificationsInner: {
    display: 'flex',
    flexDirection: {
      base: 'row',
      lg: 'column',
    },
    gap: {
      base: 'unset',
      lg: '24px',
    },
  },
  villaSpec: {
    fontSize: `clamp(${FontSizes.xSmall}, 1.1vw, ${FontSizes.medium})`,
    gap: {
      base: '8px',
      lg: '12px',
    },
    whiteSpace: 'nowrap',
    alignItems: 'center',
    px: {
      base: '15px',
      lg: 'unset',
    },
    _ltr: {
      borderRight: {
        base: `1px solid ${colors.text.dark}`,
        lg: 'unset',
      },
      _first: {
        pl: '0px',
      },
      _last: {
        pr: '0px',
        borderRight: 'none',
      },
    },
    _rtl: {
      borderLeft: {
        base: `1px solid ${colors.text.dark}`,
        lg: 'unset',
      },
      _first: {
        pr: '0px',
      },
      _last: {
        pl: '0px',
        borderLeft: 'none',
      },
    },
  },
  firstColVillaSpec: {
    _ltr: {
      borderRight: {
        base: `1px solid ${colors.text.dark}`,
        lg: 'unset',
      },
      _first: {
        pl: '0px',
      },
    },
    _rtl: {
      borderLeft: {
        base: `1px solid ${colors.text.dark}`,
        lg: 'unset',
      },
      _first: {
        pr: '0px',
      },
    },
  },
  description: {
    '.villaDescription': {
      p: {
        mt: {
          base: '14px',
          lg: '32px',
        },
      },
    },
    b: {
      mt: {
        base: '24px',
        lg: '32px',
      },
    },
  },
  villaActionContainer: {
    mt: '32px',
    gap: {
      base: '24px',
      xl: '32px',
    },
    flexDirection: {
      base: 'column',
      xl: 'row',
    },
    button: {
      alignItems: 'center',
      width: {
        base: '100%',
        sm: 'fit-content',
      },
    },
    a: {
      alignItems: 'center',
      width: {
        base: '100%',
        sm: 'fit-content',
      },
    },
  },

  preDesignVillaActionContainer: {
    mt: {
      base: '24px',
      xl: '32px',
    },
    gap: {
      base: '24px',
      xl: '32px',
    },
    flexDirection: {
      base: 'column',
      xl: 'row',
    },
    button: {
      alignItems: 'center',
      width: {
        base: '100%',
        sm: 'fit-content',
      },
    },
    a: {
      alignItems: 'center',
      width: {
        base: '100%',
        sm: 'fit-content',
      },
    },
  },
  savedVillaModalContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    p: {
      base: '0px',
      lg: '32px',
    },
    gap: {
      base: '24px',
      lg: '32px',
    },
    maxWidth: '600px',
  },
  savedVillaModalTitle: {
    fontSize: FontSizes.xxLarge,
    fontWeight: FontWeights.semibold,
  },
  savedVillaModalContent: {
    fontSize: FontSizes.xMedium,
    textAlign: 'center',
  },
});

export default style;
