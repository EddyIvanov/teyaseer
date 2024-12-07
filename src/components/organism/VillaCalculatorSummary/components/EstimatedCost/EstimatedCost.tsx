import React, { useContext, useEffect, useState } from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCalculator } from 'teyaseer-calculator-engine';
import { v4 as uuidv4 } from 'uuid';

import Text from '../../../../atoms/Text';

import { Icon, Link } from '@/components';
import { AutoAdjustVillaCost } from '@/components/organism/VillaCalculatorSummary/components/AutoAdjustVillaCost/AutoAdjustVillaCost';
import { CopyEstimatedCostModal } from '@/components/organism/VillaCalculatorSummary/components/CopyEstimatedCostModal/CopyEstimatedCostModal';
import { EstimateTotalLoggedIn } from '@/components/organism/VillaCalculatorSummary/components/EstimateTotalLoggedIn/EstimateTotalLoggedIn';
import { EstimateTotalLoggedOut } from '@/components/organism/VillaCalculatorSummary/components/EstimateTotalLoggedOut/EstimateTotalLoggedOut';
import { SummaryOverrideConfirmationModal } from '@/components/organism/VillaCalculatorSummary/components/SummaryOverrideConfirmationModal/SummaryOverrideConfirmationModal';
import AppRoutes from '@/constants/AppRoutes';
import { getAccessToken } from '@/helpers/session';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import { Context } from '@/providers/MainContext';

type T_Props = {
  isDashBoard?: boolean;
};

