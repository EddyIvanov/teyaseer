import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import {
  Box,
  chakra,
  Flex,
  useMultiStyleConfig,
  VStack,
} from '@chakra-ui/react';
import SwiperCore from 'swiper';
import { EffectFade, Keyboard, Mousewheel, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import SliderItem from './SliderItem';
import style from './SwiperTimeline.style';
import { TimelineProps } from '../../Timeline.type';

import {
  Container,
  ContentfulRichText,
  Icon,
  Section,
  Text,
} from '@/components';
import { animationStyle } from '@/helpers/utils';
import useInViewport from '@/hooks/useInVewport';
import 'swiper/css';
import 'swiper/css/effect-fade';

SwiperCore.use([Mousewheel, Keyboard, Parallax]);

const ChakraSwiper = chakra(Swiper);

const SwiperTimeline = ({ stages, id }: TimelineProps) => {
  const mainSwiper = useSwiper();
  const CenterBoxRef = useRef<HTMLDivElement>(null);
  const WrapperBoxRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const isInview = useInViewport(sectionRef);

  useEffect(() => {
    if (!isInview) {
      if (mainSwiper?.activeIndex === 0) {
        swiper?.slideTo(0, 0, false);
        setActiveIndex(0);
      }
    }
    if (swiper && swiper.slides && mainSwiper) {
      if (isInview) {
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        if (swiper.activeIndex === swiper.slides.length - 1) {
          mainSwiper.allowSlideNext = true;
          mainSwiper.allowSlidePrev = false;
        } else if (swiper.activeIndex === 0) {
          mainSwiper.allowSlideNext = false;
          mainSwiper.allowSlidePrev = true;
        } else {
          mainSwiper.allowSlideNext = false;
          mainSwiper.allowSlidePrev = false;
        }
      } else {
        swiper.allowSlideNext = false;
        swiper.allowSlidePrev = false;
        mainSwiper.allowSlideNext = true;
        mainSwiper.allowSlidePrev = true;
      }
    }
  }, [isInview, swiper, mainSwiper]);

  const onSlideTransitionStart = useCallback(() => {
    if (swiper && mainSwiper) {
      mainSwiper.allowSlideNext = false;
      mainSwiper.allowSlidePrev = false;
    }
  }, [swiper, mainSwiper]);

  const onSlideTransitionEnd = useCallback(() => {
    if (swiper && mainSwiper) {
      if (mainSwiper?.activeIndex === 1) {
        if (swiper.activeIndex === 0) {
          mainSwiper.allowSlideNext = false;
          mainSwiper.allowSlidePrev = true;
        } else if (swiper.activeIndex === swiper.slides.length - 1) {
          mainSwiper.allowSlideNext = true;
          mainSwiper.allowSlidePrev = false;
        } else {
          mainSwiper.allowSlideNext = false;
          mainSwiper.allowSlidePrev = false;
        }
      }
    }
  }, [swiper, mainSwiper]);

  const onSlideChange = useCallback(() => {
    setActiveIndex(swiper?.activeIndex || 0);
  }, [swiper, CenterBoxRef, WrapperBoxRef, mainSwiper]);

  const handleChangeSlide = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const index = Number(e.currentTarget.dataset.index);
      swiper?.slideTo(index);
    },
    [swiper, activeIndex]
  );
  const artcleStyle = useMultiStyleConfig('MainArticle', {});

  return (
    <Section
      ref={sectionRef}
      className="swiper-section"
      __css={style.root}
      id={id}
    >
      <ChakraSwiper
        sx={style.swiper}
        modules={[Mousewheel, Keyboard, EffectFade, Parallax]}
        className="mySwiper"
        mousewheel={{
          invert: false,
          eventsTarget: '.swiper-section',
        }}
        allowSlidePrev={false}
        allowSlideNext={false}
        parallax={true}
        keyboard={{
          enabled: true,
          onlyInViewport: false,
        }}
        effect="fade"
        simulateTouch={false}
        nested
        speed={1000}
        direction={'vertical'}
        onSwiper={swiper => setSwiper(swiper)}
        onSlideChange={onSlideChange}
        onSlideChangeTransitionEnd={onSlideTransitionEnd}
        onSlideChangeTransitionStart={onSlideTransitionStart}
      >
        {stages &&
          stages.map((stage, index) => (
            <SwiperSlide key={`mainSlider-${index}`}>
              <SliderItem stage={stage} index={index} />
            </SwiperSlide>
          ))}
      </ChakraSwiper>

      <Box />
      <Container pointerEvents={'none'} sx={style.sidebarContainer}>
        <Flex
          data-swiper-parallax={'-70%'}
          data-swiper-parallax-opacity={0.5}
          sx={{
            display: { base: 'flex', lg: 'none' },
            flexDirection: 'column',
            zIndex: 100,
            position: 'relative',
            flex: 1,
            pt: { base: '25svh', md: '30svh' },
          }}
        >
          <Flex gap="1.6rem" alignItems={'center'}>
            <Text sx={style.mainSubtitle}>
              {stages[activeIndex].fields.subtitle}
            </Text>
          </Flex>
          <Text as="h1" sx={style.mainTitle}>
            {stages[activeIndex].fields.title}
          </Text>
        </Flex>
        <Flex
          __css={artcleStyle.contentWrapper}
          sx={{
            flex: { base: 1, lg: '0.2' },
            minH: '100%',
            display: 'block',
          }}
        >
          <Flex __css={style.sidebarContentHtml}>
            <Flex
              ref={CenterBoxRef}
              display={'block'}
              __css={artcleStyle.contentInnerContainer}
            >
              <Box sx={style.side_box} pointerEvents={'none'}>
                <Box sx={style.sideBoxLine} />

                <Box ref={WrapperBoxRef} sx={style.sideBoxWrapper}>
                  {stages &&
                    stages.map((stage, index) => {
                      if (index < activeIndex) {
                        return <Fragment key={`stageItem-${index}`}></Fragment>;
                      }
                      return (
                        <Flex
                          sx={style.sideBoxItem}
                          __css={animationStyle({
                            type: 'slideRight',
                            duration: `0.8s`,
                            delay: `0.${index + 2}s`,
                            perform: isInview,
                          })}
                          className="sideBoxItem"
                          key={`stageItem-${index}`}
                          data-active={index === activeIndex}
                        >
                          <Box sx={style.pulse} className="pulse">
                            <Icon
                              name={stage.fields.stepIcon}
                              w="40px"
                              h="40px"
                            />
                          </Box>

                          <Flex sx={style.contentWrapper}>
                            <VStack
                              sx={{
                                alignItems: 'flex-start',
                              }}
                            >
                              <Text sx={style.stepSubtitle}>
                                {stage.fields.stepSubtitle}
                              </Text>
                              <Text
                                pointerEvents={'all'}
                                data-index={index}
                                onClick={handleChangeSlide}
                                sx={style.stepTitle}
                              >
                                {stage.fields.stepTitle}
                              </Text>
                            </VStack>
                            <Box sx={style.contentBody} className="contentBody">
                              <ContentfulRichText
                                document={stage.fields.description}
                                hyperlinkType="SecondaryButton"
                                className="timelineStepDescription"
                                linkAsButton
                              />
                            </Box>
                          </Flex>
                        </Flex>
                      );
                    })}
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};

export default SwiperTimeline;
