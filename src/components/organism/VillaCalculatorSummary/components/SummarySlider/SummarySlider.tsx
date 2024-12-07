import React from 'react';

import { Box } from '@chakra-ui/react';

import { Carousel } from '@/components';
import { SummarySliderItem } from '@/components/organism/VillaCalculatorSummary/components/SummarySlider/SummarySliderItem';
import { summarySliderStyles } from '@/components/organism/VillaCalculatorSummary/components/SummarySlider/summarySlider.style';
import { TVillaRecommendItem } from '@/components/organism/VillaCalculatorSummary/villaSummary.types';

type TProps = {
  data: Array<TVillaRecommendItem>;
  delay: number;
  isRecomend?: boolean;
};

export const SummarySlider = ({ data, delay, isRecomend }: TProps) => {
  return (
    <Box __css={summarySliderStyles.root}>
      <Carousel
        sx={summarySliderStyles.carousel}
        effect="fade"
        speed={3500}
        autoplay
        delay={delay}
        carouselVariant="light"
      >
        {data.map((data, i) => (
          <SummarySliderItem key={i} {...data} isRecomend={isRecomend} />
        ))}
      </Carousel>
    </Box>
  );
};
