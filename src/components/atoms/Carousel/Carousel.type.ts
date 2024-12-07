import { ReactNode } from 'react';

import { SystemStyleObject } from '@chakra-ui/react';
import { SwiperProps } from 'swiper/react';

interface CarouselProps extends SwiperProps {
  direction?: 'horizontal' | 'vertical';
  effect?: 'slide' | 'fade';
  isPaginate?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  sx?: SystemStyleObject;
  delay?: number;
  children: React.ReactNode[] | React.JSX.Element[];
  customControls?: ReactNode;
  carouselVariant?: 'light' | 'dark' | 'calculator';
}

export default CarouselProps;
