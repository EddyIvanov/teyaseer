import { useContext } from 'react';

import { Box, useMultiStyleConfig } from '@chakra-ui/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {
  Autoplay,
  EffectFade,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
} from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import CarouselProps from './Carousel.type';

import { Context } from '@/providers/MainContext';

SwiperCore.use([Mousewheel, Keyboard, Parallax]);

const SwiperSlider = (props: CarouselProps & SwiperProps) => {
  const { locale } = useContext(Context);
  const {
    delay = 4000,
    sx = {},
    isPaginate = true,
    autoplay = false,
    effect = 'slide',
    spaceBetween = 50,
    slidesPerView = 1,
    direction = 'horizontal',
    loop = false,
    customControls,
    carouselVariant = 'light',
    ...restProps
  } = props;
  const style = useMultiStyleConfig('Carousel', {
    variant: carouselVariant,
  });

  const swiperProps: any = {
    effect,
    spaceBetween,
    slidesPerView,
    direction,
    loop,
    modules: [EffectFade, Pagination, Autoplay, Navigation, Parallax],
    ...restProps,
  };
  return (
    <Box sx={sx} __css={{ ...style.root }}>
      <Swiper
        autoplay={
          autoplay
            ? {
                delay,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={{
          clickable: true,
          verticalClass: 'swiper-pagination-v',
          enabled: isPaginate,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        modules={[EffectFade, Pagination, Autoplay, Keyboard, Navigation]}
        {...swiperProps}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        key={locale}
      >
        {props.children &&
          props.children.map((child, index) => {
            return <SwiperSlide key={index}>{child}</SwiperSlide>;
          })}
        {customControls && props.children.length > 1 && customControls}
      </Swiper>
    </Box>
  );
};

export default SwiperSlider;
