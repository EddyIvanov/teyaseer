import { useContext, useEffect, useRef, useState } from 'react';

import { Box } from '@chakra-ui/react';
import { useSize } from '@chakra-ui/react-use-size';
import SwiperCore from 'swiper';
import { Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import configurations from './HomeSlider.config';
import style from './HomeSlider.style';
import HomeProps from './HomeSlider.type';

import { Context } from '@/providers/MainContext';

SwiperCore.use([Keyboard, Mousewheel]);
const HomeSlider = ({ children }: HomeProps) => {
  const myRef = useRef<any>(null);
  const size = useSize(myRef);
  const [pageSwiper, setPageSwiper] = useState<SwiperCore>();
  const { setSwiper } = useContext(Context);

  const onBeforeTransition = (swiper: SwiperCore) => {
    swiper.wrapperEl.style.transitionTimingFunction = 'ease-in-out';
    swiper.mousewheel.disable();
  };

  const onAfterTransition = (swiper: SwiperCore) => {
    setTimeout(() => {
      swiper?.mousewheel?.enable();
    }, 900);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    if (main && footer) {
      main.style.height = '100svh';
      main.style.zIndex = '2';
    }
    return () => {
      document.body.style.overflow = 'auto';
      if (main && footer) {
        main.style.height = 'auto';
        main.style.transform = `translateY(0px)`;
        main.style.transition = `unset`;
        main.style.zIndex = '1';
        footer.style.removeProperty('position'); // clear style position on page switch
      }
    };
  }, []);

  useEffect(() => {
    setSwiper(pageSwiper);
    return () => {
      setSwiper(undefined);
    };
  }, [pageSwiper]);

  const onSlideChange = (fnSwiper: SwiperCore) => {
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const lastSlide = fnSwiper.slides[fnSwiper.slides.length - 1];
    if (main && footer && lastSlide) {
      if (fnSwiper.isEnd) {
        if (footer) {
          footer.style.position = 'absolute'; // make position absolute for pages that use HomeSlider. By default should be relative, to improve Lighthouse Page score
          setTimeout(() => {
            const footerHeight = footer.getBoundingClientRect().height;
            main.style.transform = `translate(0,-${footerHeight}px)`;
            main.style.transition = `all 0.6s ease-in-out`;
            lastSlide.style.paddingTop = `${footerHeight}px`;
            lastSlide.style.transition = `all 0.6s ease-in-out`;
          }, 800);
        }
      } else {
        main.style.transform = `translate(0,0)`;
        lastSlide.style.paddingTop = `0px`;
      }
    }
  };
  return (
    <Box ref={myRef} sx={style.root}>
      <Swiper
        {...configurations(size)}
        onTransitionStart={onBeforeTransition}
        onTransitionEnd={onAfterTransition}
        onSlideChange={onSlideChange}
        onSwiper={setPageSwiper}
      >
        {children}
      </Swiper>
    </Box>
  );
};
export default HomeSlider;
