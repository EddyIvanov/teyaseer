import React from 'react';

import { Box, Grid, VStack } from '@chakra-ui/react';

import styles from './RoomConfig.styled';

import { Image, Text } from '@/components';
import { AdjustButton } from '@/components/atoms/AdjustButton';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  payload: { width: number; length: number };
  index: number;
  onChange: ({ width, length }: { width: number; length: number }) => void;
  questionName: string | null;
};

export const RoomConfig = ({
  index,
  payload,
  onChange,
  questionName,
}: TProps) => {
  const { width, length } = payload;
  const { t } = useTranslation();
  const style = styles;

  return (
    <VStack spacing={4} maxWidth="385px">
      <Text
        fontSize={{ base: '20px', md: '' }}
        alignSelf={'start'}
        textTransform={'capitalize'}
      >
        {questionName ? questionName : t('room')} {index + 1}
      </Text>
      <Grid templateColumns="auto auto" justifyContent="space-between" gap={4}>
        <Image
          lazyLoadTheme={'light'}
          src={'/tmp/bedroom/1.png'}
          alt={'bedroom config'}
          width={123}
          height={105}
        />

        <Box>
          <Grid
            templateColumns="60px 30px 1fr 30px"
            gap={8}
            alignItems={'center'}
          >
            <Text justifySelf={'end'} textTransform="capitalize">
              {t('width')}
            </Text>
            <AdjustButton
              variant="minus"
              onClick={() => onChange({ ...payload, width: width - 1 })}
            />
            <Text sx={style.middleValue}>
              {width}
              {t('meter')}
            </Text>
            <AdjustButton
              variant="plus"
              onClick={() => onChange({ ...payload, width: width + 1 })}
            />
          </Grid>
          <Grid templateColumns="60px 30px 40px 30px" gap={8} mt={4}>
            <Text justifySelf={'end'} textTransform="capitalize">
              {t('length')}
            </Text>
            <AdjustButton
              variant="minus"
              onClick={() => onChange({ ...payload, length: length - 1 })}
            />
            <Text sx={style.middleValue}>
              {length}
              {t('meter')}
            </Text>
            <AdjustButton
              variant="plus"
              onClick={() => onChange({ ...payload, length: length + 1 })}
            />
          </Grid>
        </Box>
      </Grid>
    </VStack>
  );
};
