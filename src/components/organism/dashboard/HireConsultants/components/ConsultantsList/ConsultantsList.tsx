/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useRef, useState } from 'react';

import { Box, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';

import ConsultantItem from './ConsultantItem';
import style from './ConsultantsList.style';
import { IConsultantList } from './ConsultantsList.type';
import CenteredLoader from '../../../CenteredLoader/CenteredLoader';
import { IConsultantType } from '../../Consultants.type';

import { InfoModal, Text, VendorInfoModal } from '@/components';
import { envVars } from '@/configs/env';
import { companyName } from '@/helpers/companyNameTranslation';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';

const ConsultantsList = (props: IConsultantList) => {
  const {
    onSelectConsultant,
    maxSelectable = 10,
    items,
    selectedItems,
    loading,
    simpleMode = false,
    withVirtualList = true,
    containerStyle,
    noDataMesage,
  } = props;
  const {
    isOpen: isPhoneOpen,
    onClose: onPhoneClose,
    onOpen: onPhoneOpen,
  } = useDisclosure();
  const {
    isOpen: isEmailOpen,
    onClose: onEmailClose,
    onOpen: onEmailOpen,
  } = useDisclosure();
  const {
    isOpen: isDetailsOpen,
    onClose: onDetailsClose,
    onOpen: onDetailsOpen,
  } = useDisclosure();
  const { locale } = useContext(Context);
  const [selected, setSelected] = useState<IConsultantType | undefined>(
    undefined
  );
  const { t } = useTranslation();
  const toast = useToast();
  const virtualizeRef = useRef<any>();

  const handleSelectedItem = (item: IConsultantType) => {
    const tmp_consultants = selectedItems;
    if (tmp_consultants.find(itm => itm.id === item.id)) {
      onSelectConsultant(tmp_consultants.filter(itm => itm.id !== item.id));
    } else {
      if (tmp_consultants.length >= maxSelectable) {
        toast({
          title: t('consultant_select_limit'),
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      onSelectConsultant([...tmp_consultants, item]);
    }
  };

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => virtualizeRef.current,
    estimateSize: () => 78,
  });
  const onVendorDetailsOpen = (vendor: IConsultantType) => {
    setSelected(vendor);
    onDetailsOpen();
  };
  return (
    <VStack ref={virtualizeRef} sx={{ ...style.root, ...containerStyle }}>
      {withVirtualList ? (
        <>
          {rowVirtualizer.getVirtualItems().map(virtualItem => {
            return (
              <ConsultantItem
                key={`${virtualItem.key}`}
                consultant={items[virtualItem.index]}
                handleSelectedItem={handleSelectedItem}
                simpleMode={simpleMode}
                setSelected={setSelected}
                selectedItems={selectedItems}
                onEmailOpen={onEmailOpen}
                onPhoneOpen={onPhoneOpen}
                onDetailsOpen={onVendorDetailsOpen}
              />
            );
          })}
        </>
      ) : (
        <>
          {items.map((consultant, index) => {
            return (
              <ConsultantItem
                key={`${consultant.id}-${index}`}
                consultant={consultant}
                handleSelectedItem={handleSelectedItem}
                simpleMode={simpleMode}
                setSelected={setSelected}
                selectedItems={selectedItems}
                onEmailOpen={onEmailOpen}
                onPhoneOpen={onPhoneOpen}
                onDetailsOpen={onVendorDetailsOpen}
              />
            );
          })}
        </>
      )}
      {loading && items.length === 0 && <CenteredLoader />}
      {!loading && items.length === 0 && (
        <Box sx={style.spinner}>
          <Text fontSize="18px">{noDataMesage || t('no_data_found')}</Text>
        </Box>
      )}
      <InfoModal
        icon="mobile"
        title={companyName(selected, locale)}
        // title="ABC Consultatnt"
        info={selected?.contactPhoneNumber || '-'}
        isOpen={isPhoneOpen}
        href={`tel:${selected?.contactPhoneNumber}`}
        onClose={() => {
          onPhoneClose();
          setSelected(undefined);
        }}
      />
      <InfoModal
        icon="envelop"
        title={companyName(selected, locale)}
        info={selected?.companyEmail || '-'}
        isOpen={isEmailOpen}
        href={`mailto:${selected?.companyEmail}`}
        onClose={() => {
          onEmailClose();
          setSelected(undefined);
        }}
      />

      {selected && (
        <VendorInfoModal
          vendor={selected}
          isOpen={isDetailsOpen}
          onClose={() => {
            setSelected(undefined);
            onDetailsClose();
          }}
        />
      )}
    </VStack>
  );
};

export default ConsultantsList;
