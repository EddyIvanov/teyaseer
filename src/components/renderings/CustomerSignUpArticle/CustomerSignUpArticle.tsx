import React from 'react';

import { Box, useMediaQuery } from '@chakra-ui/react';

import style from './CustomerSignUpArticle.style';
import Subtitle from './components/Subtitle';
import { MainArticleSectionProps } from '../MainArticleSection/MainArticleSection.type';

import { MainArticle } from '@/components';

const CustomerSignUpArticle = ({
  backgroundImage,
  description,
  mainTitle,
  mainTitlePosition,
  displayLinkAs,
  fullScreen,
  swapImagePosition,
  id,
}: MainArticleSectionProps) => {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  return (
    <MainArticle
      style={{ style }}
      backgroundImg={backgroundImage}
      title={mainTitle}
      titlePosition={mainTitlePosition}
      description={description}
      displayLinkAs={displayLinkAs}
      variant={swapImagePosition ? 'swapImage' : 'normalImage'}
      size={fullScreen ? 'fullScreen' : 'fixedHeight'}
      id={id}
      subtitle={
        isLargerThan1024 ? <Subtitle buttonVariant="solid" /> : undefined
      }
    >
      <>
        {!isLargerThan1024 && (
          <Box __css={style.root}>
            <Subtitle buttonVariant="primary" />
          </Box>
        )}
      </>
    </MainArticle>
  );
};
export default CustomerSignUpArticle;
