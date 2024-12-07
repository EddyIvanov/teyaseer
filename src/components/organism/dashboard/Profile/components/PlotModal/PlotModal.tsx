import React, { useContext, useEffect, useState } from 'react';

import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import LabelText from './components/LabelText';

import {
  Icon,
  InPageNotification,
  Input,
  Link,
  Loader,
  Modal,
  Text,
} from '@/components';
import { MapDefaults } from '@/components/molecules/Map';
import { PlotMap } from '@/components/molecules/PlotMap/PlotMap';
import { TPlotMap } from '@/components/molecules/PlotMap/PlotMap.types';
import { updateMe } from '@/components/organism/dashboard/Profile/Profile.api';
import { IMeUpdate } from '@/components/organism/dashboard/Profile/Profile.type';
import { TPlotLocation } from '@/components/organism/dashboard/Profile/components/PlotModal/types';
import { addContractorSchema } from '@/components/organism/dashboard/Profile/components/PlotModal/validation';
import { extractPlotNumber } from '@/helpers/extractPlotNumber';
import { printVillaSize } from '@/helpers/printVilaSize';
import { useGetData } from '@/hooks/useGetData';
import { usePostData } from '@/hooks/usePostData';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';
import { getPlotDetailsBySitePlan, updatePlotDetails } from '@/services/users';
import { ApiResponse } from '@/types/response.type';

type PlotFormType = {
  plotId: string;
  communityNumber: string;
};

type TProps = {
  onClose: () => void;
};

