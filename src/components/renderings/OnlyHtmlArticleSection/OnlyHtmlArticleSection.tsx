import { useMultiStyleConfig } from '@chakra-ui/react';

import { ArticleSectionProps } from './OnlyHtmlArticleSection.type';

import { ContentfulRichText, Image, OnlyHtmlArticle } from '@/components';

const OnlyHtmlArticleSection = (props: ArticleSectionProps) => {
  const { backgroundImage, description, showLinksAsButtons, id } = props;
  const style = useMultiStyleConfig('ArticleSection', {});

  const backgroundImageNode = (
    <Image
      src={backgroundImage?.fields.file.url || ''}
      alt={backgroundImage?.fields.title || ''}
      className="backgroundImage"
      fill
    />
  );

  const descriptionNode = (
    <>
      <ContentfulRichText
        linkAsButton={showLinksAsButtons}
        document={description}
      />
    </>
  );

  return (
    <OnlyHtmlArticle
      style={style}
      backgroundImageNode={backgroundImageNode}
      titleNode={<></>}
      descriptionNode={descriptionNode}
      id={id}
    />
  );
};
export default OnlyHtmlArticleSection;
