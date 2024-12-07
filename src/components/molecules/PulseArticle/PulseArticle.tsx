import { Box, Flex } from '@chakra-ui/react';

import pulseArticleStyle from './PulseArticle.style';
import PulseArticleProps from './PulseArticle.type';

import { Section, Image } from '@/components';

const PulseArticle = ({
  style,
  backgroundImage,
  backButtonNode,
  children,
}: PulseArticleProps) => {
  const combinedStyles = { ...pulseArticleStyle.root, ...style };

  return (
    <Section
      __css={{ ...pulseArticleStyle.root, ...combinedStyles }}
      sx={{ height: 'fit-content', overflow: 'unset' }}
    >
      {backgroundImage && (
        <Box __css={pulseArticleStyle.image}>
          <Flex __css={pulseArticleStyle.imageInnerContainer}>
            <Image
              src={backgroundImage.fields.file.url || ''}
              alt={backgroundImage.fields.title || ''}
              fill
            />
          </Flex>
        </Box>
      )}
      <Box __css={pulseArticleStyle.bottomContent}>
        {backButtonNode && (
          <Flex __css={pulseArticleStyle.mainTitle}>{backButtonNode}</Flex>
        )}
        {children && (
          <Flex __css={pulseArticleStyle.articleDescriptionBox}>
            {children}
          </Flex>
        )}
      </Box>
    </Section>
  );
};

export default PulseArticle;
