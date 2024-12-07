import React from 'react';

import { Box } from '@chakra-ui/react';

import { Image } from '@/components';
import SwiperSlider from '@/components/atoms/Carousel';

type TProps = {
  images: Array<string>;
};

export const SummaryImageSliderMobile = ({ images }: TProps) => {
  return (
    <SwiperSlider
      slidesPerView={'auto'}
      spaceBetween={30}
      pagination={false}
      sx={{
        '.swiper-slide img': {
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
        '.swiper-slide': {
          width: '80%',
        },
      }}
    >
      {images.map(imgSrc => (
        <Box
          key={imgSrc}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <Image
            lazyLoadTheme={'light'}
            alt={'foo'}
            src={imgSrc}
            width={500}
            height={300}
          />
        </Box>
      ))}
    </SwiperSlider>
  );
};
