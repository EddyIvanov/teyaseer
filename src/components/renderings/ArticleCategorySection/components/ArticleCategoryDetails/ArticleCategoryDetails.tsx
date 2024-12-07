import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import { Article } from '../../ArticleCategorySection.type';

import { ContentfulRichText } from '@/components';

const ArticleCategoryDetails = ({ articles }: { articles: Article[] }) => {
  return (
    <Accordion allowToggle variant="outline">
      {articles.map(article => (
        <AccordionItem key={article.sys.id}>
          <AccordionButton gap={5}>
            <Box as="span" flex="1">
              {article.fields?.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ContentfulRichText
              document={article.fields?.content}
              variant={'accordion'}
            />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ArticleCategoryDetails;
