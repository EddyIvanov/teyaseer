import React from 'react';

import { Box, Divider, HStack, VStack } from '@chakra-ui/react';
import { IDataCalculatorQuestionsCollectionItem } from 'teyaseer-calculator-engine';
import { TChoiceDataType } from 'teyaseer-calculator-engine/dist/cjs/types/data';

import { CalculatorBlock } from '@/components/organism/VillaCalculator/components/CalculatorBlock/CalculatorBlock';
import { InfoBox } from '@/components/organism/VillaCalculator/components/RoomAddons/InfoBox';
import { RoomAddons } from '@/components/organism/VillaCalculator/components/RoomAddons/RoomAddons';
import { RoomConfig } from '@/components/organism/VillaCalculator/components/RoomConfig/RoomConfig';
import { GridTypeStyle } from '@/components/organism/VillaCalculator/components/RoomTypeInput/RoomType.styled';
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

export const RoomTypeInput = ({
  index,
  onChange,
  onEnterSection,
  options,
  tabId,
  errors,
  registerInputRef,
}: TProps) => {
  const { t } = useTranslation();

  return (
    <>
      {options.map(
        ({
          titleDisplay,
          minValue = 0,
          maxValue = 1,
          minSize,
          questionId,
          rooms,
          roomCount,
          descriptionDisplay,
          isRequired,
          questionNameDisplay,
        }) => (
          <Box
            key={titleDisplay}
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
              <>
                <HStack gap={'7px'} wrap={'wrap'} mt={7} alignItems={'center'}>
                  {minValue !== undefined &&
                    Array.from({ length: maxValue || 1 }).map((_, index) => (
                      <Box
                        key={index}
                        __css={{
                          ...GridTypeStyle.root,
                          ...(roomCount === index + 1 &&
                            GridTypeStyle.selected),
                        }}
                        onClick={() =>
                          onChange({
                            type: 'roomCount',
                            tabId,
                            questionId,
                            numberOfRooms: index + 1,
                          })
                        }
                      >
                        {index + 1}
                      </Box>
                    ))}
                </HStack>
                <VStack gap={12} mt={12} alignItems={'start'}>
                  {rooms &&
                    rooms?.length > 0 &&
                    Array.from({ length: rooms.length }).map((_, roomIndex) => (
                      <VStack key={roomIndex}>
                        <RoomConfig
                          questionName={questionNameDisplay}
                          index={roomIndex}
                          payload={{
                            width: rooms[roomIndex].width,
                            length: rooms[roomIndex].length,
                          }}
                          onChange={({
                            width,
                            length,
                          }: {
                            width: number;
                            length: number;
                          }) =>
                            onChange({
                              index: roomIndex,
                              type: 'roomValue',
                              tabId,
                              questionId,
                              width,
                              length,
                            })
                          }
                        />
                        {minSize && <InfoBox value={minSize} />}
                        <VStack
                          mt={{ base: '32px', md: '24px' }}
                          w={'100%'}
                          spacing={'24px'}
                        >
                          {rooms[roomIndex].addons.length > 0 &&
                            rooms[roomIndex].addons.map(
                              ({ nameDisplay, roomAddonId, isSelected }) => {
                                return (
                                  <RoomAddons
                                    key={roomAddonId}
                                    title={nameDisplay}
                                    checked={isSelected}
                                    onChange={() =>
                                      onChange({
                                        index: roomIndex,
                                        type: 'addon',
                                        tabId,
                                        questionId,
                                        roomAddonId,
                                      })
                                    }
                                  />
                                );
                              }
                            )}

                          {roomIndex !== rooms.length - 1 && <Divider />}
                        </VStack>
                      </VStack>
                    ))}
                </VStack>
              </>
            </CalculatorBlock>
          </Box>
        )
      )}
    </>
  );
};
