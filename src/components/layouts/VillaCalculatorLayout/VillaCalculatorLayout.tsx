import { ReactNode } from 'react';

import { Box, useBreakpointValue } from '@chakra-ui/react';

import styles from './VillaCaclulatorLayout.style';

import { Image } from '@/components';
import { VillaCalculatorCarousel } from '@/components/organism/VillaCalculator/components/VillaCalculatorCarousel/VillaCalculatorCarousel';

type TProps = {
  children: ReactNode;
  activeSliderIndex: number;
  isCalculator?: boolean;
  mainImage?: string;
};

const VillaCalculatorLayout = ({
  children,
  activeSliderIndex,
  isCalculator = false,
  mainImage,
}: TProps) => {
  const style = styles;

  const slidesPerView = useBreakpointValue({
    base: 2,
    sm: 3,
    md: 4,
    lg: 6,
    xl: 7,
    '2xl': 8,
    '4xl': 9,
  });

  return (
    <Box sx={style.calculatorInnerContainer}>
      {isCalculator && (
        <Box sx={style.imageBg}>
          {mainImage && (
            <Image
              alt={'vila calculator'}
              src={mainImage}
              priority
              loaderOpt={{ w: 767, h: 185, fit: 'scale', f: 'bottom' }}
              fill
            />
          )}
        </Box>
      )}

      <Box
        sx={{
          boxShadow: '0px 3px 13px -4px rgba(0,0,0,0.75);',
        }}
        position={'relative'}
        h={{ base: '73px', md: '95px', lg: '128px' }}
      >
        <Box h={'100%'}>
          <VillaCalculatorCarousel
            activeSliderIndex={activeSliderIndex}
            slidesPerView={slidesPerView ?? 9}
          />
        </Box>
      </Box>

      <Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
export default VillaCalculatorLayout;
