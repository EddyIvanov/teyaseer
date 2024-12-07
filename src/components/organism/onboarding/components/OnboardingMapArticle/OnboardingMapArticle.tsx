import React from 'react';

import { Box } from '@chakra-ui/react';

import style from './OnboardingMapArticle.style';
import { OnboardingMapArticleProps } from './OnboardingMapArticle.type';

import { Section } from '@/components';
import { PlotMap } from '@/components/molecules/PlotMap/PlotMap';

const OnboardingMapArticle = ({ children }: OnboardingMapArticleProps) => {
  return (
    <Section sx={style.root}>
      <Box sx={style.titleAndDescription}>{children}</Box>
      <Box sx={style.map}>
        <PlotMap />
      </Box>
    </Section>
  );
};

export default OnboardingMapArticle;