const PlotModal = ({ onClose }: TProps) => {
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  const { user, updateUserContext } = useContext(DashboardContext);
  const [markerLocationDetails, setMarkerLocationDetails] = useState<
    TPlotLocation | undefined
  >();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [plotNotFound, setPlotNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    trigger,
    setValue,
    getValues,
    reset,
  } = useForm<PlotFormType>({
    resolver: yupResolver(addContractorSchema),
    mode: 'onChange',
    defaultValues: {
      plotId: '',
      communityNumber: '',
    },
  });
  const hasErrors = Object.keys(errors).length !== 0;

  const { run: updateUserDetails, isLoading: isUpdatingUserDetails } =
    usePostData<{ payload: IMeUpdate }, ApiResponse<unknown>>({
      successMessage: t('update_plot_location_success_message'),
    });

  const {
    fetchData: fetchPlotLocationData,
    data: plotLocationData,
    isLoading: isFetchingPlotLocation,
  } = useGetData<TPlotMap>();

  const {
    fetchData: updatePlotLocationData,
    isLoading: isUpdatingPlotLocation,
  } = useGetData();

  useEffect(() => {
    if (!plotLocationData || !plotLocationData?.attributes) {
      setIsSubmitDisabled(true);
      if (isDirty) {
        setPlotNotFound(true);
      }

      return;
    }

    const {
      LATITUDE: latitude,
      LONGITUDE: longitude,
      ELMS_PLOTID: plotId,
      MUNICIPALITY: municipalityName,
      PLANNEDAREA: plotSize,
      PLOTNUMBER: plotNumber,
      COMMUNITY: communityNumber,
      DISTRICT: district,
    } = plotLocationData.attributes;

    setMarkerLocationDetails({
      latitude,
      longitude,
      plotId,
      municipalityName,
      plotSize,
      plotNumber,
      communityNumber,
      district,
      geometry: plotLocationData.geometry,
    });
    setIsSubmitDisabled(false);
  }, [plotLocationData]);

  useEffect(() => {
    if (!user?.userInfo?.plotInfo) return;

    const {
      plotLatitude,
      plotLongitude,
      id: plotId,
      plotLocation: municipalityName,
      size: plotSize,
      number,
      districtZone: district,
    } = user.userInfo.plotInfo;
    const [communityNumber, plotNumber] = extractPlotNumber(number);

    setMarkerLocationDetails({
      latitude: plotLatitude || MapDefaults.CENTER_LAT,
      longitude: plotLongitude || MapDefaults.CENTER_LNG,
      plotId,
      municipalityName,
      plotSize,
      plotNumber,
      communityNumber,
      district,
    });
  }, [user?.userInfo?.plotInfo]);

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const clearSelectedPlotDetails = () => {
    setMarkerLocationDetails(undefined);
  };

  const findPlotLocation = async () => {
    const plotId = getValues('plotId');
    const communityNumber = getValues('communityNumber');

    if (!plotId || !communityNumber) return;

    fetchPlotLocationData(() =>
      getPlotDetailsBySitePlan(plotId, communityNumber, locale)
    );
    clearSelectedPlotDetails();
  };

  const onSubmit: SubmitHandler<{
    plotId: string;
    communityNumber: string;
  }> = async data => {
    const { plotId, communityNumber } = data;
    if (!markerLocationDetails || !plotId || !communityNumber) return;

    updatePlotLocationData(() =>
      updatePlotDetails(plotId, communityNumber, locale)
    );

    const savePlotDetailsRes = await updateUserDetails(() =>
      updateMe({
        userInfo: {
          plotInfo: {
            plotLatitude: markerLocationDetails.latitude,
            plotLongitude: markerLocationDetails.longitude,
          },
        },
      }).finally(() => {
        updateUserContext();
      })
    );

    if (savePlotDetailsRes) {
      setIsSubmitDisabled(true);
      setTimeout(() => {
        handleCloseModal();
      }, 500);
    }
  };

  const handleClear = async (value: keyof PlotFormType) => {
    setValue(value, '');
    await trigger(value);
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={true}
      onClose={handleCloseModal}
      title={t('update_plot_location')}
      size={'6xl'}
      contentStyle={{
        maxH: { base: '100vh', md: '96vh' },
        overflow: 'auto',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box height={{ base: '300px', md: '320px' }}>
          <PlotMap
            geometry={markerLocationDetails?.geometry}
            geometryLoading={isFetchingPlotLocation}
          />
        </Box>
        <Box mt={{ base: '12', md: '24px' }}>
          <HStack
            spacing={'16px'}
            pb={'16px'}
            alignItems={'flex-start'}
            flexDirection={{ base: 'column', sm: 'row' }}
          >
            <Controller
              name={'communityNumber'}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    isDisabled={isFetchingPlotLocation}
                    onFocus={() => setPlotNotFound(false)}
                    onClearCB={() => handleClear('communityNumber')}
                    onChange={e => {
                      field.onChange(e);
                    }}
                    type={'text'}
                    label={t('portal_plot_community_number')}
                    error={t(
                      (errors?.communityNumber?.message as string) || ''
                    )}
                    id={'communityNumber'}
                    register={register}
                  />
                );
              }}
            />
            <Controller
              name={'plotId'}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    isDisabled={isFetchingPlotLocation}
                    onFocus={() => setPlotNotFound(false)}
                    onClearCB={() => handleClear('plotId')}
                    onChange={e => {
                      field.onChange(e);
                    }}
                    type={'text'}
                    label={t('portal_profile_plot_number')}
                    error={t((errors?.plotId?.message as string) || '')}
                    id={'plotId'}
                    register={register}
                  />
                );
              }}
            />

            <Button
              variant="tertiary"
              onClick={findPlotLocation}
              isLoading={isFetchingPlotLocation}
              flexShrink={0}
              isDisabled={hasErrors}
              width={{ base: '100%', sm: 'auto' }}
            >
              {t('portal_update_plot_location_modal_find_plot_button')}
            </Button>
          </HStack>
        </Box>
        <InPageNotification
          description={t('portal_update_plot_location_modal_site_plan_info')}
          showSupportServiceRequestInfo={false}
          rightComponent={
            <Button
              as={Link}
              locale={''}
              href={`/images/site-plan.png`}
              target="_blank"
              variant={'link'}
              fontSize="1.4rem"
              textTransform="none"
              placeItems={'center'}
              gap={'5px'}
              ml={'15px'}
            >
              {t('portal_update_plot_location_modal_site_plan_link_text')}
              <Icon name="question" height="16px" className="no_flip" />
            </Button>
          }
        />
        {plotNotFound && !isFetchingPlotLocation && (
          <Box my={{ base: '12px', md: '24px' }}>
            <Text color={'red'}>{t('plot_info_not_found')}</Text>
          </Box>
        )}
        {isFetchingPlotLocation && (
          <Box display={'flex'} alignItems="center" minH={'145px'} mt="24px">
            <Loader thickness="3px" size={'xl'} />
          </Box>
        )}
        {!isFetchingPlotLocation && markerLocationDetails && (
          <Flex flexDirection="column" gap={10} mt={'24px'}>
            <Text fontWeight={'bold'}>{t('portal_profile_plot_details')}</Text>
            <Flex
              gap={10}
              sx={{
                flexDirection: {
                  base: 'column',
                  sm: 'row',
                },
              }}
            >
              <Stack flex="3" gap={{ base: '12px', md: '24px' }}>
                <LabelText
                  title={t('portal_plot_community_number')}
                  value={markerLocationDetails?.communityNumber || '-'}
                />
                <LabelText
                  title={t('portal_profile_plot_size')}
                  value={printVillaSize(markerLocationDetails?.plotSize)}
                />
              </Stack>
              <Stack flex="6" gap={{ base: '12px', md: '24px' }}>
                <LabelText
                  title={t('portal_profile_plot_number')}
                  value={markerLocationDetails?.plotNumber || ''}
                />

                <LabelText
                  title={t('portal_profile_plot_location')}
                  value={`${markerLocationDetails?.municipalityName || ''}${
                    markerLocationDetails?.district
                      ? ` - ${markerLocationDetails?.district}`
                      : ''
                  }`}
                />
              </Stack>
            </Flex>
          </Flex>
        )}
        <Flex justifyContent={'flex-end'} mt="24px">
          <Button
            isLoading={isUpdatingPlotLocation || isUpdatingUserDetails}
            isDisabled={isSubmitDisabled}
            alignSelf={'flex-end'}
            type="submit"
          >
            {t('update_plot_location')}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default PlotModal;
