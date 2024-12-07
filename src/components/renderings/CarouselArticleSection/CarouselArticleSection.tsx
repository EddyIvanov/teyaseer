import { useContext, useState } from 'react';

import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import SwiperCore from 'swiper';

import {
  CarouselArticleSectionProps,
  CarouselArticleSectionSlide,
} from './CarouselArticleSection.type';

import { Carousel, ContentfulRichText, Icon, MainArticle } from '@/components';
import { Context } from '@/providers/MainContext';

const CarouselArticleSection = (props: CarouselArticleSectionProps) => {
  const { slides: carouselArticleSectionSlides, title, id } = props;
  const { locale } = useContext(Context);
  const style = useMultiStyleConfig('CarouselArticleSection', {});
  const [swiper, setSwiper] = useState<SwiperCore>();
  const iconBtnSize = useBreakpointValue(
    {
      base: {
        width: '48px',
        height: '48px',
        iconWidth: '24px',
        iconHeight: '24px',
      },
      lg: {
        width: '70px',
        height: '70px',
        iconWidth: '42px',
        iconHeight: '42px',
      },
    },
    {
      fallback: 'lg',
    }
  );

  const swiperActionBtnsNode = (
    <Flex
      sx={{
        mt: {
          base: '24px',
          md: '32px',
          lg: '32px',
          xl: '40px',
          '2xl': '49.92px',
        },
        gap: {
          base: '16.96px',
          md: '24px',
        },
      }}
      className="swiperActionBtns"
      id={id}
    >
      <IconButton
        variant="secondary"
        aria-label="swiper-prev-btn"
        width={iconBtnSize?.width}
        height={iconBtnSize?.height}
        icon={
          <Icon
            name="arrowLeft"
            width={iconBtnSize?.iconWidth}
            height={iconBtnSize?.iconHeight}
          />
        }
        onClick={() => swiper?.slidePrev()}
      />
      <IconButton
        variant="secondary"
        aria-label="swiper-next-btn"
        width={iconBtnSize?.width}
        height={iconBtnSize?.height}
        icon={
          <Icon
            name="arrowRight"
            width={iconBtnSize?.iconWidth}
            height={iconBtnSize?.iconHeight}
          />
        }
        onClick={() => swiper?.slideNext()}
      />
    </Flex>
  );
  const getDescriptionNode = (slide: CarouselArticleSectionSlide) => {
    return (
      <Box data-swiper-parallax={'-10%'} data-swiper-parallax-opacity={0.5}>
        <ContentfulRichText document={slide.fields.description} />
      </Box>
    );
  };

  return (
    <Box
      sx={style.root}
      as={Carousel}
      isPaginate={false}
      delay={15000}
      speed={1500}
      autoplay={true}
      loop={true}
      key={locale}
      parallax={true}
      effect="fade"
      onSwiper={setSwiper}
    >
      {carouselArticleSectionSlides.map(carouselSlide => {
        // Check if both backgroundImage and description fields are present
        if (
          carouselSlide?.fields?.backgroundImage &&
          carouselSlide?.fields?.description
        ) {
          return (
            <MainArticle
              key={carouselSlide.sys.id}
              style={style}
              backgroundImg={carouselSlide.fields.backgroundImage}
              title={title}
              hasAnimation={false}
            >
              {getDescriptionNode(carouselSlide)}
              {swiperActionBtnsNode}
            </MainArticle>
          );
        }
      })}
    </Box>
  );
};
export default CarouselArticleSection;
