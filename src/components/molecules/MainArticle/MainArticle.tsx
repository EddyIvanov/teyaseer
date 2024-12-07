import React, { useRef } from 'react';

import {
  Box,
  Flex,
  Hide,
  useMediaQuery,
  useMultiStyleConfig,
} from '@chakra-ui/react';

import { MainArticleProps } from './MainArticle.type';

import { Container, ContentfulRichText, Image, Section } from '@/components';
import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';
import { animationStyle } from '@/helpers/utils';
import useInViewport from '@/hooks/useInVewport';
import breakpoints from '@/styles/themes/brand/breakpoints';

const MainArticle = ({
  style,
  backgroundImg,
  title,
  titlePosition,
  subtitle,
  description,
  displayLinkAs,
  size,
  variant,
  height = 780,
  descriptionPosition = 'Bottom',
  children,
  panelWidth,
  hasAnimation = true,
  LogoComponent,
  id,
  isPageFirstSection,
  lazy = undefined,
  isLoading,
  ...rest
}: MainArticleProps) => {
  const styles = useMultiStyleConfig('MainArticle', {
    size,
    variant,
    height,
    descriptionPosition,
    panelWidth,
    titlePosition,
  });

  const sectionRef = useRef(null);
  const isInview = hasAnimation ? useInViewport(sectionRef) : true;
  const isSmallerThan1024 = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  return (
    <Section
      ref={sectionRef}
      sx={{ ...styles.root, ...style }}
      id={id}
      {...rest}
    >
      {isLoading ? (
        <CenteredLoader variant="mainArticleSkeleton" />
      ) : (
        <Flex data-swiper-parallax-duration={500} __css={styles.wrapper}>
          {backgroundImg && (
            <Box
              // position={'absolute'}
              // height={'100%'}
              className="imageWrapper"
              width={'100%'}
              sx={animationStyle({
                type: 'blur',
                perform: isInview,
              })}
            >
              <Image
                loaderOpt={
                  size === 'fixedHeight'
                    ? { h: height }
                    : isSmallerThan1024
                    ? { w: 1728 }
                    : undefined
                }
                src={backgroundImg?.fields?.file?.url || ''}
                alt={backgroundImg?.fields.title || ''}
                className="backgroundImage"
                fill
                priority={isPageFirstSection ? true : undefined}
                loading={!isPageFirstSection ? lazy : undefined}
              />
            </Box>
          )}
          <Container
            sx={{
              // h: '100%',
              position: 'relative',
            }}
            className="contentContainer"
          >
            <Flex __css={styles.innerContainer}>
              <Flex
                data-animation={isInview ? 'slideIn' : 'slideOut'}
                display={{ base: 'none', lg: 'flex' }}
                __css={styles.mainTitle}
              >
                {title && (
                  <ContentfulRichText document={title} variant="unstyled" />
                )}
                {subtitle && subtitle}
              </Flex>

              {LogoComponent && (
                <Box __css={styles.smallLogo}>{LogoComponent}</Box>
              )}
              <Flex __css={styles.contentWrapper}>
                <Flex
                  __css={styles.contentHtml}
                  className="contentHtml scrollbar"
                >
                  <Flex __css={styles.contentInnerContainer}>
                    <Hide above="lg">
                      {(title || subtitle) && (
                        <Flex
                          data-animation={isInview ? 'slideIn' : 'slideOut'}
                          __css={styles.mainTitle}
                          sx={animationStyle({
                            type: 'slideLeft',
                            perform: isInview,
                          })}
                        >
                          {title && (
                            <ContentfulRichText
                              document={title}
                              variant="unstyled"
                            />
                          )}
                          {subtitle && subtitle}
                        </Flex>
                      )}
                    </Hide>
                    {description && (
                      <Box
                        sx={animationStyle({
                          type: 'slideRight',
                          perform: isInview,
                        })}
                      >
                        <ContentfulRichText
                          document={description}
                          hyperlinkType={displayLinkAs?.fields?.type}
                        />
                      </Box>
                    )}
                    {children}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Flex>
      )}
    </Section>
  );
};

export default MainArticle;
