import React, { ReactNode, useState } from 'react';

import {
  Box,
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderMark,
  SliderProps,
  SliderThumb,
  SliderTrack,
  useMultiStyleConfig,
  VStack,
} from '@chakra-ui/react';

import Text from '../Text';

import { formatNumberWithCommas } from '@/helpers/formatNumberWithCommas';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  children?: ReactNode;
} & SliderProps;

const Slider = ({ children, ...rest }: TProps) => {
  const { t } = useTranslation();
  const styles = useMultiStyleConfig('Slider', {});

  const [sliderValue, setSliderValue] = useState(0);

  return (
    <VStack>
      <ChakraSlider
        sx={styles.slider}
        aria-label="slider-ex-4"
        onChange={val => setSliderValue(val)}
        {...rest}
      >
        <SliderTrack sx={styles.track}>
          <SliderFilledTrack bg="#ADB5BD" />
        </SliderTrack>
        <SliderThumb sx={styles.thumb} boxSize={6}>
          <SliderMark
            value={sliderValue}
            textAlign="center"
            mt={'-8.9rem'}
            ml={'-6.1rem'}
            w={'12.2rem'}
          >
            <Text mb={{ md: 2 }} fontSize={'small'}>
              Your Budget
            </Text>
            <Text fontWeight={'semibold'}>
              {t('aed_currency')} {formatNumberWithCommas(sliderValue)}
            </Text>
          </SliderMark>
          <Box color="tomato" />
        </SliderThumb>
      </ChakraSlider>
      {children && children}
    </VStack>
  );
};

export default Slider;
