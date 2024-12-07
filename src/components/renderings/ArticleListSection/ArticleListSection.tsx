import { Flex } from '@chakra-ui/react';

import style from './ArticleListSection.styled';
import { ArticleListectionProps } from './ArticleListSection.type';

import { Image, Section, Container } from '@/components';
import ArticleLink from '@/components/molecules/ArticleLink';

const ArticleListSection = (props: ArticleListectionProps) => {
  const { image, title, listOfLinks, id } = props;
  const customStyle = style();

  return (
    <Section sx={{ height: 'auto' }} id={id}>
      <Container>
        <Flex __css={customStyle.root}>
          <h2 className="section-title">{title || ''}</h2>
          {image ? (
            <div className="section-image-container">
              <Image
                src={image.fields.file.url || ''}
                alt={image.fields.title || ''}
                className="section-image"
                fill
              />
            </div>
          ) : (
            <></>
          )}
          <Flex className="section-link-list">
            {listOfLinks?.length ? (
              listOfLinks.map(({ fields: link }, index) => (
                <ArticleLink key={`${title}-${index}`} {...link} />
              ))
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};
export default ArticleListSection;
