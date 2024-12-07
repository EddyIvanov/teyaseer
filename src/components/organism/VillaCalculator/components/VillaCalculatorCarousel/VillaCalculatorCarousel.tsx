import { useCalculator } from 'teyaseer-calculator-engine';

import { Carousel } from '@/components';
import CarouselItem from '@/components/molecules/slider/components/CarouselItem/CarouselItem';
import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';

type TProps = {
  activeSliderIndex: number;
  slidesPerView: number;
};

export function VillaCalculatorCarousel({
  activeSliderIndex,
  slidesPerView = 1,
}: TProps) {
  const { data } = useCalculator();

  return (
    <>
      {!data && (
        <CenteredLoader variant="calculatorCarousel" sx={{ h: '100%' }} />
      )}
      {data && (
        <Carousel
          watchSlidesProgress
          isPaginate={false}
          slidesPerView={slidesPerView}
          spaceBetween={0}
          navigation
          carouselVariant="calculator"
          sx={{
            '.swiper': {
              h: '100%',
            },
          }}
        >
          {data.calculatorTabCollection.items.map(
            ({ titleDisplay, selectedValue }, i) => (
              <CarouselItem
                type={selectedValue.type}
                value={selectedValue.selected}
                slidesPerView={slidesPerView}
                key={i}
                activeSliderIndex={activeSliderIndex}
                index={i}
                title={`${titleDisplay}`}
                isActive={activeSliderIndex === i}
              />
            )
          )}
        </Carousel>
      )}
    </>
  );
}
