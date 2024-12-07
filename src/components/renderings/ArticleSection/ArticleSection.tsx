import { useMultiStyleConfig } from '@chakra-ui/react';

import { ArticleSectionProps } from './ArticleSection.type';

import { Article, ContentfulRichText, Image } from '@/components';

const ArticleSection = (props: ArticleSectionProps) => {
  const { backgroundImage, description, mainTitle, showLinksAsButtons, id } =
    props;
  const style = useMultiStyleConfig('ArticleSection', {});

  const backgroundImageNode = (
    <Image
      src={backgroundImage?.fields.file.url || ''}
      alt={backgroundImage?.fields.title || ''}
      className="backgroundImage"
      fill
    />
  );

  const titleNode = (
    <ContentfulRichText
      document={mainTitle}
      className="articleSectionRichHeader"
    />
  );

  const descriptionNode = (
    <>
      <ContentfulRichText
        document={description}
        linkAsButton={showLinksAsButtons}
      />
    </>
  );

  return (
    <Article
      style={style}
      backgroundImageNode={backgroundImageNode}
      titleNode={titleNode}
      descriptionNode={descriptionNode}
      id={id}
    />
  );
};
export default ArticleSection;
