import { useRef } from 'react';

import { Box, Flex, Stack } from '@chakra-ui/react';
import { default as NextImage } from 'next/image';

import appDownloadStyle from './AppDownload.styled';
import { AppDownloadProps } from './AppDownload.type';

import TeyaseerMobileAppImage from '@/assets/images/teyaseer-mobile-app.png';
import {
  Container,
  ContentfulRichText,
  Image,
  Link,
  Section,
} from '@/components';
import { animationStyle } from '@/helpers/utils';
import useInViewport from '@/hooks/useInVewport';

const AppDownload = (props: AppDownloadProps) => {
  const {
    mainTitle,
    description,
    backgroundImage,
    id,
    dropdownLists: downloadLinks,
  } = props;

  const sectionRef = useRef(null);
  const isInview = useInViewport(sectionRef);

  return (
    <Section ref={sectionRef} __css={appDownloadStyle.root} id={id}>
      <Image
        src={backgroundImage?.fields.file.url || ''}
        alt="background-image"
        className="backgroundImage"
        fill
      />
      <Container>
        <Box __css={appDownloadStyle.mobileImageWrapper}>
          <NextImage src={TeyaseerMobileAppImage} alt="teyaseer-download-app" />
        </Box>
        <Flex __css={appDownloadStyle.centerTitlesWrapper}>
          <Box sx={animationStyle({ type: 'slideUp', perform: isInview })}>
            <ContentfulRichText
              variant="unstyled"
              document={mainTitle}
              className="title"
            />
          </Box>
          <Box sx={animationStyle({ type: 'slideDown', perform: isInview })}>
            <ContentfulRichText
              variant="unstyled"
              document={description}
              className="subtitle"
            />
          </Box>
          <Stack gap={'10px'}>
            {downloadLinks &&
              downloadLinks.map((link, index) => {
                return (
                  <Flex key={index} placeItems={'flex-start'}>
                    <Link isExternal target="_blank" href={link.fields.href}>
                      <Image
                        unoptimized
                        lazyLoading={false}
                        src={link.fields.icon?.fields.file.url || ''}
                        alt={link.fields.label || ''}
                        style={{
                          maxWidth: '200px',
                        }}
                        width={
                          link.fields.icon?.fields.file.details.image.width || 0
                        }
                        height={
                          link.fields.icon?.fields.file.details.image.height ||
                          0
                        }
                      />
                    </Link>
                  </Flex>
                );
              })}
          </Stack>
        </Flex>
      </Container>
    </Section>
  );
};

export default AppDownload;
