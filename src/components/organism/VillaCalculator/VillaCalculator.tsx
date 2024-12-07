import { useContext, useEffect, useRef, useState } from 'react';

import { Box, Button, Flex, Hide, Show, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  IDataCalculatorQuestionsCollectionItem,
  TQuestionType,
  useCalculator,
} from 'teyaseer-calculator-engine';
import { TChoiceDataType } from 'teyaseer-calculator-engine/dist/cjs/types/data';

import styles from './VillaCalculator.style';
import { ICalculatorPageProps } from './VillacCaclculator.type';
import CenteredLoader from '../dashboard/CenteredLoader/CenteredLoader';

import { Icon, Image } from '@/components';
import { VillaCalculatorLayout } from '@/components/layouts';
import { CarouselProvider } from '@/components/layouts/VillaCalculatorLayout/VillaCalclulatorLayoutContext';
import { RoomTypeInput } from '@/components/organism/VillaCalculator/components/RoomTypeInput/RoomTypeInput';
import { SingleChoiceInput } from '@/components/organism/VillaCalculator/components/SingleChioiceInput/SingleChoiceInput';
import { makeWordsBold } from '@/helpers/boldWords';
import useTranslation from '@/hooks/useTranslate';
import { DashboardContext } from '@/providers/DashboardContext';
import colors from '@/styles/themes/brand/colors';

