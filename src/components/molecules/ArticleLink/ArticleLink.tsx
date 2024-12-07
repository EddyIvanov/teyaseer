import { Button, Flex } from '@chakra-ui/react';

import style from './ArticleLink.styled';
import ArticleLinkProps from './ArticleLink.type';

import { Icon } from '@/components';

const ArticleLink = (props: ArticleLinkProps) => {
  const { title, description, button, articlePdf } = props;
  return (
    <Flex __css={style.root}>
      <p className="al-title">{title || ''}</p>
      {description ? <p className="al-description">{description}</p> : <></>}
      {button ? (
        <Button
          as="a"
          href={articlePdf?.fields.file.url ?? button.fields.href}
          target={button.fields.target ?? '_blank'}
          variant="primary"
          className="al-link"
          rightIcon={
            button.fields.iconName ? (
              <Icon
                width={'18px'}
                height={'18px'}
                className="al-icon"
                name={button.fields.iconName}
              />
            ) : undefined
          }
        >
          {button.fields.label}
        </Button>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default ArticleLink;
