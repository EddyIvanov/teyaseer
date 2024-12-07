import { useContext } from 'react';

import { Box, useBreakpointValue } from '@chakra-ui/react';
import { useSwiper } from 'swiper/react';

import styles from './CustomHandler.styled';

import { Icon } from '@/components';
import { IconNames } from '@/components/atoms/Icon/Icon';
import { Context } from '@/providers/MainContext';

type TDirection = 'left' | 'right';

type TProps = {
  direction: TDirection;
  iconName?: IconNames;
  className?: string;
};

const CustomHandler = ({ direction, iconName, className }: TProps) => {
  const swiper = useSwiper();

  const style = styles({ direction });
  const { is_rtl } = useContext(Context);

  const handleClick: { [key in TDirection]: () => void } = {
    left: () => (is_rtl ? swiper.slideNext() : swiper.slidePrev()),
    right: () => (is_rtl ? swiper.slidePrev() : swiper.slideNext()),
  };

  const responsiveSize = useBreakpointValue(
    {
      base: 32,
      lg: 45,
    },
    {
      fallback: '45',
    }
  );

  return (
    <Box className={className} sx={style.handler}>
      <Box onClick={handleClick[direction]}>
        <Icon
          name={iconName ? iconName : 'arrowIconCircle'}
          width={`${responsiveSize}px`}
          sx={{
            transform: direction === 'left' ? 'rotate(180deg)' : 'none',
            cursor: 'pointer',
          }}
          h="45px"
          w="45px"
        />
      </Box>
    </Box>
  );
};

export default CustomHandler;