export const EstimatedCost = ({ isDashBoard }: T_Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();

  const { updateUserContext, user, userLoading } = useContext(DashboardContext);

  const { latestCalculatorInstance } = user || {};

  const [hasSavedCalculator, setHasSavedCalculator] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);

  useEffect(() => {
    if (latestCalculatorInstance) {
      const { id } = latestCalculatorInstance;
      if (id) {
        setHasSavedCalculator(true);
      }
    }
  }, []);

  const {
    costByLevelOfFinishing,
    savePublicCalculator,
    selectedVillaSpaces: { builtUpArea },
    selectedLevel,
    saveSecuredCalculator,
    recommendations,
  } = useCalculator();

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [showCopyModalOpen, setShowCopyModalOpen] = useState(false);

  const {
    onCopy,
    value: shareLink,
    setValue: setShareLink,
    hasCopied,
  } = useClipboard('');

  const { basic, midLevel, highLevel } = costByLevelOfFinishing || {};

  const { locale } = useContext(Context);

  const handleCancelShareLink = () => {
    setShowCopyModalOpen(false);
  };

  const onShareClick = async () => {
    setIsLoading(true);

    const uuid = uuidv4();

    const persistedSessionId = localStorage.getItem('sessionId');

    const sessionId = persistedSessionId || uuid;

    if (!persistedSessionId) {
      localStorage.setItem('sessionId', uuid);
    }

    /*
     * BE handles update/patch shared calculator instance based on user session
     */
    const response = await savePublicCalculator(sessionId);
    const id = response?.id;

    const generatedLink = `${window.location.origin}/${
      locale !== 'ar' ? locale + '/' : ''
    }villa-configurator/summary?id=${id}`;

    setShareLink(generatedLink);
    setShowCopyModalOpen(true);
    setIsLoading(false);
  };

  const [showVillaSavedModal, setShowVillaSavedModal] = useState(false);

  const closeSelectingVillaModal = () => {
    setShowVillaSavedModal(false);
  };

  const handleDone = () => {
    setShowVillaSavedModal(false);
    router.push(AppRoutes.Dashboard.Home);
  };

  const saveCalculator = async () => {
    setLoading(true);
    const accessToken = await getAccessToken();
    if (accessToken) {
      const { success } = await saveSecuredCalculator(accessToken);
      setLoading(false);
      if (!success) {
        return toast({
          title: t('design_saved_error'),
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
      if (success) setShowVillaSavedModal(true);

      // rehydrate user context to reflect changes in saved calculator
      if (updateUserContext) {
        await updateUserContext();
      }
    }
  };

  const handleSaveCalculator = async (overrideSavedCalc?: boolean) => {
    if (overrideSavedCalc) {
      await saveCalculator();
      return setShowOverrideModal(false);
    }
    if (!overrideSavedCalc && hasSavedCalculator) {
      return setShowOverrideModal(true);
    }

    await saveCalculator();
  };

  const acceptedLoanAmount = user?.userInfo?.loanInfo.acceptedLoanAmount || 0;
  const additionalFunds =
    typeof user?.userInfo?.loanInfo?.additionalFunds === 'number'
      ? user?.userInfo?.loanInfo?.additionalFunds
      : 0;

  return (
    <>
      <CopyEstimatedCostModal
        {...{
          showCopyModalOpen,
          handleCancelShareLink,
          shareLink,
          isLoading,
          hasCopied,
          onCopy,
        }}
      />
      <SummaryOverrideConfirmationModal
        isOpen={showVillaSavedModal}
        onClose={closeSelectingVillaModal}
        title={t('design_saved_successfully_title')}
      >
        <Text fontSize="2rem" fontWeight="semibold" textAlign={'center'}>
          {t('design_saved_successfully')}
        </Text>
        <Button variant="primary" onClick={handleDone}>
          {t('portal_done')}
        </Button>
      </SummaryOverrideConfirmationModal>

      <SummaryOverrideConfirmationModal
        isOpen={showOverrideModal}
        onClose={closeSelectingVillaModal}
        title={'has_saved_design_message'}
        hasIcon={false}
      >
        <HStack>
          <Button
            variant="secondary"
            onClick={() => setShowOverrideModal(false)}
          >
            {t('portal_cancel_save_calculator')}
          </Button>
          <Button
            isLoading={loading}
            variant="primary"
            onClick={() => handleSaveCalculator(true)}
          >
            {t('portal_proceed_override_design')}
          </Button>
        </HStack>
      </SummaryOverrideConfirmationModal>

      {!userLoading && (
        <AutoAdjustVillaCost
          isOpen={isAdjustModalOpen}
          onClose={() => {
            setIsAdjustModalOpen(false);
          }}
        />
      )}

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
        w={'100%'}
        alignItems={'start'}
        gap={{ base: '40px', md: '74px' }}
      >
        <Box sx={{ marginTop: { md: '1px' } }}>
          <Text fontSize={'2rem'} fontWeight={'semibold'}>
            {t('estimated_total_cost')}
          </Text>
          <Box>
            <Text
              fontSize={'small'}
              fontWeight={'light'}
              mt={{ md: '32px' }}
              maxWidth={{ md: '240px' }}
            >
              {t('estimated_total_cost_description')}
            </Text>
          </Box>
        </Box>

        {isDashBoard && !userLoading && recommendations && (
          <Button
            leftIcon={<Icon name="adjustments" />}
            variant="secondary"
            width={{ base: '100%', md: 'auto' }}
            maxWidth={'345px'}
            textTransform={'uppercase'}
            onClick={() => setIsAdjustModalOpen(true)}
          >
            {t('auto_adjust_my_budget')}
          </Button>
        )}
      </Flex>
      {/* Total Build up area */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
        alignContent={'center'}
        w={'100%'}
        alignItems={'start'}
        gap={{ base: '0', md: '74px' }}
        mt="30px"
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Text fontSize={'2rem'} fontWeight={'semibold'} pr="10px">
            {`${t('total_build_up_area')}`}
          </Text>
          <Text
            fontSize={'small'}
            fontWeight={'bold'}
            maxWidth={{ md: '240px' }}
          >
            {`${builtUpArea} ${t('sqm')}`}
          </Text>
        </Box>
      </Flex>
      <Box sx={{ marginTop: '80px' }} />
      {isDashBoard ? (
        <EstimateTotalLoggedIn
          {...{
            basic,
            midLevel,
            highLevel,
            selectedLevel,
            additionalFunds,
            acceptedLoanAmount,
            title: 'finishing_level',
          }}
        />
      ) : (
        <EstimateTotalLoggedOut
          {...{ basic, midLevel, highLevel, selectedLevel }}
        />
      )}

      <Box mt={'40px'} />
      <ButtonGroup mt={{ base: '28px', md: 8 }} gap={4} alignSelf={'end'}>
        {isDashBoard ? (
          <Button
            as={Link}
            href="/dashboard/services/villa-configurator?backFromSummary=true"
            variant={'secondary'}
            sx={{ md: { width: '285px' } }}
          >
            {t('portal_edit')}
          </Button>
        ) : (
          <Button
            variant={'secondary'}
            sx={{ md: { width: '285px' } }}
            onClick={onShareClick}
            isLoading={isLoading}
          >
            {t('shareLink')}
          </Button>
        )}

        {isDashBoard ? (
          <Button
            {...(!showOverrideModal && {
              isLoading: loading,
            })}
            variant={'primary'}
            sx={{ md: { width: '285px' } }}
            onClick={() => handleSaveCalculator()}
          >
            {t('saveDesign')}
          </Button>
        ) : (
          <Button
            as={Link}
            href="/sign-up/customer"
            variant={'primary'}
            sx={{ md: { width: '285px' } }}
          >
            {t('get_started')}
          </Button>
        )}
      </ButtonGroup>
    </>
  );
};
