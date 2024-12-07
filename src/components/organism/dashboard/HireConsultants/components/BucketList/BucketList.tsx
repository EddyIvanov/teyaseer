import React from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';

import style from './BucketList.style';
import IBucketListProps from './BucketList.type';
import { IConsultantType } from '../../Consultants.type';
import ConsultantList from '../ConsultantsList';

import { ConfirmModal, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const BucketList = ({
  vendorList,
  updateContextState,
  vendorType = 'consultants',
  onClear,
  onSelectedChange,
}: IBucketListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const handleSelectConsultant = (items: IConsultantType[]) => {
    if (onSelectedChange) onSelectedChange(items);
    else updateContextState({ vendors: items });
  };
  const handleCleanSerach = () => {
    onClose();
    if (!onSelectedChange) updateContextState({ vendors: [] });
    if (onClear) onClear();
  };
  const handleClearAllClick = (e: any) => {
    e.stopPropagation();
    onOpen();
  };
  return vendorList.length > 0 ? (
    <>
      <Accordion allowToggle sx={style.accordion}>
        <AccordionItem>
          <AccordionButton sx={style.accordionButton} as="div">
            <Flex sx={style.accordionHeader}>
              <Text>
                {t(
                  `portal_bucketList_${vendorType}_selected_view_title`
                ).replace('{{number}}', `${vendorList.length}`)}
              </Text>
              <Spacer />
              <Flex
                sx={{
                  placeItems: 'center',
                  gap: '19px',
                }}
              >
                <Button
                  sx={style.clearButton}
                  variant="link"
                  onClick={handleClearAllClick}
                >
                  {t('portal_bucketList_clear_all_button')}
                </Button>
                <Box>
                  <AccordionIcon width="20px" height="20px" mr="5px" />
                </Box>
              </Flex>
            </Flex>
          </AccordionButton>
          <AccordionPanel sx={style.accordionPanel}>
            <Box>
              <ConsultantList
                items={vendorList}
                selectedItems={vendorList}
                onSelectConsultant={handleSelectConsultant}
                withVirtualList={false}
                containerStyle={{ minHeight: '0' }}
              />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <ConfirmModal
        title={t('portal_vendors_list_clean_selection_modal_title')}
        description={t('portal_vendors_list_clean_selection_modal_description')}
        isOpen={isOpen}
        confirmText={t('portal_confirm')}
        onCancel={onClose}
        onConfirm={handleCleanSerach}
      />
    </>
  ) : (
    <Box sx={style.unselectedViewWrapper}>
      <Text>
        {t('portal_bucketList_no_selected_view_title').replace(
          '{{vendorType}}',
          vendorType
        )}
      </Text>
    </Box>
  );
};
export default BucketList;
