import { NonEligibleArticleSectionProps } from './NonEligibleArticleSection.type';

import { MainArticle } from '@/components';

const NonEligibleArticleSection = ({
  backgroundImage,
  description,
  mainTitle,
  displayLinkAs,
  fullScreen,
  swapImagePosition,
  id,
}: NonEligibleArticleSectionProps) => (
  <MainArticle
    backgroundImg={backgroundImage}
    title={mainTitle}
    description={description}
    descriptionPosition="Center"
    displayLinkAs={displayLinkAs}
    variant={swapImagePosition ? 'swapImage' : 'normalImage'}
    size={fullScreen ? 'fullScreen' : 'fixedHeight'}
    id={id}
  />
);

export default NonEligibleArticleSection;
