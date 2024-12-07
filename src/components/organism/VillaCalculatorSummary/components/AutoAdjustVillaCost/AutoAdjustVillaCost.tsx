import React from 'react';

import {
  Box,
  Divider,
  Grid,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCalculator } from 'teyaseer-calculator-engine';
import { TRecommendationsType } from 'teyaseer-calculator-engine/dist/cjs/autoAdjust/checkRecommendations';

import ConfirmModal from '../../../../molecules/ConfirmModal';

import { Icon } from '@/components';
import { IconNames } from '@/components/atoms/Icon/Icon';
import { EstimateTotalLoggedOut } from '@/components/organism/VillaCalculatorSummary/components/EstimateTotalLoggedOut/EstimateTotalLoggedOut';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';
import FontWeights from '@/styles/themes/brand/fontWeights';

const iconsMap: { [key: string]: IconNames } = {
  office: 'office',
  swimmingpool: 'swimmingpool',
  elevator: 'elevator',
  gym: 'gym',
  cinema: 'cinema',
  bedroom: 'bedroom',
  majlis: 'majlis',
  ['living room']: 'livingRom',
  kitchen: 'kitchen',
  maid: 'maid',
  driver: 'driver',
  storage: 'openBox',
  pantry: 'pantry',
  ['dining room']: 'diningArea',
  ['guest room']: 'guestRoom',
};

const renderValue = (
  data: TRecommendationsType,
  t: (key: string) => string,
  selectedLevel?: string | null
) => {
  if (data?.type === 'message') {
    return (
      <VStack gap={{ base: '12px' }} width={'100%'}>
        <Text>{t(data?.value)}</Text>
        <Divider
          orientation="horizontal"
          color={colors.backgroundGrey}
          mt={4}
        />
      </VStack>
    );
  }

  if (data?.type === 'removeExtraRooms') {
    return (
      <VStack gap={{ base: '24px' }} w={'100%'}>
        <Text fontWeight={FontWeights.bold}>
          {t('we_suggest_removing_them')}
        </Text>
        <Box w={'100%'}>
          {data.value.map(({ title, value }, index) => (
            <HStack key={index} mt={'16px'}>
              <>
                {value && (
                  <Icon name={iconsMap[value.split(' ').join('')] || ''} />
                )}
              </>
              <Box>
                <Text>{title || ''}</Text>
              </Box>
            </HStack>
          ))}
        </Box>

        <Divider
          orientation="horizontal"
          color={colors.backgroundGrey}
          mt={4}
        />
      </VStack>
    );
  }

  if (data?.type === 'updateRoomSize') {
    return (
      <Grid
        width="100%"
        gridTemplateColumns={{ base: '1fr 102px 102px', md: '1fr 150px 150px' }}
        gap="16px"
        sx={{ whiteSpace: 'nowrap' }}
      >
        <Box></Box>
        <Box>
          <Text>{t('portal_summary_adjustment_room_size')}</Text>
        </Box>
        <Box>
          <Text>{t('portal_summary_adjustment_adjusted_size')}</Text>
        </Box>
        {data.value.map(
          (
            {
              title,
              roomIndex,
              width,
              length,
              minWidth,
              minLength,
              questionName,
            },
            index
          ) => (
            <>
              <HStack key={index}>
                <Icon name={iconsMap[questionName.toLowerCase() || '']} />
                <Text> {`${title} ${roomIndex + 1}`}</Text>
              </HStack>
              <Box>
                <Text>{`${width}m x ${length}m`}</Text>
              </Box>
              <Box>
                <Text>{`${minWidth}m x ${minLength}m`}</Text>
              </Box>
            </>
          )
        )}
      </Grid>
    );
  }

  if (data?.type === 'changeLevelOfFinishing') {
    return (
      <SimpleGrid columns={{ base: 1, md: 2 }} w={'100%'} gap={'16px'}>
        <VStack
          justifyContent={{ base: 'flex-start', md: 'center' }}
          alignItems={{ base: 'center', md: 'flex-start' }}
          w={'100%'}
        >
          <Text fontWeight={FontWeights.bold}>
            {t('portal_summary_adjustment_level_of_finishing')}
          </Text>
        </VStack>
        <Box>
          <SimpleGrid columns={2}>
            <VStack alignItems={{ base: 'center', md: 'flex-start' }}>
              <Text fontWeight={FontWeights.bold}>
                {t('suggested_level_of_finishing')}
              </Text>
              <Text textTransform={'capitalize'}>
                {data.value?.value || ''}
              </Text>
            </VStack>
            <VStack alignItems={{ base: 'center', md: 'flex-start' }}>
              <Text fontWeight={FontWeights.bold}>
                {t('selected_level_of_finishing')}
              </Text>
              <Text textTransform={'capitalize'}>{selectedLevel || ''}</Text>
            </VStack>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    );
  }

  return null;
};

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AutoAdjustVillaCost = ({ isOpen, onClose }: TProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    recommendations,
    costByLevelOfFinishing,
    selectedLevel,
    applyRecommendation,
    status,
  } = useCalculator();

  const ctaHandler = async () => {
    if (recommendations?.type === 'message') {
      return router.push(
        '/dashboard/services/villa-configurator?backFromSummary=true'
      );
    }

    applyRecommendation();
    onClose();
  };

  const cancelHandler = () => {
    onClose();
  };

  const costBreakDown =
    recommendations?.type !== 'message'
      ? recommendations?.costByFinishing
      : costByLevelOfFinishing;

  return (
    <ConfirmModal
      isOpen={isOpen}
      onCancel={cancelHandler}
      onConfirm={ctaHandler}
      title={t('portal_summary_adjustment_details')}
      confirmText={t(
        recommendations?.type === 'message'
          ? 'portal_summary_adjustment_room_update_CTA'
          : 'portal_summary_adjustment_apply'
      )}
      isLoading={status.saveStatus.isLoading}
    >
      <VStack
        w={'100%'}
        px={{ base: 2, md: 12 }}
        gap={{
          base: '48px',
        }}
      >
        {renderValue(recommendations, t, selectedLevel?.value)}

        {recommendations?.type !== 'message' && (
          <Box w={'100%'} mb={'24px'}>
            <EstimateTotalLoggedOut {...{ ...costBreakDown, selectedLevel }} />
          </Box>
        )}
      </VStack>
    </ConfirmModal>
  );
};
