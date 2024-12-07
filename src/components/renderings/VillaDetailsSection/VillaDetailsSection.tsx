import React, { useContext } from 'react';

import { Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import mainStyle from './VillaDetailsSection.style';
import { VillaDetailsSectionProps } from './VillaDetailsSection.type';

import {
  Carousel,
  Container,
  Icon,
  Image,
  Section,
  VillaDetails,
} from '@/components';
import { Context } from '@/providers/MainContext';

const VillaDetailsSection = (props: VillaDetailsSectionProps) => {
  const router = useRouter();
  // Locale is needed to keep track of language changes and reinitialize the carousel
  const { locale } = useContext(Context);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const style = mainStyle();
  return (
    <Section sx={style.root} id={props.id}>
      <Flex as={isMobile ? Flex : Container} flexDirection="column">
        <Flex as={isMobile ? Container : Flex}>
          <Flex sx={style.headerContainer}>
            {!props.isInsideCustomerPortal ? (
              <Button
                onClick={() => router.back()}
                variant={'link'}
                leftIcon={<Icon name={'arrowBack'} />}
              />
            ) : null}
            <Text as="h1" sx={style.headerTitle}>
              {props.fields.title}
            </Text>
          </Flex>
        </Flex>
        <Flex as="article" sx={style.villaContainer}>
          <Flex className="villaCarouselContainer">
            <Carousel
              delay={15000}
              speed={1500}
              autoplay={true}
              loop={true}
              key={locale}
              parallax={true}
              effect="fade"
              carouselVariant="light"
            >
              {props.fields.images.map((image, index) => (
                <Image
                  key={image.sys.id}
                  src={image.fields.file.url}
                  className="villaImage"
                  alt={image.fields.title}
                  data-swiper-parallax-duration={500}
                  sizes="200vh"
                  fill
                  priority={index === 0}
                />
              ))}
            </Carousel>
          </Flex>
          <VillaDetails
            isMobile={isMobile}
            villaDetails={props}
            isInsideCustomerPortal={props.isInsideCustomerPortal}
          />
        </Flex>
      </Flex>
    </Section>
  );
};

export default VillaDetailsSection;
