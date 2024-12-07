import { useRef } from 'react';

import { Box, Flex, useMultiStyleConfig } from '@chakra-ui/react';

import { TeyaseerArticleSectionProps } from './TeyaseerArticleSection.type';

import { Container, ContentfulRichText, Image, Section } from '@/components';
import { animationStyle } from '@/helpers/utils';
import useInViewport from '@/hooks/useInVewport';

const TeyaseerArticleSection = (props: TeyaseerArticleSectionProps) => {
  const { backgroundImage, mainTitle, description, id } = props;
  const style = useMultiStyleConfig('TeyaseerArticleSection', {});

  const sectionRef = useRef(null);
  const isInview = useInViewport(sectionRef);

  return (
    <Section ref={sectionRef} __css={style.root} id={id}>
      <Box
        position={'absolute'}
        height={'100%'}
        width={'100%'}
        sx={animationStyle({ type: 'blur', perform: isInview })}
      >
        <Image
          src={backgroundImage?.fields.file.url || ''}
          alt="background-image"
          className="background-image"
          fill
        />
      </Box>
      <Container>
        <Flex className="center-box">
          <Box
            sx={animationStyle({
              type: 'slideUp',
              perform: isInview,
            })}
          >
            <ContentfulRichText
              variant="unstyled"
              className="title"
              document={mainTitle}
            />
          </Box>
          <Box
            sx={{
              ...animationStyle({
                type: 'slideDown',
                perform: isInview,
              }),
              pb: '100px',
            }}
          >
            <ContentfulRichText
              variant="unstyled"
              className="action-link"
              document={description}
            />
          </Box>
        </Flex>
      </Container>
    </Section>
  );
};

export default TeyaseerArticleSection;
