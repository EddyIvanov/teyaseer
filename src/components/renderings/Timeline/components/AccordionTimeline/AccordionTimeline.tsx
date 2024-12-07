import { useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  chakra,
} from '@chakra-ui/react';

import style from './AccordionTimeline.style';
import { TimelineProps } from '../../Timeline.type';

import { ContentfulRichText, Icon, MainArticle } from '@/components';

const ChakraMainArticle = chakra(MainArticle);

const AccordionTimeline = ({ stages, id }: TimelineProps) => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  return (
    <>
      <ChakraMainArticle
        backgroundImg={stages[selectedCategoryIdx]?.fields.background}
        subtitle={
          <>
            <Box as="p" pb="6px">
              {stages[selectedCategoryIdx]?.fields.subtitle}
            </Box>
            <h1>{stages[selectedCategoryIdx]?.fields.title}</h1>
          </>
        }
        variant={'normalImage'}
        id={id}
        __css={style.root}
      >
        <Accordion
          variant="noOutline"
          pt={'10px'}
          onChange={idx => setSelectedCategoryIdx(idx as number)}
          index={[selectedCategoryIdx]}
          sx={style.accordion}
        >
          {stages &&
            stages.map((stage, index) => (
              <AccordionItem
                key={stage.fields.title}
                sx={
                  selectedCategoryIdx === index
                    ? style.accordionItemSelected
                    : undefined
                }
              >
                <AccordionButton gap={8}>
                  {stage.fields.stepIcon && selectedCategoryIdx === index && (
                    <Box sx={style.icon}>
                      <Icon name={stage.fields.stepIcon} w="32px" h="32px" />
                    </Box>
                  )}
                  {stage.fields.stepIcon && selectedCategoryIdx !== index && (
                    <Box sx={style.pulse} className="pulse"></Box>
                  )}
                  <Box as="div" flex="1" className="accordion-title">
                    {stage.fields.stepSubtitle &&
                      selectedCategoryIdx === index && (
                        <Text sx={style.stepSubtitle}>
                          {stage.fields.stepSubtitle}
                        </Text>
                      )}
                    {stage.fields.stepTitle && (
                      <Text sx={style.stepTitle}>{stage.fields.stepTitle}</Text>
                    )}
                  </Box>
                </AccordionButton>
                <AccordionPanel>
                  {stage.fields.description && (
                    <ContentfulRichText
                      className="accordionTimelineDescription"
                      document={stage.fields.description}
                      hyperlinkType="SecondaryButton"
                    />
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </ChakraMainArticle>
    </>
  );
};
export default AccordionTimeline;
