import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import style from './SwiperTimeline.style';
import { SliderItemProps } from '../../Timeline.type';

import { Container, Image, Text } from '@/components';
import breakpoints from '@/styles/themes/brand/breakpoints';
import sizes from '@/styles/themes/brand/sizes';

const SliderItem = (props: SliderItemProps) => {
  const { stage } = props;
  const isSmallerThan1024 = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  return (
    <>
      {stage.fields.background.fields.file?.url && (
        <Image
          className="backgroundImage"
          alt={stage.fields.background.fields?.title}
          src={stage.fields.background.fields.file?.url}
          fill={true}
          loaderOpt={isSmallerThan1024 ? { w: 1728 } : undefined}
        />
      )}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          position: { base: 'absolute', lg: 'unset' },
          top: { base: '90px', lg: 'unset' },
          p: { base: '0', lg: '32px' },
          px: '32px',
        }}
      >
        <Flex
          data-swiper-parallax={'-70%'}
          data-swiper-parallax-opacity={0.5}
          sx={style.main_box}
        >
          <Flex gap="1.6rem" alignItems={'center'}>
            <Text sx={style.mainSubtitle}>{stage.fields.subtitle}</Text>
          </Flex>
          <Text as="h1" sx={style.mainTitle}>
            {stage.fields.title}
          </Text>
        </Flex>
        <Box
          sx={{
            width: sizes.mainArticlePanelWidth,
            display: { base: 'none', lg: 'block' },
          }}
        />
      </Container>
    </>
  );
};

export default SliderItem;
