import React from 'react';

import { Box, HStack, StackDivider } from '@chakra-ui/react';

import style from './SummarySliderItem.style';

import { Icon, Text } from '@/components';
import { contentfulOptimizedImage } from '@/components/atoms/Image/utils';
import { TVillaRecommendItem } from '@/components/organism/VillaCalculatorSummary/villaSummary.types';

export const SummarySliderItem = ({
  title,
  bedroomText,
  bedroomIconName,
  expandedRoomsText,
  expandedRoomsIconName,
  bgSrc,
  isRecomend = true,
}: TVillaRecommendItem) => {
  return (
    <HStack
      sx={{
        ...style.mainContainer,
        backgroundImage: `url(${contentfulOptimizedImage(bgSrc)})`,
      }}
    >
      <Box>
        {isRecomend && <Text sx={style.heading}>{title}</Text>}
        {expandedRoomsText &&
          expandedRoomsIconName &&
          bedroomIconName &&
          bedroomText && (
            <HStack
              __css={style.summaryDetailsContainer}
              divider={<StackDivider borderColor="white.100" />}
            >
              <HStack>
                <Icon
                  name={bedroomIconName}
                  sx={{
                    ...style.villaIcon,
                    path: {
                      stroke: 'white',
                    },
                  }}
                />
                <Text sx={style.summaryDetails}>{bedroomText}</Text>
              </HStack>
              <HStack>
                <Icon
                  name={expandedRoomsIconName}
                  sx={{
                    ...style.villaIcon,
                    path: {
                      stroke: 'white',
                    },
                  }}
                />
                <Text sx={style.summaryDetails}>{expandedRoomsText}</Text>
              </HStack>
            </HStack>
          )}
      </Box>
    </HStack>
  );
};
