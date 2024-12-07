import { Flex } from '@chakra-ui/react';

import style from './OnlyHtmlArticle.styled';
import OnlyHtmlArticleProps from './OnlyHtmlArticle.type';

import { Container } from '@/components';

const Article = (props: OnlyHtmlArticleProps) => {
  const { backgroundImageNode, titleNode, descriptionNode, id } = props;
  return (
    <Flex __css={style.articleInnerContainer} id={id}>
      {backgroundImageNode ? <>{backgroundImageNode}</> : ''}
      <Container>
        <Flex __css={style.mainTitle}>{titleNode}</Flex>
        <Flex __css={style.articleDescriptionBox}>
          <Flex __css={style.articleDescriptionBoxContent}>
            <Flex __css={style.articleDescriptionInnerContainer}>
              {descriptionNode ? descriptionNode : ''}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Article;
