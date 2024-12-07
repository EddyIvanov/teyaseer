import { useEffect } from 'react';

import { Flex, Stack, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { useSwiper } from 'swiper/react';

import { useCarouselContext } from '@/components/layouts/VillaCalculatorLayout/VillaCalclulatorLayoutContext';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

type TProps = {
  title: string;
  index: number;
  value: string | number;
  isActive?: boolean;
  activeSliderIndex: number;
  slidesPerView: number;
  type: 'option' | 'value';
};

const CarouselItem = ({
  title = '',
  value,
  isActive,
  index,
  activeSliderIndex,
  slidesPerView,
  type,
}: TProps) => {
  const { t } = useTranslation();
  const swiper = useSwiper();

  const style = useMultiStyleConfig('CarouselItem', { isActive });

  const { handleScroll } = useCarouselContext();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TS error from swiper lib
    const visibleSlides = swiper.visibleSlidesIndexes;
    if (visibleSlides) {
      const [first] = visibleSlides;
      const last = visibleSlides[visibleSlides.length - 1];

      if (activeSliderIndex > last) {
        swiper.slideTo(last);
      }

      if (activeSliderIndex < first) {
        swiper.slideTo(first - slidesPerView);
      }
    }
  }, [activeSliderIndex]);

  const renderValue = () => {
    if (!value) return `0 ${t('selected')}`;
    if (type === 'option') {
      return value;
    }
    if (type === 'value') {
      return `${value} `;
    }
    return `0 ${t('selected')}`;
  };

  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      textAlign={'center'}
      __css={{
        ...style.root,
        ...(index === 0 && {
          borderLeft: `1px solid ${colors.border}`,
        }),
      }}
      onClick={() => handleScroll(index)}
    >
      <Stack
        sx={{
          textAlign: 'start',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Flex alignItems={'center'}>
          <Text
            variant="semiTransparent"
            sx={{
              fontSize: { base: '8px', sm: '12px', md: 'normal' },
            }}
            textAlign={'center'}
          >
            {title}:
          </Text>
        </Flex>
        <Text
          fontSize={{ base: 'xSmall', md: 'normal' }}
          fontWeight={'semibold'}
          textTransform={'capitalize'}
          whiteSpace={'nowrap'}
          // mb={{ base: '20px', md: '25px', lg: '41px' }}
          maxWidth={'125px'}
          isTruncated
        >
          {renderValue()}
        </Text>
      </Stack>
    </Flex>
  );
};
export default CarouselItem;
