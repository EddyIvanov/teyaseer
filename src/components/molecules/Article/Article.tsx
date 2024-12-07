import { useRef } from 'react';

import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useSwiper } from 'swiper/react';

import articleStyle from './Article.style';
import ArticleProps from './Article.type';

import { Container, Icon, Section } from '@/components';
import { animationStyle } from '@/helpers/utils';
import useInViewport from '@/hooks/useInVewport';

const Article = (props: ArticleProps) => {
  const swiperInstance = useSwiper();
  const { style, backgroundImageNode, titleNode, descriptionNode, id } = props;
  const combinedStyles = { ...articleStyle.root, ...style.root };

  const sectionRef = useRef(null);
  const isInview = useInViewport(sectionRef);

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
    <Flex className="swiperActionBtns" id={id}>
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
        onClick={() => swiperInstance.slidePrev()}
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
        onClick={() => swiperInstance.slideNext()}
      />
    </Flex>
  );
  return (
    <Section
      ref={sectionRef}
      __css={{ ...articleStyle.root, ...combinedStyles }}
    >
      <Flex __css={articleStyle.articleInnerContainer}>
        <Box
          position={'absolute'}
          height={'100%'}
          width={'100%'}
          sx={animationStyle({
            type: 'blur',
            perform: isInview,
          })}
        >
          {backgroundImageNode ? <>{backgroundImageNode}</> : ''}
        </Box>
        <Container>
          <Flex
            sx={animationStyle({
              type: 'slideLeft',
              perform: isInview,
            })}
            __css={articleStyle.mainTitle}
          >
            {titleNode}
          </Flex>
          <Flex __css={articleStyle.articleDescriptionBox}>
            <Flex __css={articleStyle.articleDescriptionBoxContent}>
              <Flex
                sx={animationStyle({
                  type: 'slideRight',
                  perform: isInview,
                })}
                __css={articleStyle.articleDescriptionInnerContainer}
              >
                {descriptionNode ? descriptionNode : ''}
                {swiperInstance ? swiperActionBtnsNode : ''}
              </Flex>
              <Flex __css={articleStyle.iconMouseContainer}>
                <Icon name="mouseBlack" className="mouse" w="30px" h="40px" />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </Section>
  );
};

export default Article;
