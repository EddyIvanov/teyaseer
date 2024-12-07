import { Button, VStack } from '@chakra-ui/react';

import InfoModalProps from './infoModal.type';

import { Icon, Link, Modal, Text } from '@/components';
import useTranslation from '@/hooks/useTranslate';
import colors from '@/styles/themes/brand/colors';

function InfoModal(props: InfoModalProps) {
  const { t } = useTranslation();
  const { isOpen, onClose, title, icon, info, href, serviceRequestId } = props;
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      showCloseButton={false}
      size={'6xl'}
    >
      <VStack gap="40px" justifyContent={'space-around'}>
        <Icon
          name={icon}
          color={colors.primary}
          width={'40px'}
          height={'40px'}
        />
        <Text
          sx={{
            fontSize: '32px',
            textAlign: 'center',
          }}
        >
          {title}
          {serviceRequestId && (
            <Text fontSize={'16px'} align="center">
              {`${t('portal_info_modal_sr_number')} #${serviceRequestId}`}
            </Text>
          )}
        </Text>
        {href ? (
          <Link
            isExternal={true}
            target="_blank"
            href={href || '#'}
            sx={{
              fontSize: '16px',
            }}
          >
            {info}
          </Link>
        ) : (
          <Text
            sx={{
              fontSize: '16px',
              textAlign: 'center',
            }}
          >
            {info}
          </Text>
        )}
        <Button onClick={onClose} minW={'150px'}>
          {t('portal_done')}
        </Button>
      </VStack>
    </Modal>
  );
}

export default InfoModal;
