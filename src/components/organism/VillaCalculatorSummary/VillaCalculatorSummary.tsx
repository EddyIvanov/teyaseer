import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Box, Grid, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCalculator } from 'teyaseer-calculator-engine';

import VillaDesignRecommendations from './components/VillaDesignRecommendations';

import { Image } from '@/components';
import Text from '@/components/atoms/Text/Text';
import { VillaCalculatorLayout } from '@/components/layouts';
import { AdditionalFunds } from '@/components/organism/VillaCalculatorSummary/components/AdditionalFunds/AdditionalFunds';
import { EstimatedCost } from '@/components/organism/VillaCalculatorSummary/components/EstimatedCost/EstimatedCost';
import { SummaryCTA } from '@/components/organism/VillaCalculatorSummary/components/SummaryCTA';
import { SummaryImageSliderMobile } from '@/components/organism/VillaCalculatorSummary/components/SummaryImageSliderMobile/SummaryImageSliderMobile';
import { VillaCalculatorBreakDown } from '@/components/organism/VillaCalculatorSummary/components/VillaCalculatorBreakDown/VillaCalculatorBreakDown';
import { VillaDetailsBlock } from '@/components/organism/VillaCalculatorSummary/components/VillaDetailsBlock';
import AdditionalFundUpdateModal from '@/components/organism/dashboard/Profile/components/AdditionalFundUpdateModal/AdditionalFundUpdateModal';
import { formatNumberWithCommas } from '@/helpers/formatNumberWithCommas';
import useTranslation from '@/hooks/useTranslate';
import useUnloadUnsaveConsultant from '@/hooks/useUnloadUnsaveConsultant';
import { DashboardContext } from '@/providers/DashboardContext';

