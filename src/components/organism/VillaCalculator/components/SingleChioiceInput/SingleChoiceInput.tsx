import React, { useState } from 'react';

import { Box, HStack, Text } from '@chakra-ui/react';
import { IDataCalculatorQuestionsCollectionItem } from 'teyaseer-calculator-engine';
import { TChoiceDataType } from 'teyaseer-calculator-engine/dist/cjs/types/data';

import { Icon, Image, Modal } from '@/components';
import { CalculatorBlock } from '@/components/organism/VillaCalculator/components/CalculatorBlock/CalculatorBlock';
import { ModalBody } from '@/components/organism/VillaCalculator/components/ModalBody';
import { SingleChoiceInputStyled } from '@/components/organism/VillaCalculator/components/SingleChioiceInput/SingleChoiceInput.styled';
import useTranslation from '@/hooks/useTranslate';

type TProps = {
  index: number;
  onChange: (choice: TChoiceDataType) => void;
  onEnterSection: (index: number) => void;
  options: IDataCalculatorQuestionsCollectionItem[];
  tabId: string;
  errors: Record<string, string>;
  registerInputRef: (
    index: number,
    questionId: string,
    elem: HTMLDivElement | null
  ) => void;
};

export const SingleChoiceInput = ({
  index,
  onChange,
  onEnterSection,
  options,
  tabId,
  errors,
  registerInputRef,
}: TProps) => {
  // TODO: check why title is not renderd per question tab

  const { t } = useTranslation();

  const [modalsOpenState, setModalsOpenState] = useState<
    Record<string, boolean>
  >({});

  const handleModalOpen = (optionId: string) => {
    setModalsOpenState(prev => ({ ...prev, [optionId]: true }));
  };

  const handleModalClose = (optionId: string) => {
    setModalsOpenState(prev => ({ ...prev, [optionId]: false }));
  };
  return (
    <>
      {options.map(
        (
          {
            titleDisplay,
            descriptionDisplay,
            optionsCollection,
            questionId,
            isRequired,
          },
          outerIndex
        ) => (
          <Box
            key={outerIndex}
            ref={ref => {
              registerInputRef(index, questionId, ref);
            }}
          >
            <CalculatorBlock
              title={titleDisplay}
              description={descriptionDisplay}
              isRequired={isRequired}
              onEnterSection={() => onEnterSection(index)}
              {...(errors[questionId] && {
                errorMessage: `${titleDisplay} ${t(errors[questionId])}`,
              })}
            >
              {optionsCollection.items.map(
                (
                  {
                    titleDisplay: collectionTitle,
                    optionId,
                    optionDisplayImageUrl,
                    isSelected,
                    info,
                    isDisabled,
                  },
                  innerIndex
                ) => (
                  <HStack
                    sx={{
                      ...(isDisabled && { opacity: 0.3 }),
                    }}
                    key={innerIndex}
                    gap={{ base: '12px', md: '24px' }}
                    mt={7}
                    alignItems={'center'}
                    onClick={() => {
                      !isDisabled &&
                        onChange({
                          type: 'choice',
                          questionId: questionId,
                          optionId: optionId,
                          tabId,
                        });
                    }}
                  >
                    <Box __css={SingleChoiceInputStyled.root}>
                      {optionDisplayImageUrl ? (
                        <Image
                          lazyLoadTheme={'light'}
                          alt={`${collectionTitle}-calculator-img`}
                          src={optionDisplayImageUrl}
                          width={100}
                          height={86}
                          loaderOpt={{ w: 100, h: 86, r: 10, fit: 'thumb' }}
                        />
                      ) : (
                        <Box w={'18px'} h={'26px'} />
                      )}

                      {isSelected && (
                        <Icon
                          __css={
                            optionDisplayImageUrl
                              ? SingleChoiceInputStyled.icon
                              : SingleChoiceInputStyled.iconNoImg
                          }
                          name="checked"
                        />
                      )}
                    </Box>
                    <HStack>
                      <Text
                        fontSize={{ xs: 'xSmall', sm: 'small', md: 'medium' }}
                        fontWeight={'medium'}
                      >
                        {collectionTitle}
                      </Text>
                      {info && (
                        <>
                          <Modal
                            isOpen={modalsOpenState[optionId] || false}
                            onClose={() => handleModalClose(optionId)}
                            showCloseButton={false}
                          >
                            <ModalBody
                              title={collectionTitle}
                              body={info}
                              onClose={() => handleModalClose(optionId)}
                            />
                          </Modal>

                          <Box
                            onClick={e => {
                              e.stopPropagation();
                              handleModalOpen(optionId);
                            }}
                          >
                            <Icon name="infoCalculator" />
                          </Box>
                        </>
                      )}
                    </HStack>
                  </HStack>
                )
              )}
            </CalculatorBlock>
          </Box>
        )
      )}
    </>
  );
};
