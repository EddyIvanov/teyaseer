import { Button, Flex } from '@chakra-ui/react';

import { MissingPlotLocationModalProps } from './MissingPlotLocationModal.types';

import { Modal, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';

const MissingPlotLocationModal = ({
  onSubmit,
  onClose,
}: MissingPlotLocationModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={t('portal_missing_plot_location_modal_title')}
      size={'6xl'}
    >
      <Text>{t('portal_missing_plot_location_modal_description')}</Text>
      <Flex justifyContent="center" mt="30px">
        <Button onClick={onSubmit} variant="primary">
          {t('portal_missing_plot_location_modal_button')}
        </Button>
      </Flex>
    </Modal>
  );
};
export default MissingPlotLocationModal;