const VillaCalculator = ({ title, backdropImg }: ICalculatorPageProps) => {
  const { t } = useTranslation();

  const style = styles();

  const boldWordsFromNToEnd = (inputString: string, n: number) => {
    const words = inputString.split(' ');
    const boldedWords = words.map((word, index) => {
      if (index >= n) {
        return (
          <Text as={'span'} key={index} sx={style.bold}>
            {index == n ? (
              <>
                <Show above="md">
                  <br />
                </Show>
                <Hide above="md"> </Hide>
              </>
            ) : (
              ' '
            )}
            {word}{' '}
          </Text>
        );
      } else {
        return (
          <Text as={'span'} key={index}>
            {' '}
            {word}
          </Text>
        );
      }
    });

    return <Text fontSize={'clamp(3.5rem, 3.47vw ,6rem)'}>{boldedWords}</Text>;
  };

  const {
    data,
    onChange,
    calculateSummery,
    errors,
    images,
    status,
    preSelectLocation,
  } = useCalculator();

  const [isDashBoard, setIsDashBoard] = useState(false);
  const { user, userLoading } = useContext(DashboardContext);
  const plotLocation = user?.userInfo?.plotInfo?.plotLocation;
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    if (!query?.backFromSummary) {
      if (!status.isDataLoading && plotLocation) {
        preSelectLocation(plotLocation);
      }
    }
  }, [status.isDataLoading, plotLocation, query]);

  const acceptedLoanAmount = user?.userInfo?.loanInfo.acceptedLoanAmount;
  const additionalFunds =
    typeof user?.userInfo?.loanInfo?.additionalFunds === 'number'
      ? user?.userInfo?.loanInfo?.additionalFunds
      : 0;

  useEffect(() => {
    if (router.pathname.includes('dashboard')) {
      setIsDashBoard(true);
    }
  }, []);

  const [index, setIndex] = useState(0);

  const onEnterSection = (index: number, imageGroup?: string) => {
    setIndex(index);
    if (imageGroup) onChange({ type: 'activeTab', imageGroup });
  };

  const inputRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const errorsInputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const registerInputRef = (
    index: number,
    questionId: string,
    ref: HTMLDivElement | null
  ) => {
    inputRefs.current[index] = ref;
    errorsInputRefs.current[questionId] = ref;
  };

  const renderInput = (
    payload: {
      index: number;
      tabId: string;
      items: IDataCalculatorQuestionsCollectionItem[];
      imageGroup?: string;
      onChangePassed: (choice: TChoiceDataType) => void;
    },
    questionType?: TQuestionType
  ) => {
    const { index: i, tabId, items, onChangePassed, imageGroup } = payload;

    if (questionType === 'Room')
      return (
        <RoomTypeInput
          index={i}
          key={tabId}
          tabId={tabId}
          onChange={onChangePassed}
          onEnterSection={index => onEnterSection(index, imageGroup)}
          options={items}
          errors={errors}
          registerInputRef={registerInputRef}
        />
      );
    if (questionType === 'SingleChoice') {
      return (
        <SingleChoiceInput
          registerInputRef={registerInputRef}
          index={i}
          key={tabId}
          tabId={tabId}
          onChange={onChangePassed}
          // onChange={handleOnChange}
          onEnterSection={index => onEnterSection(index, imageGroup)}
          options={items}
          errors={errors}
        />
      );
    }

    // TODO: uncommnet this when loading state will be added
    // throw new Error(`Invalid question type: ${questionType}`);
  };

  // TODO: refactor to directly pass onChange to the renderInput function after Cal dengine is stabilized
  function handleOnChange(val: any) {
    onChange(val);
  }

  function handleCalculate() {
    const { isSuccess, errors: newErrors } = calculateSummery(
      isDashBoard ? (acceptedLoanAmount || 0) + additionalFunds : undefined
    );

    const firstErrorKey = Object.keys(newErrors)[0];

    if (firstErrorKey && errorsInputRefs.current[firstErrorKey]) {
      errorsInputRefs.current[firstErrorKey]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    if (isSuccess)
      return router.push(
        isDashBoard
          ? '/dashboard/services/villa-configurator/summary'
          : '/villa-configurator/summary'
      );
  }

  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = (index: number) => {
    const swiperElement = document.querySelector('.swiper');
    if (swiperElement) {
      const scrollableAreaElementY =
        scrollableAreaRef.current?.getBoundingClientRect().y;

      setIndex(index);
      const scrollableContainer = scrollableAreaRef.current;

      const element = inputRefs.current[index];

      if (element && scrollableContainer && scrollableAreaElementY) {
        const elementTop = element.offsetTop;
        const finalScrollPosition = elementTop - scrollableAreaElementY - 30;
        scrollableContainer.scrollTo({
          top: finalScrollPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <CarouselProvider {...{ selectedIndex: index, handleScroll }}>
      <VillaCalculatorLayout
        mainImage={images.main}
        isCalculator
        activeSliderIndex={index}
      >
        <Box sx={style.optionsListWrapper}>
          <Flex h={'100%'} direction={{ base: 'column', md: 'row' }}>
            <Box sx={style.imageBg}>
              {backdropImg?.fields.file.url && (
                <Image
                  lazyLoadTheme={'light'}
                  alt={backdropImg?.fields.description}
                  src={images?.main || ''}
                  fill
                  priority
                />
              )}
            </Box>
            <Box sx={style.optionsList} ref={scrollableAreaRef}>
              <Text
                color={colors.text.dark}
                as="h2"
                fontSize={'clamp(3.5rem, 3.47vw ,6rem)'}
                maxW={{
                  base: '100%',
                  md: 'clamp(240px, 30.50vw, 525px)',
                }}
              >
                {makeWordsBold(title, 2, 3)}
              </Text>
              {(isDashBoard && !user?.userInfo && userLoading) || !data ? (
                <CenteredLoader variant="calculatorSideBlock" />
              ) : (
                <>
                  {data &&
                    // !status.initialStatus.isLoading &&
                    data?.calculatorTabCollection.items?.map(
                      (
                        {
                          calculatorQuestionsCollection: { items = [] },
                          tabId,
                          imageGroup = '',
                        },
                        index
                      ) =>
                        renderInput(
                          {
                            index,
                            tabId,
                            items,
                            imageGroup: imageGroup as string | undefined,
                            // onChange,
                            onChangePassed: val => handleOnChange(val),
                          },
                          items[0]?.type
                        )
                    )}
                </>
              )}
              {boldWordsFromNToEnd(t('finish_selection'), 2)}
              <Text mt={8}>{t('finish_selection_change_later')} </Text>
              <Box mt={'48px'} />

              <Button
                rightIcon={
                  <Icon
                    sx={{
                      path: {
                        stroke: 'white',
                      },
                    }}
                    name={'arrowRight'}
                    w="18px"
                    h="18px"
                  />
                }
                variant={'primary'}
                sx={{ width: '100%' }}
                onClick={handleCalculate}
              >
                {t('show_summary')}
              </Button>
            </Box>
          </Flex>
        </Box>
      </VillaCalculatorLayout>
    </CarouselProvider>
  );
};

export default VillaCalculator;
