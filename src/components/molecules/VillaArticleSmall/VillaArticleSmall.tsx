import React, { useContext } from 'react';

import { Flex } from '@chakra-ui/react';

import style from './VillaArticleSmall.style';
import { VillaArticleSmallProps } from './VillaArticleSmall.type';

import {
  Carousel,
  Container,
  Image,
  VillaShortDetails,
  Link,
} from '@/components';
import { Context } from '@/providers/MainContext';

const VillaArticleSmall = ({
  isScreenSizeMdOrBelow = false,
  villa,
}: VillaArticleSmallProps) => {
  // Locale is needed to keep track of language changes and reinitialize the carousel
  const { locale } = useContext(Context);

  return (
    <Flex __css={style.root} as="article">
      <Link href={`${villa.fields.learnMore.fields.href}${villa.sys.id}`}>
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
            {villa.fields.images.map(image => (
              <Image
                key={image.sys.id}
                src={image.fields?.file?.url ?? ''}
                className="villaImage"
                alt={image.fields.title}
                data-swiper-parallax-duration={500}
                sizes="200vw"
                fill
              />
            ))}
          </Carousel>
        </Flex>
      </Link>

      {isScreenSizeMdOrBelow ? (
        <Container>
          <Flex className="villaShortDetailsSmallContainer">
            <VillaShortDetails
              title={villa.fields.title}
              specifications={villa.fields.specifications}
              description={villa.fields.shortDescription}
              learnMore={villa.fields.learnMore}
              id={villa.sys.id}
              floorPlanLink={villa.fields.floorPlanLink}
              floorPlanPdf={villa.fields.floorPlanPdf}
            />
          </Flex>
        </Container>
      ) : (
        <Flex className="villaShortDetailsSmallContainer">
          <VillaShortDetails
            title={villa.fields.title}
            specifications={villa.fields.specifications}
            description={villa.fields.shortDescription}
            learnMore={villa.fields.learnMore}
            id={villa.sys.id}
            floorPlanLink={villa.fields.floorPlanLink}
            floorPlanPdf={villa.fields.floorPlanPdf}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default VillaArticleSmall;
