import { PropsWithChildren } from 'react';

import { BoxProps } from '@chakra-ui/react';

import { StatisticsSectionProps } from '@/components/renderings/StatisticsSection/StatisticsSection.type';

export interface StatisticsProps
  extends PropsWithChildren,
    Omit<
      StatisticsSectionProps,
      'backgroundImage' | 'contentType' | 'displayName'
    >,
    Omit<BoxProps, 'backgroundImage' | 'textColor' | 'title'> {
  backgroundImage: string;
  id?: string;
}
