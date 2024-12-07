import React, { useContext } from 'react';

import { Flex } from '@chakra-ui/react';

import villaArticleBigStyle from './VillaArticleBig.style';
import { VillaArticleBigProps } from './VillaArticleBig.type';
import VillaShortDetails from '../VillaShortDetails';

import { Carousel, Image, Container, Link } from '@/components';
import { villaUrls } from '@/constants/villaUrls.constant';
import { Context } from '@/providers/MainContext';

const VillaArticleBig = ({
  isScreenSizeMdOrBelow = false,
  villa,
  isMirrored,
  isInsideCustomerPortal = false,
}: VillaArticleBigProps) => {
  // Locale is needed to keep track of language changes and reinitialize the carousel
  const { locale } = useContext(Context);
  const style = villaArticleBigStyle({ isMirrored });

  const villaDetailsHref = isInsideCustomerPortal
    ? `${villaUrls.SERVICES_PRE_DESIGN_VILLAS}${villa.sys.id}`
    : `${villa.fields.learnMore.fields.href}${villa.sys.id}`;

  return (
    <Flex __css={style.root} as="article">
      {/* Villa article big carousel start */}
      <Link href={villaDetailsHref}>
        <Flex className="villaCarouselContainer">
          <Carousel
            delay={15000}
            speed={1500}
            autoplay={true}
            loop={true}
            key={locale}
            parallax={true}
            effect="fade"
            carouselVariant="dark"
          >
            {villa.fields.images &&
              villa.fields.images.map(image => (
                <Image
                  key={image.sys.id}
                  src={image.fields?.file?.url ?? ''}
                  className="villaImage"
                  alt={image.fields.title}
                  data-swiper-parallax-duration={500}
                  sizes="200vw"
                  fill
                  priority
                />
              ))}
          </Carousel>
        </Flex>
      </Link>
      {/* Villa article big carousel end */}

      {/* Villa article big details start */}
      {isScreenSizeMdOrBelow ? (
        <Container>
          <Flex className="villaShortDetailsBigContainer">
            <VillaShortDetails
              title={villa.fields.title}
              specifications={villa.fields.specifications}
              description={villa.fields.shortDescription}
              learnMore={villa.fields.learnMore}
              id={villa.sys.id}
              floorPlanLink={villa.fields.floorPlanLink}
              floorPlanPdf={villa.fields.floorPlanPdf}
              isMirrored={isMirrored}
              isInsideCustomerPortal={isInsideCustomerPortal}
            />
          </Flex>
        </Container>
      ) : (
        <Flex className="villaShortDetailsBigContainer">
          <VillaShortDetails
            title={villa.fields.title}
            specifications={villa.fields.specifications}
            description={villa.fields.shortDescription}
            learnMore={villa.fields.learnMore}
            id={villa.sys.id}
            floorPlanLink={villa.fields.floorPlanLink}
            floorPlanPdf={villa.fields.floorPlanPdf}
            isMirrored={isMirrored}
            isInsideCustomerPortal={isInsideCustomerPortal}
          />
        </Flex>
      )}
      {/* Villa article big details end */}
    </Flex>
  );
};

export default VillaArticleBig;
