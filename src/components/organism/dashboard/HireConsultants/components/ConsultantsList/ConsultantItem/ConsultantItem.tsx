import React, { memo, useContext } from 'react';

import {
  Button,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Hide,
  Show,
  Spacer,
  VStack,
} from '@chakra-ui/react';

import style from './ConsultantItem.style';
import { IConsultantType } from '../../../Consultants.type';

import { Icon, Link, Text } from '@/components';
import { companyName } from '@/helpers/companyNameTranslation';
import { normalizeLinkUrl } from '@/helpers/utils';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import colors from '@/styles/themes/brand/colors';

interface IConsultantItem {
  consultant: IConsultantType;
  handleSelectedItem: (item: IConsultantType) => void;
  simpleMode?: boolean;
  setSelected: (item: IConsultantType | undefined) => void;
  selectedItems: IConsultantType[];
  onEmailOpen: () => void;
  onPhoneOpen: () => void;
  onDetailsOpen: (vendor: IConsultantType) => void;
}
const consultantItem = ({
  consultant,
  handleSelectedItem,
  simpleMode = false,
  setSelected,
  selectedItems,
  onEmailOpen,
  onPhoneOpen,
  onDetailsOpen,
}: IConsultantItem) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const { locale } = useContext(Context);
  return (
    <Flex
      data-checked={!!selectedItems.find(itm => itm.id === consultant.id)}
      sx={style.mainList}
      onClick={() => {
        handleSelectedItem(consultant);
      }}
      w="100%"
    >
      <Flex key={consultant.id} sx={style.listBox}>
        <Flex
          w={{ base: '100%', lg: 'auto' }}
          className="sticky"
          gap="20px"
          flexDirection={'row'}
          display={'flex'}
          flex={1}
        >
          <Checkbox
            pointerEvents={'none'}
            size="lg"
            isChecked={!!selectedItems.find(itm => itm.id === consultant.id)}
          />
          <Flex sx={style.listItemInner}>
            <Flex
              sx={style.listItemColumn}
              w={'160px'}
              maxW={{ base: '100%', lg: '100%' }}
              alignItems={{ base: 'center', lg: 'flex-start' }}
              flex={1}
            >
              <Text
                onClick={e => {
                  e.stopPropagation();
                  onDetailsOpen(consultant);
                }}
                sx={style.companyNameStyle}
              >
                {companyName(consultant, locale)}
              </Text>
              {!simpleMode && (
                <Show below="lg">
                  <Rating rate={consultant.ratings || '-'} />
                </Show>
              )}
            </Flex>
          </Flex>
        </Flex>
        {!simpleMode && (
          <Show below="lg">
            <Divider />
          </Show>
        )}
        {!simpleMode && (
          <Flex
            sx={{
              gap: '30px',
              placeItems: { base: 'space-between', lg: 'start' },
              flexDirection: { base: 'column', lg: 'row' },
              w: { base: '100%', lg: 'unset' },
            }}
          >
            <Flex sx={style.listItemColumn}>
              <Text>{t('portal_consultant_projects_completed_label')}</Text>
              <Text>{consultant.completedProjectNumber || '-'}</Text>
            </Flex>

            <Flex sx={style.listItemColumn}>
              <Text>{t('portal_consultants_ongoing_projects_label')}</Text>
              <Text>{consultant.ongoingProjectNumber || '-'}</Text>
            </Flex>
          </Flex>
        )}

        {/* {!simpleMode && ( */}
        {/*   <Show above="lg"> */}
        {/*     <Spacer /> */}
        {/*   </Show> */}
        {/* )} */}

        {!simpleMode && (
          <>
            <VStack align={'center'} gap="15px">
              {/* Rating */}
              <Show above="lg">
                <Rating rate={consultant.ratings || '-'} />
              </Show>
            </VStack>
            <Show above="lg">
              <Button
                sx={{
                  width: '50px',
                  height: '40px',
                  placeItems: 'center',
                  display: 'flex',
                }}
                onClick={e => {
                  e.stopPropagation();
                  setExpand(!expand);
                }}
                variant={'unstyled'}
              >
                <Icon
                  aria-expanded={expand}
                  name={'chevronDown'}
                  width="20px"
                  height="20px"
                  sx={style.expandArrow}
                />
              </Button>
            </Show>
          </>
        )}
      </Flex>
      {!simpleMode && (
        <Flex aria-expanded={expand} sx={style.listBoxInner}>
          <Flex
            flexDirection={{ base: 'column', lg: 'row' }}
            gap="30px"
            w="100%"
          >
            <Flex
              className="sticky"
              sx={{ ...style.listItemColumn, minW: '200px' }}
            >
              <Text>{t('portal_consultant_classification_label')}</Text>
              <Text>{consultant.classification || '-'}</Text>
            </Flex>

            <Flex sx={style.listItemColumn}>
              <Text>{t('portal_consultant_location_label')}</Text>
              <Text>{consultant.preferredLocation || '-'}</Text>
            </Flex>

            <Show below="lg">
              <Divider />
            </Show>
            <Hide below="lg">
              <Spacer />
            </Hide>

            {!simpleMode && (
              <HStack
                justifyContent={{ base: 'flex-start', lg: 'unset' }}
                gap="10px"
              >
                {consultant.companyWebsite &&
                  consultant.companyWebsite !== '' && (
                    <Link
                      isExternal={true}
                      target="_blank"
                      href={normalizeLinkUrl(consultant.companyWebsite)}
                    >
                      <Icon name={'web'} sx={style.icon} />
                    </Link>
                  )}
                {consultant.contactPhoneNumber && (
                  <Link
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelected(consultant);
                      onPhoneOpen();
                    }}
                    href="#"
                  >
                    <Icon name={'phone'} sx={style.icon} />
                  </Link>
                )}
                {consultant.companyEmail && (
                  <Link
                    href="#"
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelected(consultant);
                      onEmailOpen();
                    }}
                  >
                    <Icon name={'mail'} sx={style.icon} />
                  </Link>
                )}
              </HStack>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export const Rating = ({ rate }: { rate: string | number | undefined }) => {
  return (
    <Flex
      sx={{
        maxW: '60px',
        background: colors.primary,
        height: '24px',
        minWidth: '50px',
        px: '12px',
        borderRadius: '20px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon name={'starFill'} width={'11px'} height={'11px'} color="white" />
      <Text
        fontWeight={'600'}
        flex={1}
        textAlign={'center'}
        color="white"
        fontSize={'13px'}
      >
        {rate}
      </Text>
    </Flex>
  );
};
export default memo(consultantItem);
