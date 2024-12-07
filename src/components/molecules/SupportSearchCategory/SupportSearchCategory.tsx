import { Fragment } from 'react';

import { Flex, Heading } from '@chakra-ui/react';

import style from './SupportSearchCategory.style';
import { SupportCategory } from './SupportSearchCategory.types';

import { ContentfulRichText } from '@/components';

export default function SupportSearchCategory({
  category,
}: {
  category: SupportCategory;
}) {
  return (
    <Flex direction="column" gap={8} __css={style.root}>
      <Heading as="h2">{category.title}</Heading>
      {category.contentCollection.items.map(content => (
        <Fragment key={content.sys.id}>
          <Heading as="h3" size="lg">
            {content.title}
          </Heading>
          <ContentfulRichText document={content.content.json} />
        </Fragment>
      ))}
    </Flex>
  );
}
