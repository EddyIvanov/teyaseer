import mainStyle from './PlainHtmlArticleSection.style';
import { ArticleSectionProps } from '../ArticleSection/ArticleSection.type';

import { Container, ContentfulRichText, Section } from '@/components';

//TODO: generate global ArticleSectionProps
const PlainHtmlArticleSection = ({ description, id }: ArticleSectionProps) => {
  const style = mainStyle();

  return (
    <Section sx={style.root} id={id}>
      <Container>
        <ContentfulRichText document={description} />
      </Container>
    </Section>
  );
};

export default PlainHtmlArticleSection;
