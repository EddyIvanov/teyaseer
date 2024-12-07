import { useRef } from 'react';

import { Box, Button, Flex, useMultiStyleConfig } from '@chakra-ui/react';
import Link from 'next/link';

import HeroPageProps from './Hero.type';

import { Container, ContentfulRichText, Image, Section } from '@/components';
import { animationStyle } from '@/helpers/utils';
import useInViewport from '@/hooks/useInVewport';

const Hero = ({
  title,
  background,
  logo,
  authLink,
  displayLinkAs,
  secondaryLogo,
  id,
}: HeroPageProps) => {
  const style = useMultiStyleConfig('Hero', {});

  const sectionRef = useRef(null);
  const isInview = useInViewport(sectionRef);

  return (
    <Section
      ref={sectionRef}
      __css={style.root}
      id={id}
      height={isInview ? '100dvh' : '100svh'}
    >
      {background?.fields.file.url && (
        <Box
          position={'absolute'}
          height={'100%'}
          width={'100%'}
          sx={animationStyle({
            type: 'blur',
            perform: isInview,
          })}
        >
          <Image
            className="background-image"
            alt={background.fields.title}
            src={background.fields.file.url}
            fill={true}
            priority
          />
        </Box>
      )}
      <Container>
        <Box
          as={ContentfulRichText}
          document={title}
          className="title-box"
          variant="unstyled"
          hyperlinkType={displayLinkAs?.fields?.type}
          sx={{
            ...animationStyle({
              type: 'slideUp',
              perform: isInview,
            }),
            willChange: 'transform',
          }}
        />

        <Flex className="lowerBoxWrapper">
          {authLink?.fields && (
            <Button
              sx={{
                ...animationStyle({
                  type: 'slideDown',
                  perform: isInview,
                }),
                willChange: 'transform',
              }}
              as={Link}
              target={authLink.fields.target}
              href={authLink.fields.href}
              variant={'uaePassWhite'}
            >
              {authLink?.fields.label}
            </Button>
          )}
          {logo && (
            <Box
              sx={{
                ...animationStyle({
                  type: 'slideDown',
                  perform: isInview,
                }),
                willChange: 'transform',
              }}
              className="logo"
            >
              {secondaryLogo && (
                <Image
                  className="secondaryLogo"
                  alt={secondaryLogo.fields.title}
                  src={secondaryLogo.fields.file.url}
                  width={secondaryLogo.fields.file.details.image.width}
                  height={secondaryLogo.fields.file.details.image.height}
                  unoptimized
                  lazyLoading={false}
                  priority
                />
              )}

              <Image
                className="verified-logo"
                alt={logo.fields.title}
                src={logo.fields.file.url}
                width={logo.fields.file.details.image.width}
                height={logo.fields.file.details.image.height}
                unoptimized
                lazyLoading={false}
                priority
              />
            </Box>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

export default Hero;