export const VillaCalculatorSummary = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useContext(DashboardContext);

  useUnloadUnsaveConsultant({ serviceRequestId: 'prevent-reload' }, '');

  const {
    selectedCostBreakdown,
    setCalculatorId,
    images,
    selectedVillaSpaces,
    calculateSummery,
    status,
    estimatedCost,
  } = useCalculator();

  const { bedrooms, builtUpArea, villaStyle } = selectedVillaSpaces || {};

  const isDashBoard = useMemo(
    () => router.pathname.includes('dashboard'),
    [router.pathname]
  );

  const acceptedLoanAmount = user?.userInfo?.loanInfo.acceptedLoanAmount;
  const additionalFunds =
    typeof user?.userInfo?.loanInfo?.additionalFunds === 'number'
      ? user?.userInfo?.loanInfo?.additionalFunds
      : 0;

  const calculateSummaryHandler = (passedAdditionalFunds?: number) => {
    calculateSummery(
      (acceptedLoanAmount || 0) + (passedAdditionalFunds ?? additionalFunds)
    );
  };

  const queryId = router.query.id;

  useEffect(() => {
    if (queryId) {
      setCalculatorId(queryId as string);
    }
  }, [queryId]);

  useEffect(() => {
    if (
      !status.isDataLoading &&
      !status.loadStatus.isLoading &&
      router.query.id
    ) {
      calculateSummaryHandler();
    }
  }, [status.isDataLoading, status.loadStatus.isLoading]);

  const [fundsModalOpen, setFundsModalOpen] = useState(false);

  function addFundsHandler(): void {
    setFundsModalOpen(true);
  }

  // redirect user to configurator on page refresh
  useEffect(() => {
    if (router.isReady && !queryId && estimatedCost === 0) {
      router.push(
        `${
          isDashBoard ? '/dashboard/services' : ''
        }/villa-configurator?backFromSummary=true`
      );
    }
  }, [router.isReady, queryId, estimatedCost, isDashBoard]);

  return (
    <VillaCalculatorLayout activeSliderIndex={1}>
      {user && (
        <AdditionalFundUpdateModal
          key={additionalFunds}
          isOpen={fundsModalOpen}
          onClose={() => setFundsModalOpen(false)}
          fund={additionalFunds}
          onSubmitCB={calculateSummaryHandler}
        />
      )}
      <Box
        sx={{
          overflowY: { base: 'scroll' },
        }}
      >
        <Box
          sx={{
            paddingLeft: { lg: '80px' },
            _rtl: {
              paddingRight: { lg: '80px' },
            },
          }}
        >
          <SimpleGrid
            columns={{ sm: 1, md: 2 }}
            spacingX="59px"
            gridTemplateColumns={{
              base: '100%',
              lg: 'calc(50% - 138px) 1fr',
            }}
            sx={{ borderBottom: '1px solid #ADB5BD' }}
          >
            <Grid
              templateColumns={{ md: 'repeat(2, 1fr)' }}
              gap={{ md: '24px' }}
            >
              <Box
                gridColumn={{ lg: 'span 2' }}
                mt={{ md: '54px' }}
                p={{
                  base: '24px',
                  lg: 0,
                }}
              >
                <Text
                  fontSize={'xx-large'}
                  fontWeight={'semibold'}
                  color={'black'}
                  textTransform={'capitalize'}
                >
                  {t('summary')}
                </Text>

                <Text
                  fontSize={'small'}
                  mt={{ md: '34px' }}
                  maxWidth={{ base: '300px', md: '275px' }}
                  fontWeight={'light'}
                >
                  {t('summary_description')}
                </Text>
              </Box>

              {images?.villaDetails && (
                <>
                  <Box
                    gridColumn={{ md: 'span 2' }}
                    p={{
                      base: '24px',
                      lg: 0,
                    }}
                    sx={{ display: { base: 'block', lg: 'none' } }}
                  >
                    <SummaryImageSliderMobile images={images.villaDetails} />
                  </Box>

                  {images?.villaDetails.map((img, index) => (
                    <Box
                      key={index}
                      sx={{ display: { base: 'none', lg: 'block' } }}
                      gridColumn={{
                        md: index === 0 || index === 1 ? 'span 2' : 'span 1',
                      }}
                      p={{
                        base: '24px',
                        lg: 0,
                      }}
                    >
                      <Image
                        lazyLoadTheme={'light'}
                        alt={img}
                        src={img}
                        width={500}
                        height={500}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  ))}
                </>
              )}

              <Box gridColumn={{ md: 'span 2' }} />
            </Grid>

            <VStack gap={0} sx={{ borderLeft: '1px solid #ADB5BD' }}>
              {isDashBoard && (
                <VillaDetailsBlock>
                  <HStack
                    alignItems={'start'}
                    justifyContent={'start'}
                    h={'100%'}
                  >
                    <Box
                      sx={{
                        marginTop: { md: '1px' },
                      }}
                    >
                      <Text fontSize={'2rem'} fontWeight={'semibold'}>
                        {t('my_details')}
                      </Text>
                      <Box sx={{ marginTop: '34px' }} />
                      {acceptedLoanAmount && (
                        <SummaryCTA
                          subTitle={t('your_loan_amount')}
                          value={`${t('aed_currency')} ${formatNumberWithCommas(
                            acceptedLoanAmount
                          )}`}
                          icon={'money'}
                        />
                      )}
                      <Box sx={{ marginTop: '28px' }} />
                      <AdditionalFunds
                        existingFunds={additionalFunds}
                        addFundsHandler={addFundsHandler}
                      />
                    </Box>
                  </HStack>
                </VillaDetailsBlock>
              )}

              <VillaDetailsBlock>
                <EstimatedCost isDashBoard={isDashBoard} />
              </VillaDetailsBlock>

              <VillaDetailsBlock hasBorderBottom={false}>
                <VillaCalculatorBreakDown
                  data={
                    selectedCostBreakdown?.length > 0
                      ? selectedCostBreakdown
                      : []
                  }
                />
              </VillaDetailsBlock>
            </VStack>
          </SimpleGrid>
        </Box>
        {villaStyle && bedrooms && builtUpArea && (
          <Box px={{ md: '80px' }} mb={{ base: '45px', md: '193px' }}>
            <VillaDesignRecommendations
              isDashboard={isDashBoard}
              villaType={villaStyle.toLowerCase()}
              villaBedrooms={bedrooms.toString()}
              villaSize={builtUpArea.toString()}
            />
          </Box>
        )}
      </Box>
    </VillaCalculatorLayout>
  );
};
