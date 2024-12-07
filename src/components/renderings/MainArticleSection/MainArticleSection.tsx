import { MainArticleSectionProps } from './MainArticleSection.type';

import { MainArticle } from '@/components';

const MainArticleSection = ({
  backgroundImage,
  description,
  mainTitle,
  displayLinkAs,
  fullScreen,
  swapImagePosition,
  isPageFirstSection,
  id,
}: MainArticleSectionProps) => (
  <MainArticle
    backgroundImg={backgroundImage}
    title={mainTitle}
    description={description}
    displayLinkAs={displayLinkAs}
    variant={swapImagePosition ? 'swapImage' : 'normalImage'}
    size={fullScreen ? 'fullScreen' : 'fixedHeight'}
    id={id}
    isPageFirstSection={isPageFirstSection}
  />
);

export default MainArticleSection;
