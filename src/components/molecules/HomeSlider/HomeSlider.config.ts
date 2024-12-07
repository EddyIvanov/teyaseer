import { SwiperProps } from 'swiper/react';

const configurations = (size: any): SwiperProps => {
  return {
    freeMode: true,
    height: size?.height || 1,
    parallax: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    mousewheel: {
      invert: false,
      forceToAxis: true,
    },
    effect: 'slide',
    direction: 'vertical',
    slidesPerView: 1,
    longSwipes: false,
    simulateTouch: false,
    initialSlide: 0,
    speed: 1000,
  };
};
export default configurations;
