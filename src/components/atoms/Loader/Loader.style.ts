import { defineStyle } from '@chakra-ui/react';

import colors from '@/styles/themes/brand/colors';

const style = defineStyle((props: any) => {
  return {
    villasSpinner: {
      ...{
        color: colors.primary,
      },
      ...(!props.size
        ? {
            width: {
              base: '15vw',
              lg: '10vw',
            },
            height: {
              base: '15vw',
              lg: '10vw',
            },
          }
        : {}),
    },
  };
});

export default style;
