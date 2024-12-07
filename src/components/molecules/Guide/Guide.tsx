import React, { useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
} from '@chakra-ui/react';

import { ContentfulRichText } from '@/components';
import style from '@/components/molecules/Guide/Guide.style';
import { useGuide } from '@/components/molecules/WithGuide/useGuide';
import CenteredLoader from '@/components/organism/dashboard/CenteredLoader/CenteredLoader';

type TProps = {
  guideId: string;
};

export const Guide = ({ guideId }: TProps) => {
  const { guideData, loading } = useGuide(guideId);

  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  const onAccordionChange = (id: number) => {
    setSelectedCategoryIdx(id);
  };
  if (!loading && !guideData) return null;

  return (
    <Box w={'100%'}>
      <Card sx={style.card}>
        <CardHeader>
          <Text fontSize={'xMedium'} fontWeight={'bold'}>
            {guideData?.title}
          </Text>
        </CardHeader>
        <CardBody>
          {loading ? (
            <CenteredLoader variant="guideSkeleton" />
          ) : (
            <Accordion
              onChange={onAccordionChange}
              index={[selectedCategoryIdx]}
              sx={style.accordion}
              allowToggle
            >
              <Accordion allowToggle variant="outline">
                {guideData &&
                  guideData.guideItems.map(article => (
                    <AccordionItem key={article.sys.id}>
                      <AccordionButton gap={5} fontWeight={'500'}>
                        <Text fontSize={'small'} flex="1" color={'#667080'}>
                          {article.fields?.title}
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel sx={{ ...style }}>
                        <ContentfulRichText
                          variant={'accordion'}
                          document={article.fields?.content}
                        />
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
              </Accordion>
            </Accordion>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};
